import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import styled from '@emotion/styled';
import { ReactNode, useId, ForwardedRef, forwardRef, useContext } from 'react';
import { createContext } from 'react';

const elements = {
	InputRow: styled.div`
		display: flex;
		margin: 10px 0;
		align-items: center;
	`,
	Label: styled.label`
		padding-left: 0.5rem;
		font-size: 1rem;
		line-height: 1;
		-webkit-tap-highlight-color: transparent;
	`,
	Item: styled.div`
		--_size: 1.25rem;
		--_border-width: calc(var(--_size) * 0.125);
		width: var(--_size);
		height: var(--_size);
		position: relative;
		user-select: none;

		transition: transform 0.15s ease 0.02s;
		will-change: transform;

		@media only screen and (max-width: 1000px) {
			&:active {
				transition: transform 0.075s ease 0s;
				transform: scale(0.85);
			}
		}
	`,
	Input: styled.input`
		all: unset;
		position: absolute;
		top: 0;
		left: 0;
		width: calc(100% - var(--_border-width) * 2);
		height: calc(100% - var(--_border-width) * 2);
		border: var(--_border-width) solid rgb(151, 164, 186);
		background-color: rgb(255, 255, 255);
		border-radius: 9999px;
		transition: border-color 150ms ease-in-out 0s, background-color 150ms ease-in-out 0s;
		background-color: #fff;
		-webkit-tap-highlight-color: transparent;

		&:checked {
			border-color: rgb(50, 142, 245);

			& + [data-indicator] {
				opacity: 1;
				transform: scale(1);

				&::after {
					background-color: rgb(50, 142, 245);
				}
			}

			@media only screen and (min-width: 1000px) {
				&:hover {
					transition-delay: 1s;
					border-color: rgb(156, 176, 198);
					cursor: not-allowed;

					& + [data-indicator] {
						&::after {
							transition-delay: 1s;
							background-color: rgb(156, 176, 198);
						}
					}
				}
			}
		}

		&:focus {
			outline: 2px solid #000;
			outline-offset: 2px;
		}

		@media only screen and (min-width: 1000px) {
			&:hover {
				border-color: rgb(35, 113, 201);

				& + [data-indicator] {
					&::after {
						background-color: rgb(35, 113, 201);
					}
				}
			}
		}
	`,
	Indicator: styled.span`
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		opacity: 0;
		transform: scale(0);

		@media only screen and (min-width: 1000px) {
			transition: opacity 150ms ease-in-out 0s, transform 150ms ease-in-out 0s;
		}

		&::after {
			content: '';
			width: calc(var(--_size) * 0.5);
			height: calc(var(--_size) * 0.5);
			border-radius: 9999px;
			background-color: var(--_color-selected);
			transition: background-color 150ms ease-in-out 0s;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	`,
};

interface ContextProps {
	name: string | undefined;
	defaultValue: string | undefined;
}

const InputRadioContext = createContext<ContextProps>({
	name: undefined,
	defaultValue: undefined,
});

interface GroupProps {
	name?: string;
	label: string;
	children: ReactNode | ReactNode[];
	defaultValue?: string;
}

function Group(props: GroupProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
	return (
		<InputRadioContext.Provider value={{ name: props.name, defaultValue: props.defaultValue }}>
			<div role='radiogroup' aria-label={props.label} ref={ref}>
				{props.children}
			</div>
		</InputRadioContext.Provider>
	);
}

interface ItemProps {
	label: string;
	value: string;
}

function Item(props: ItemProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
	const id = useId();
	const context = useContext(InputRadioContext);

	return (
		<elements.InputRow>
			<elements.Item>
				<elements.Input
					type='radio'
					value={props.value}
					name={context.name}
					ref={ref}
					id={id}
					defaultChecked={props.value === context.defaultValue}
				/>
				<elements.Indicator aria-hidden data-indicator />
			</elements.Item>
			{props.label != null ? <elements.Label htmlFor={id}>{props.label}</elements.Label> : null}
		</elements.InputRow>
	);
}

export const InputRadio = {
	Group: forwardRef(Group),
	Item: forwardRef(Item),
} as const;
