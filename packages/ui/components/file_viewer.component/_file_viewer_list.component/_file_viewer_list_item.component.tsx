import styled from '@emotion/styled';
import { useRef, useContext, PointerEvent, TouchEvent } from 'react';
import { FileViewerContext } from '../_file_viewer.context';
import { FileWorkerStale } from '../_file_worker_stale';

const elements = {
	itemStyle: styled.li`
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		scroll-snap-align: start;
		flex-direction: column;
		overflow: hidden;
		will-change: transform;
		touch-action: manipulation;
	`,
	img: styled.img`
		user-select: none;
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
	`,
	daBox: styled.div`
		width: 100px;
		height: 100px;
		background: linear-gradient(140deg, #d2a8ff 12.09%, #f778ba 42.58%, #ff7b72 84.96%);
	`,
};

interface Props {
	file: FileWorkerStale;
}

export function FileViewerItem({ file }: Props): JSX.Element {
	const shouldDisableZoom = useRef(false);
	const canMutateBar = useRef(false);
	const canMutateBarAnimationTimer = useRef<any | null>(null);
	const { setHasDisabledScroll, setShowBarManually } = useContext(FileViewerContext);

	function handlePointerMove(event: PointerEvent<HTMLLIElement>): void {
		if (shouldDisableZoom.current) {
			event.preventDefault();
			event.stopPropagation();
		}

		canMutateBar.current = false;
	}

	function handleTouchStart(event: TouchEvent<HTMLLIElement>): void {
		setHasDisabledScroll((shouldDisableZoom.current = event.touches.length > 1));

		canMutateBar.current = true;
	}

	function handleTouchEnd(event: TouchEvent<HTMLLIElement>): void {
		setHasDisabledScroll((shouldDisableZoom.current = event.touches.length > 1));

		if (canMutateBarAnimationTimer.current) {
			clearTimeout(canMutateBarAnimationTimer.current);
		}

		canMutateBarAnimationTimer.current = setTimeout(() => {
			if (canMutateBar.current) {
				setShowBarManually((x) => !x);

				canMutateBarAnimationTimer.current = null;
			}
		}, 300);
	}

	return (
		<elements.itemStyle onPointerMove={handlePointerMove} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
			{/* <elements.img src={file.preview} loading="lazy" alt="" /> */}
			<elements.daBox />
		</elements.itemStyle>
	);
}
