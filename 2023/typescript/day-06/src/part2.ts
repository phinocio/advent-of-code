import fs from "fs";

function solve(): void {
	console.log(`Starting timing...`);
	const start = performance.now();

	const input: string[] = fs
		.readFileSync("src/inputs/part1.txt")
		.toString()
		.trim()
		.split("\n");

	const time = parseInt(input[0].replace(/\s/g, "").split(":")[1]);
	const distance = parseInt(input[1].replace(/\s/g, "").split(":")[1]);

	const winningMS = [];
	for (let held = 0; held < time; held++) {
		if (held * (time - held) > distance) {
			winningMS.push(held);
		}
	}
	console.log(
		`The margin of error is ${
			winningMS[winningMS.length - 1] - winningMS[0] + 1
		}`,
	);

	const end = performance.now();
	console.log(`Took ${(end - start) / 1000} seconds to complete...`);
}

export function part2(): void {
	solve();
}
