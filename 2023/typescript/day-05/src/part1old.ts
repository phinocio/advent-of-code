import fs from "fs";

function solve(): void {
	console.log(`Starting timing...`);
	const start = performance.now();
	const input: string[] = fs
		.readFileSync("src/inputs/example.txt")
		.toString()
		.trim()
		.split("\n\n");

	const seeds = input[0]
		.replace(/.+:/, "")
		.trim()
		.split(" ")
		.map((x) => parseInt(x));

	const seedToSoil = getMap(
		seeds,
		input[1].replace(/ map:/, "").trim().split("\n"),
	);

	const soilToFert: Map<number, number> = getMap(
		seeds,
		input[2].replace(/.+:/, "").trim().split("\n"),
	);

	const fertToWater: Map<number, number> = getMap(
		seeds,
		input[3].replace(/.+:/, "").trim().split("\n"),
	);

	const waterToLight: Map<number, number> = getMap(
		seeds,
		input[4].replace(/.+:/, "").trim().split("\n"),
	);

	const lightToTemp: Map<number, number> = getMap(
		seeds,
		input[5].replace(/.+:/, "").trim().split("\n"),
	);

	const tempToHum: Map<number, number> = getMap(
		seeds,
		input[6].replace(/.+:/, "").trim().split("\n"),
	);

	const humToLoc: Map<number, number> = getMap(
		seeds,
		input[7].replace(/.+:/, "").trim().split("\n"),
	);

	let locations = [];
	for (const seed of seeds) {
		const seedDst = seedToSoil.get(seed) ?? seed;
		const fertDst = soilToFert.get(seedDst) ?? seedDst;
		const waterDst = fertToWater.get(fertDst) ?? fertDst;

		const lightDst = waterToLight.get(waterDst) ?? waterDst;
		const tempDst = lightToTemp.get(lightDst) ?? lightDst;
		const humDst = tempToHum.get(tempDst) ?? tempDst;
		const locDst = getMap(
			humDst,
			input[7].replace(/.+:/, "").trim().split("\n"),
		).get(humDst);
		locations.push(locDst);
	}
	console.log(`Lowest value is ${Math.min(...locations)}`);
	const end = performance.now();
	console.log(`Took ${(end - start) / 1000} seconds to complete...`);
}

// Index 0 is the mapping name (seed-to-soil)
function getMap(seed: number, mapping: string[]): Map<number, number> {
	let map = new Map();
	for (let idx = 0; idx < mapping.length; idx++) {
		const [dst, src, rng] = mapping[idx].split(" ").map((x) => parseInt(x));

		if (src + rng >= seed && src <= seed) {
			for (let idx2 = 0; idx2 < seed; idx2++) {
				if (src + idx2 == seed) {
					map.set(src + idx2, dst + idx2);
				}
			}
		} else {
			map.set(seed, seed);
		}
	}

	// simply for testing, not actually needed to sort
	// map = new Map([...map.entries()].sort());
	console.log(map);

	return map;
}

export function part1(): void {
	solve();
}
