import styled from '@emotion/styled';
import { Fragment, HTMLAttributes, ReactNode } from 'react';
import { ForwardedRef, forwardRef } from 'react';

type Orientation = 'horizontal' | 'vertical';

type Props = {
	/**
	 * Either `vertical` or `horizontal`.
	 *
	 * @default 'horizontal'
	 */
	orientation?: Orientation;
	children?: ReactNode | undefined;
};

const elements = {
	container: styled.div`
		display: flex;
		gap: 10px;
	`,
};

function Stack(props: Props, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
	const { orientation = 'horizontal', children, ...rest } = props;

	return (
		<elements.container ref={ref} {...rest}>
			{children}
		</elements.container>
	);
}

const _Stack = forwardRef(Stack);
export { _Stack as Stack };
