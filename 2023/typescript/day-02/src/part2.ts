import fs from "fs";

// Ordered Red, Green, Blue
let powerSum = 0;

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

		// Find the minimum number of cubes for each game:
		const minimum = findMinimum(sets);
		powerSum += minimum[0] * minimum[1] * minimum[2];
	});
	console.log(`Power for games is ${powerSum}`);
}

function findMinimum(sets: number[][]): number[] {
	let reds: number[] = [];
	let greens: number[] = [];
	let blues: number[] = [];

	sets.forEach((set) => {
		reds.push(set[0]);
		greens.push(set[1]);
		blues.push(set[2]);
	});

	return [Math.max(...reds), Math.max(...greens), Math.max(...blues)];
}

export function part2(): void {
	solve();
}
