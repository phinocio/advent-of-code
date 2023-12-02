import fs from "fs";

const numberMap: Map<string, string> = new Map([
	["one", "1"],
	["two", "2"],
	["three", "3"],
	["four", "4"],
	["five", "5"],
	["six", "6"],
	["seven", "7"],
	["eight", "8"],
	["nine", "9"],
]);

function solve(): void {
	const input: string[] = fs
		.readFileSync("src/inputs/part1.txt")
		.toString()
		.trim()
		.split("\n");

	let total: number = 0;

	input.forEach((line: string) => {
		for (const [key, value] of numberMap) {
			while (line.match(key)) {
				const idx = line.indexOf(key);

				if (idx != -1) {
					line =
						line.slice(0, idx + 1) +
						value +
						line.slice(idx + value.length + 1);
				}
			}
		}
		line = line.replace(/[^\d\n]/g, "");
		const num: string = line[0] + line[line.length - 1];
		total += Number(num);
	});
	console.log("Total for part2: " + total);
}

export function part2(): void {
	solve();
}
