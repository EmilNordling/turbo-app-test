import styled from "@emotion/styled";
import { Fragment, ReactNode, useEffect } from "react";
import { SemanticViewProvider } from "./semantic_view.provider";

interface Props {
  header: ReactNode;
  container: ReactNode;
  footer?: ReactNode;
}

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  height: var(--header-height);
  width: 100%;
  z-index: 1;
`;

const Container = styled.main`
  position: relative;
  width: 100%;
  top: var(--header-height);
  min-height: calc(100vh - var(--header-height) - 50px);
  display: flex;
  flex-direction: column;
  padding-bottom: var(--header-height);
`;

const Footer = styled.footer`
  height: var(--footer-height);
  width: 100%;
`;

export function SemanticView({
  container,
  footer,
  header,
}: Props): JSX.Element {
  return (
    <SemanticViewProvider>
      <Header>{header}</Header>
      <Container>{container}</Container>
      {footer ? <Footer>{footer}</Footer> : null}
    </SemanticViewProvider>
  );
}
