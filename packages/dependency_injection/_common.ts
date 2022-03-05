export type CtorRepresentation<T> = {
  new (...args: any[]): T;
};

export type Token<T> = string | symbol | CtorRepresentation<T>;

export type GenericClassDecorator<T> = (target: T) => void;

export enum Lifetime {
  Singleton,
  Scoped,
  Transient,
}
