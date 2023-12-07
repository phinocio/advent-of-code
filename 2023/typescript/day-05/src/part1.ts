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

	// const seedToSoil = getMap(
	// 	seeds,
	// 	input[1].replace(/ map:/, "").trim().split("\n"),
	// );
	//
	// const soilToFert: Map<number, number> = getMap(
	// 	seeds,
	// 	input[2].replace(/.+:/, "").trim().split("\n"),
	// );
	//
	// const fertToWater: Map<number, number> = getMap(
	// 	seeds,
	// 	input[3].replace(/.+:/, "").trim().split("\n"),
	// );
	//
	// const waterToLight: Map<number, number> = getMap(
	// 	seeds,
	// 	input[4].replace(/.+:/, "").trim().split("\n"),
	// );
	//
	// const lightToTemp: Map<number, number> = getMap(
	// 	seeds,
	// 	input[5].replace(/.+:/, "").trim().split("\n"),
	// );
	//
	// const tempToHum: Map<number, number> = getMap(
	// 	seeds,
	// 	input[6].replace(/.+:/, "").trim().split("\n"),
	// );
	//
	// const humToLoc: Map<number, number> = getMap(
	// 	seeds,
	// 	input[7].replace(/.+:/, "").trim().split("\n"),
	// );

	let locations: number[] = [];
	// for (const seed of seeds) {
	// const seedDst = seedToSoil.get(seed) ?? seed;
	// const fertDst = soilToFert.get(seedDst) ?? seedDst;
	// const waterDst = fertToWater.get(fertDst) ?? fertDst;
	//
	// const lightDst = waterToLight.get(waterDst) ?? waterDst;
	// const tempDst = lightToTemp.get(lightDst) ?? lightDst;
	// const humDst = tempToHum.get(tempDst) ?? tempDst;
	// const locDst = getMap(
	// 	humDst,
	// 	input[7].replace(/.+:/, "").trim().split("\n"),
	// ).get(humDst);
	// locations.push(locDst);
	// }
	for (const seed of seeds) {
		const soilDst: number = getMap(
			seed,
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

export function part1(): void {
	solve();
}
