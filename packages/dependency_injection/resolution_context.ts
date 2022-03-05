const resolutions = new Map<symbol, Resolution>();

let currentContext: Resolution | null = null;

export function createResolutionContext(): Resolution {
  const id = Symbol();
  const resolution = new Resolution(id);
  resolutions.set(id, resolution);

  return resolution;
}

export class Resolution {
  constructor(readonly id: symbol, readonly singletons = []) {
    // Empty
  }
}
