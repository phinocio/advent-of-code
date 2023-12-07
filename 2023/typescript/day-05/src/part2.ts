import fs from "fs";

function solve(): void {
	console.log(`Starting timing...`);
	const start = performance.now();
	const input: string[] = fs
		.readFileSync("src/inputs/part1.txt")
		.toString()
		.trim()
		.split("\n\n");

	const seeds = input[0]
		.replace(/.+:/, "")
		.trim()
		.split(" ")
		.map((x) => parseInt(x));

	let locations: number[] = [];
	for (let idx = 0; idx < seeds.length; idx += 2) {
		for (let idx2 = 0; idx2 < seeds[idx + 1]; idx2++) {
			const soilDst: number = getMap(
				seeds[idx] + idx2,
				input[1].replace(/.+:/, "").trim().split("\n"),
			);
			const fertDst: number = getMap(
				soilDst,
				input[2].replace(/.+:/, "").trim().split("\n"),
			);

			const waterDst: number = getMap(
				fertDst,
				input[3].replace(/.+:/, "").trim().split("\n"),
			);

			const lightDst: number = getMap(
				waterDst,
				input[4].replace(/.+:/, "").trim().split("\n"),
			);

			const tempDst: number = getMap(
				lightDst,
				input[5].replace(/.+:/, "").trim().split("\n"),
			);

			const humDst: number = getMap(
				tempDst,
				input[6].replace(/.+:/, "").trim().split("\n"),
			);

			const locDst: number = getMap(
				humDst,
				input[7].replace(/.+:/, "").trim().split("\n"),
			);
			locations.push(locDst);
		}
	}
	console.log(`Lowest value is ${Math.min(...locations)}`);
	const end = performance.now();
	console.log(`Took ${(end - start) / 1000} seconds to complete...`);
}

// Index 0 is the mapping name (seed-to-soil)
function getMap(seed: number, mapping: string[]): number {
	for (let idx = 0; idx < mapping.length; idx++) {
		const [dst, src, rng] = mapping[idx].split(" ").map((x) => parseInt(x));

		if (src + rng >= seed && src <= seed) {
			return dst + (seed - src);
		}
	}
	return seed;
}

export function part2(): void {
	solve();
}
