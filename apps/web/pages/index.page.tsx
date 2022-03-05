import styled from "@emotion/styled";
import { Text } from "ui";

interface Props {}

const Container = styled.main`
  display: flex;
  flex-direction: column;
`;

export function IndexPage(_: Props): JSX.Element {
  return (
    <Container>
      <Text>here</Text>
    </Container>
  );
}
