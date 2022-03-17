import type { Token } from './_common';

class Node<T> {
	public readonly incoming = new Map<Token, Node<T>>();
	public readonly outgoing = new Map<Token, Node<T>>();

	constructor(public readonly data: T) {
		// Empty
	}
}

export class Graph<T> {
	private readonly nodes = new Map<Token, Node<T>>();

	constructor(private readonly lookupFn: (dependency: T) => Token) {
		// Empty
	}

	public insertEdge(from: T, to: T): void {
		const fromNode = this.lookupOrInsertNode(from);
		const toNode = this.lookupOrInsertNode(to);

		fromNode.outgoing.set(this.lookupFn(to), toNode);
		toNode.incoming.set(this.lookupFn(from), fromNode);
	}

	public lookup(key: Token): Node<T> | null {
		return this.nodes.get(key) ?? null;
	}

	public lookupOrInsertNode(data: T): Node<T> {
		const key = this.lookupFn(data);
		let node = this.nodes.get(key);

		if (!node) {
			node = new Node(data);
			this.nodes.set(key, node);
		}

		return node;
	}

	public removeNode(key: Token): void {
		this.nodes.delete(key);

		for (const node of this.nodes.values()) {
			node.outgoing.delete(key);
			node.incoming.delete(key);
		}
	}

	public edges(): Node<T>[] {
		const nodes: Node<T>[] = [];
		for (const node of this.nodes.values()) {
			if (node.outgoing.size === 0) {
				nodes.push(node);
			}
		}

		return nodes;
	}

	public isEmpty(): boolean {
		return this.nodes.size === 0;
	}
}
