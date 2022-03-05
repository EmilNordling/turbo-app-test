import { createContext, ReactNode, useContext } from "react";

const Context = createContext<any>(undefined as any);

interface Props {
  children: ReactNode;
}

export function SemanticViewProvider({ children }: Props) {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
}

export function useSemanticViewContext() {
  const semanticViewContext = useContext(Context);
  if (semanticViewContext === undefined) {
    throw new Error(
      "useSemanticViewContext must be used within a SemanticViewProvider"
    );
  }

  return semanticViewContext;
}
