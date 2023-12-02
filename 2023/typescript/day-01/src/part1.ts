import fs from "fs";

function solve(): void {
	const input: string[] = fs
		.readFileSync("src/inputs/part1.txt")
		.toString()
		.replace(/[^\d\n]/g, "")
		.trim()
		.split("\n");

	let total: number = 0;
	input.forEach((line: string) => {
		const num: string = line[0] + line[line.length - 1];
		total += Number(num);
	});

	console.log("Total for part1: " + total);
}

export function part1(): void {
	solve();
}
