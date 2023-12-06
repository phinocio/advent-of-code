import fs from "fs";

function solve(): void {
	const games: string[] = fs
		.readFileSync("src/inputs/part1.txt")
		.toString()
		.trim()
		.split("\n");

	let sum: number = 0;

	for (let idx = 0; idx < games.length; idx++) {
		const numbers: string[] = games[idx]
			.replace(/Card \d+: /, "")
			.split("|");
		let gameSum: number = 0;

		const winningNumbers = numbers[0]
			.trim()
			.split(" ")
			.filter((x) => x != "");
		const myNumbers = numbers[1]
			.trim()
			.split(" ")
			.filter((x) => x != "");

		for (const number of winningNumbers) {
			if (myNumbers.includes(number)) {
				if (!gameSum) {
					gameSum = 1;
				} else {
					gameSum *= 2;
				}
			}
		}

		sum += gameSum;
	}
	console.log(`Sum is ${sum}`);
}

export function part1(): void {
	solve();
}
