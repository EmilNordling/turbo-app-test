import styled from '@emotion/styled';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useRef, useContext, useLayoutEffect } from 'react';
import { debounce } from 'utils';
import { FileViewerContext } from '../_file_viewer.context';
import { FileViewerItem } from './_file_viewer_list_item.component';

const CLOSE_VELOCITY_THRESHOLD = 100;
const CLOSE_DRAGGED_PX_THRESHOLD = 50;

const elements = {
	list: styled(motion.ul)`
		display: flex;
		position: relative;
		width: 100%;
		height: 100%;
		padding: 0;
		user-select: none;
		overflow-y: hidden;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;

		&.disabled-scroll {
			overflow-x: hidden;
		}

		&::-webkit-scrollbar {
			display: none;
		}
	`,
};

export function FileViewerList(): JSX.Element {
	const animation = useAnimation();
	const ref = useRef<HTMLUListElement>(null);
	// Storing the panInfo from the previously drag event due to https://github.com/framer/motion/issues/1087
	const panInfoCache = useRef<PanInfo | null>(null);
	const isScrolling = useRef(false);
	const { files, hasDisabledScroll, startIndex, setCurrentIndex, isOpen, setIsOpen, setShowBar, y } = useContext(FileViewerContext);

	useLayoutEffect(function toViewTheOpenedFile() {
		if (ref.current != null) {
			ref.current.scrollLeft = startIndex * ref.current.clientWidth;
		}
	}, []);

	function count(): void {
		if (ref.current != null) {
			const { scrollLeft, clientWidth } = ref.current;
			const halfOfScreen = clientWidth / 2;
			const startIndex = Math.floor((scrollLeft - halfOfScreen) / clientWidth);
			setCurrentIndex(startIndex + 1);
		}
	}

	useEffect(
		function whenIsOpenChanges() {
			if (isOpen) return;

			const current_y_value = y.get();
			if (current_y_value === 0) return;

			if (current_y_value < CLOSE_DRAGGED_PX_THRESHOLD) {
				animation.start('up');
			} else if (current_y_value > CLOSE_DRAGGED_PX_THRESHOLD) {
				animation.start('down');
			}
		},
		[isOpen],
	);

	useLayoutEffect(function whenMounted() {
		count();
	}, []);

	const resetIsScrolling = debounce(() => {
		isScrolling.current = false;
	}, 100);

	function handleScroll(): void {
		count();
		isScrolling.current = true;
		resetIsScrolling();
	}

	function exitThreshold(y: number, velocity: number | null): boolean {
		checkVelocity: {
			if (velocity == null) break checkVelocity;
			if (velocity < CLOSE_VELOCITY_THRESHOLD && velocity > -CLOSE_VELOCITY_THRESHOLD) {
				return false;
			}
		}

		return y > CLOSE_DRAGGED_PX_THRESHOLD || y < -CLOSE_DRAGGED_PX_THRESHOLD;
	}

	function handleDragEnd(_: MouseEvent, __: PanInfo): void {
		if (panInfoCache.current == null) return;

		const result = exitThreshold(panInfoCache.current.offset.y, panInfoCache.current.velocity.y);

		setIsOpen(!result);
		setShowBar(!result);

		panInfoCache.current = null;
	}

	function handleDrag(_: MouseEvent, panInfo: PanInfo): void {
		panInfoCache.current = panInfo;

		setShowBar(!exitThreshold(panInfo.offset.y, null));
	}

	return (
		<elements.list
			className={hasDisabledScroll ? 'disabled-scroll' : ''}
			ref={ref}
			style={{ y }}
			drag='y'
			initial='initial'
			animate={animation}
			dragSnapToOrigin
			transition={{
				type: 'spring',
				damping: 25,
				stiffness: 100,
			}}
			variants={{
				up: {
					y: '-100%',
				},
				initial: {
					y: 0,
				},
				down: {
					y: '100%',
				},
			}}
			onScroll={handleScroll}
			onDrag={handleDrag}
			onDragEnd={handleDragEnd}
		>
			{files.map((file) => (
				<FileViewerItem key={file.id} file={file} />
			))}
		</elements.list>
	);
}
