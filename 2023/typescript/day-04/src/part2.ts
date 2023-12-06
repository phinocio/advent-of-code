import fs from "fs";

function solve(): void {
	const games: string[] = fs
		.readFileSync("src/inputs/part1.txt")
		.toString()
		.trim()
		.split("\n");

	let cards: number[] = Array(games.length).fill(1);

	let copies: number = 0;
	for (let idx = 0; idx < games.length; idx++) {
		const numbers: string[] = games[idx]
			.replace(/Card \d+: /, "")
			.split("|");

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
				copies += 1;
			}
		}

		for (let idx2 = 1; idx2 <= copies; idx2++) {
			cards[idx + idx2] += cards[idx];
		}

		copies = 0;
	}
	console.log(cards);

	console.log(`Total cards is ${cards.reduce((acc, num) => acc + num)}`);
}

export function part2(): void {
	solve();
}
