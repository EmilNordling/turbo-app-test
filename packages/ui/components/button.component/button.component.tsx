import type { ReactNode, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement> {
	children: ReactNode | ReactNode[];
}

export function Button({ children, ...rest }: Props): JSX.Element {
	return <button {...rest}>{children}</button>;
}
