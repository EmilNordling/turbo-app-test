import styled from "@emotion/styled";

interface Props {
  children: string;
  size?: 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

const Wrapper = styled.span``;

export function Text({ children, as, size = 400 }: Props): JSX.Element {
  return (
    <Wrapper
      as={as}
      style={{
        fontSize: `var(--font-size-${size})`,
        whiteSpace: "pre-wrap",
      }}
    >
      {children}
    </Wrapper>
  );
}
