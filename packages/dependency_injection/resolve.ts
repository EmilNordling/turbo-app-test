import { CtorRepresentation } from "./_common";

export function resolve<T>(ctor: CtorRepresentation<T>): T {
  return new ctor();
}
