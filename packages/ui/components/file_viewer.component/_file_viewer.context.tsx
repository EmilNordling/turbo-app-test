import { createContext, Dispatch, SetStateAction } from 'react';
import { FileWorkerStale } from './_file_worker_stale';
import type { MotionValue } from 'framer-motion';

export interface FileViewerContextValue {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	files: FileWorkerStale[];
	setFiles: Dispatch<SetStateAction<FileWorkerStale[]>>;
	hasDisabledScroll: boolean;
	setHasDisabledScroll: Dispatch<SetStateAction<boolean>>;
	startIndex: number;
	setStartIndex: Dispatch<SetStateAction<number>>;
	showBar: boolean;
	setShowBar: Dispatch<SetStateAction<boolean>>;
	showBarManually: boolean;
	setShowBarManually: Dispatch<SetStateAction<boolean>>;
	currentIndex: number;
	setCurrentIndex: Dispatch<SetStateAction<number>>;
	y: MotionValue<number>;
}

export const FileViewerContext = createContext<FileViewerContextValue>(undefined as unknown as FileViewerContextValue);
