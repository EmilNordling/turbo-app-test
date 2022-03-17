import styled from '@emotion/styled';
import { AnimatePresence, motion, useTransform } from 'framer-motion';
import { useContext, useEffect } from 'react';
import { FileViewerContext } from './_file_viewer.context';

const elements = {
	container: styled(motion.div)`
		display: flex;
		align-items: center;
		justify-content: right;
		padding: 4px 8px;
		top: 0;
		right: 0;
		width: 100%;
		position: absolute;
		z-index: 1;
	`,
	containerBackground: styled(motion.div)`
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: calc(100% + 50px);
		backdrop-filter: blur(24px);
		transition: filter 0.3s ease;
		background: linear-gradient(180deg, rgba(0, 0, 0, 1) 50px, rgba(0, 0, 0, 0.01) 200%);
	`,
	closeButton: styled.button`
		all: unset;
		padding: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 24px;
		height: 24px;
		z-index: 1;
		user-select: none;
		font-size: 24px;
		-webkit-tap-highlight-color: transparent;
	`,
	counter: styled.div`
		position: absolute;
		width: 100%;
		left: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		user-select: none;
	`,
	counterSegment: styled.span`
		font-variant-numeric: tabular-nums;
		width: 40%;

		&.right {
			text-align: right;
		}

		&.left {
			text-align: left;
		}
	`,
	counterSeparator: styled.span`
		margin: 0 8px 0 10px;
		height: 24px;
		position: relative;
		display: inline-flex;
		justify-content: center;
		align-items: center;

		&::after {
			content: '/';
			position: absolute;
			top: 0;
		}
	`,
};

interface Props {}

export function FileViewerBar(_: Props): JSX.Element {
	const { showBar, setIsOpen, showBarManually, y } = useContext(FileViewerContext);
	const opacity = useTransform(y, [-70, 0, 70], [0, 1, 0]);

	return (
		<AnimatePresence initial={false}>
			{showBar && showBarManually ? (
				<elements.container
					initial={{ y: '-100%' }}
					animate={{ y: 0 }}
					exit={{ y: '-100%' }}
					transition={{ duration: 0.4, ease: 'backInOut' }}
				>
					<elements.containerBackground style={{ opacity }} aria-hidden />
					<Counter />
					<elements.closeButton
						onClick={() => {
							setIsOpen(false);
						}}
					>
						✕
					</elements.closeButton>
				</elements.container>
			) : null}
		</AnimatePresence>
	);
}

function Counter(): JSX.Element | null {
	const { files, currentIndex } = useContext(FileViewerContext);
	const currentFile = currentIndex + 1;
	const totalFiles = files.length;

	return (
		<elements.counter tabIndex={0} aria-label={`Showing file ${currentFile} of ${totalFiles}`}>
			<elements.counterSegment aria-hidden className='right'>
				{currentFile}
			</elements.counterSegment>
			<elements.counterSeparator aria-hidden />
			<elements.counterSegment aria-hidden className='left'>
				{totalFiles}
			</elements.counterSegment>
		</elements.counter>
	);
}
