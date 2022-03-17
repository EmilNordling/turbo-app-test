import { useMemo } from 'react';

export function FakeArticle({ chunks }: { chunks: number }): JSX.Element {
	const str = useMemo(() => {
		const LOREM_IPSUM_CHUNK =
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi vitae quo iste dicta quibusdam ut consequatur nam veniam eos nemo soluta aperiam aliquid sint, possimus corrupti, illum odio? Debitis, eius!';
		const BASE_LINE = 0.05;
		const FACTOR = 1.4;

		let strBuilder = '';
		let entropy = BASE_LINE;
		do {
			strBuilder += LOREM_IPSUM_CHUNK;

			if (entropy > Math.random()) {
				strBuilder += '\n\n';
				entropy = BASE_LINE;
				continue;
			}

			strBuilder += ' ';
			entropy = FACTOR * entropy;
		} while (chunks-- > 0);

		return strBuilder.trim();
	}, [chunks]);

	return (
		<p
			style={{
				whiteSpace: 'pre-wrap',
			}}
		>
			{str}
		</p>
	);
}
