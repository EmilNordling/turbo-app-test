import { ReactNode, useContext, useEffect, useState } from 'react';
import * as RadixPortal from '@radix-ui/react-portal';
import styled from '@emotion/styled';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import { FileViewerContext } from './_file_viewer.context';
import { FileViewerBar } from './_file_viewer_bar.component';
import { FileWorkerStale } from './_file_worker_stale';
import { FileViewerList } from './_file_viewer_list.component/mod';

const Portal = styled(RadixPortal.Root)`
	color: #fff;
	display: flex;
	flex-direction: column;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: ${2_147_483_647};
	overflow: hidden;
`;

const elements = {
	background: styled(motion.div)`
		background: #000;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	`,
};

const Fader = styled(motion.div)`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`;

function Background(): JSX.Element {
	const { y } = useContext(FileViewerContext);
	const opacity = useTransform(y, [-innerHeight * 2, 0, innerHeight * 2], [0, 1, 0]);

	return <elements.background style={{ opacity }} aria-hidden />;
}

interface FileViewerControllerProps {
	children?: ReactNode | ReactNode[];
}

function FileViewerProvider({ children }: FileViewerControllerProps): JSX.Element {
	const [isOpen, setIsOpen] = useState(false);
	const [showBar, setShowBar] = useState(true);
	const [showBarManually, setShowBarManually] = useState(true);
	const [startIndex, setStartIndex] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [hasDisabledScroll, setHasDisabledScroll] = useState(false);
	const [files, setFiles] = useState<FileWorkerStale[]>([]);
	const y = useMotionValue(0);

	useEffect(function listenToYChanges() {
		return y.onChange((y) => {
			// TODO update statusbar
		});
	}, []);

	useEffect(
		function whenIsOpenChanges() {
			const _ = document.querySelector('meta[name="theme-color"]')?.getAttribute('content') ?? '#fff';

			if (isOpen) {
				document.documentElement.style.backgroundColor = '#000';
				document.body.style.backgroundColor = '#000';
				document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#000');
			} else {
				document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#fff');
				document.body.style.backgroundColor = '#fff';
				document.documentElement.style.backgroundColor = '#fff';
			}

			setShowBar(isOpen);
			setShowBarManually(isOpen);
		},
		[isOpen],
	);

	return (
		<FileViewerContext.Provider
			value={{
				isOpen,
				setIsOpen,
				files,
				setFiles,
				hasDisabledScroll,
				setHasDisabledScroll,
				startIndex,
				setStartIndex,
				showBar,
				setShowBar,
				showBarManually,
				setShowBarManually,
				currentIndex,
				setCurrentIndex,
				y,
			}}
		>
			{children}
			<FileViewerRoot />
		</FileViewerContext.Provider>
	);
}

interface FileViewerProps {}

function FileViewerRoot(_: FileViewerProps): JSX.Element {
	const { isOpen } = useContext(FileViewerContext);

	return (
		<AnimatePresence>
			{isOpen ? (
				<Portal>
					<Fader
						transition={{
							ease: 'linear',
						}}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{
							opacity: 0,
						}}
					>
						<Background />
						<FileViewerBar />
						<FileViewerList />
					</Fader>
				</Portal>
			) : null}
		</AnimatePresence>
	);
}

interface FileViewerItemProps {
	file: FileWorkerStale;
}

function FileViewerItem({ file }: FileViewerItemProps): JSX.Element {
	const { files, setFiles, setIsOpen, setStartIndex } = useContext(FileViewerContext);

	useEffect(() => {
		setFiles((files) => [...files, file]);

		return () => {
			setFiles((files) => files.filter((x) => x.id !== file.id));
		};
	}, []);

	function openFileViewer(): void {
		setIsOpen(true);
		setStartIndex(files.findIndex((x) => x.id === file.id));
	}

	function handleClick(): void {
		openFileViewer();
	}

	function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
		if (event.key === 'Space') {
			openFileViewer();
		}
	}

	return (
		<div onClick={handleClick} onKeyDown={handleKeyDown} tabIndex={0} role='button'>
			FileViewer
		</div>
	);
}

export const FileViewer = {
	Provider: FileViewerProvider,
	Item: FileViewerItem,
} as const;
