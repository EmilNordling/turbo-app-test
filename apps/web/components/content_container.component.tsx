import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const ContentContainer = styled.div<Props>`
  display: flex;
  flex-direction: column;
  max-width: var(--container-width);
  width: 100%;
  margin: 0px auto;
  padding: 80px var(--gap);
`;
