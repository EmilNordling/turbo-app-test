import { CtorRepresentation, Token, Lifetime } from "./_common";

export interface Registration<T> {
  readonly id: Token<T>;
  readonly ctor: CtorRepresentation<T>;
  readonly lifetime: Lifetime;
}

const registry = new Map<Token<any>, Registration<any>>();

interface Options<T> {
  readonly useClass: CtorRepresentation<T>;
  /**
   * Determines in what scope the service will live in.
   */
  readonly lifeTimes?: Lifetime;
  /**
   * Determine if invocation should overwrite an existing registration.
   */
  readonly gentle?: boolean;
}

export function register<T>(token: Token<T>, opts: Options<T>): void {
  const builder: Registration<T> = {
    id: token,
    ctor: opts.useClass,
    lifetime: opts.lifeTimes ?? Lifetime.Transient,
  };

  // For testing purposes it's good to be able to overwrite existing registrations.
  if (!opts.gentle) {
    registry.set(token, builder);

    return;
  }

  if (registry.has(token)) return;

  registry.set(token, builder);
}
