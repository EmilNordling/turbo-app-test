import styled from '@emotion/styled';
import { ForwardedRef, forwardRef } from 'react';

type Orientation = 'horizontal' | 'vertical';

interface Props {
	/**
	 * Either `vertical` or `horizontal`. Defaults to `horizontal`.
	 */
	orientation?: Orientation;
	/**
	 * Whether or not the component is purely decorative. When true, accessibility-related attributes
	 * are updated so that that the rendered element is removed from the accessibility tree.
	 */
	decorative?: boolean;
}

const elements = {
	container: styled.div`
		background-color: #808080;

		&[data-orientation='horizontal'] {
			margin: 16px 0;
			height: 1px;
			width: 100%;
		}
		&[data-orientation='vertical'] {
			margin: 0 16px;
			height: 100%;
			width: 1px;
		}
	`,
};

function Divider(props: Props, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
	const semanticProps = props.decorative
		? {
				role: 'none',
		  }
		: {
				// `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
				'aria-orientation': props.orientation === 'vertical' ? props.orientation : undefined,
				role: 'separator',
		  };

	return <elements.container data-orientation={props.orientation ?? 'horizontal'} ref={ref} {...semanticProps} />;
}

const _Divider = forwardRef(Divider);
export { _Divider as Divider };
