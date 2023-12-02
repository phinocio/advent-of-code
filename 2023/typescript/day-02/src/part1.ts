import fs from "fs";

// Ordered Red, Green, Blue
const bag = [12, 13, 14];
let gameSum = 0;

function solve(): void {
	const input: string[] = fs
		.readFileSync("src/inputs/part1.txt")
		.toString()
		.trim()
		.split("\n");

	input.forEach((line: string) => {
		// Get the game number.
		let gameNum: RegExpMatchArray | null = line.match(/(\d+)/);

		// If there is no number found, we can't solve, so exit.
		if (!gameNum) {
			console.error("Regex did not match a game number.");
			process.exit(1);
		}

		// We have the game number, so remove that part from the line.
		line = line.substring(line.indexOf(gameNum[0]) + 2).trim();

		// Get the sets in each game.
		let sets: string[] | number[][] = line.split(";");

		// Order them in terms of Red, Green Blue, putting in 0s for if there is no entry.
		sets = sets.map((set) => {
			let tmp: number[] = [];

			const red = set.match(/(\d+) red/);
			const green = set.match(/(\d+) green/);
			const blue = set.match(/(\d+) blue/);

			tmp[0] = red ? Number(red[1]) : 0;
			tmp[1] = green ? Number(green[1]) : 0;
			tmp[2] = blue ? Number(blue[1]) : 0;

			return tmp;
		});

		let validGame: boolean = true;

		sets.forEach((set) => {
			if (set[0] > bag[0] || set[1] > bag[1] || set[2] > bag[2]) {
				// console.log(`Game ${gameNum} is not possible`);
				validGame = false;
			}
		});
		if (validGame) {
			gameSum += Number(gameNum[0]);
		}
	});
	console.log(`Sum for games is ${gameSum}`);
}

export function part1(): void {
	solve();
}
