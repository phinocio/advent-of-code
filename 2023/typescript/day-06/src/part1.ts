import fs from "fs";

function solve(): void {
	console.log(`Starting timing...`);
	const start = performance.now();

	const input: string[] = fs
		.readFileSync("src/inputs/part1.txt")
		.toString()
		.trim()
		.split("\n");

	const times = [...input[0].matchAll(/\d+/g)].map((x) => parseInt(x[0]));
	const distances = [...input[1].matchAll(/\d+/g)].map((x) => parseInt(x[0]));

	let waysToWin: number[] = Array(times.length).fill(0);
	for (let idx = 0; idx < times.length; idx++) {
		for (let held = 0; held < times[idx]; held++) {
			if (held * (times[idx] - held) > distances[idx]) {
				waysToWin[idx] += 1;
			}
		}
	}
	console.log(
		`The margin of error is ${waysToWin.reduce((a, b) => a * b, 1)}`,
	);

	const end = performance.now();
	console.log(`Took ${(end - start) / 1000} seconds to complete...`);
}

export function part1(): void {
	solve();
}
