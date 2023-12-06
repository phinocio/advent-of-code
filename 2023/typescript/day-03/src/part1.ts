import fs from "fs";

let gearRatios = 0;
const symbolRe = /[^\.\d]/;

function solve(): void {
	const input: string[] = fs
		.readFileSync("src/inputs/part1.txt")
		.toString()
		.trim()
		.split("\n");

	for (const idx in input) {
		const numbers = [...input[idx].matchAll(/\d+/g)];
		for (const number of numbers) {
			const start: number = Number(number.index);
			const end: number = Number(number.index) + number[0].length;
			let adjSymbol: boolean = false;

			// Check left of number.
			if (start > 0 && !adjSymbol) {
				adjSymbol = symbolRe.test(input[idx][start - 1]);
			}

			// Check right of number.
			if (end < input[idx].length - 1 && !adjSymbol) {
				adjSymbol = symbolRe.test(input[idx][end]);
			}

			// check line above
			if (Number(idx) > 0 && !adjSymbol) {
				adjSymbol = symbolRe.test(
					input[Number(idx) - 1].slice(start - 1, end + 1),
				);
			}

			// check line below
			if (Number(idx) < input.length - 1 && !adjSymbol) {
				adjSymbol = symbolRe.test(
					input[Number(idx) + 1].substring(
						start == 0 ? start : start - 1,
						end == input[Number(idx)].length ? end : end + 1,
					),
				);
			}

			if (adjSymbol) {
				gearRatios += Number(number[0]);
			}
		}
	}

	console.log(`Sum for gear ratios is ${gearRatios}`);
}

export function part1(): void {
	solve();
}
