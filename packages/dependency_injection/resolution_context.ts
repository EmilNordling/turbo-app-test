const resolutions = new Map<symbol, ResolutionContext>();

let currentContext: ResolutionContext | null = null;

export function createResolutionContext(): ResolutionContext {
	const id = Symbol();
	const resolution = new ResolutionContext(id);
	resolutions.set(id, resolution);

	return resolution;
}

export class ResolutionContext {
	constructor(public readonly id: symbol, public readonly singletons = []) {
		// Empty
	}
}
