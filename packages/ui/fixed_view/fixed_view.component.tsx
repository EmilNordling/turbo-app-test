import styled from "@emotion/styled";
import { Fragment, ReactNode, useEffect } from "react";

interface Props {
  container: ReactNode;
}

const Container = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export function FixedView({ container }: Props): JSX.Element {
  return (
    <Fragment>
      <Container>{container}</Container>
    </Fragment>
  );
}
