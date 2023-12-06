import fs from "fs";

let gearRatios = 0;
let digitRe = /\d+/;

function solve(): void {
	const input: string[] = fs
		.readFileSync("src/inputs/example4.txt")
		.toString()
		.trim()
		.split("\n");

	for (const idx in input) {
		const asterisks = [...input[idx].matchAll(/\*/g)];

		for (const asterisk of asterisks) {
			const idxAst: number = Number(asterisk.index);
			let gears: number[] = [];
			if (!asterisk || !idxAst || !asterisk.input) {
				console.error("No asterisk, rip");
				process.exit(1);
			}

			// Check left
			if (idxAst > 0) {
				if (digitRe.test(input[idx][idxAst - 1])) {
					// Get the digit from here.
					const number = input[idx].slice(idxAst - 3).match(/\d+/);
					if (!number) {
						console.error(
							"For some reason, we detected that there was a number to the left of *, but failed to capture it",
						);
						process.exit(1);
					}
					gears.push(Number(number[0]));
				}
			}

			// Check right
			if (idxAst < input[idx].length) {
				if (digitRe.test(input[idx][idxAst + 1])) {
					// Get the digit from here.
					const number = asterisk.input
						.substring(idxAst, input[idx].length - 1)
						.match(/\d+/);
					if (!number) {
						console.error(
							"For some reason, we detected that there was a number to the left of *, but failed to capture it",
						);
						process.exit(1);
					}
					gears.push(Number(number[0]));
				}
			}

			// Check up
			if (Number(idx) > 0) {
				const checkRange = input[Number(idx) - 1].slice(
					idxAst == 0 ? idxAst : idxAst - 1,
					idxAst == input[Number(idx)].length ? idxAst : idxAst + 2,
				);

				if (digitRe.test(checkRange)) {
					const range = input[Number(idx) - 1].slice(
						idxAst - 3 < 0 ? 0 : idxAst - 3,
						idxAst + 4 > input.length - 1
							? input.length
							: idxAst + 4,
					);

					let number = [...range.matchAll(/\d+/g)];
					if (!number) {
						console.error(
							"For some reason, we detected that there was a number above *, but failed to capture it",
						);
						process.exit(1);
					}

					if (number.length == 1) {
						gears.push(Number(number[0]));
					} else {
						if (
							number[0].toString().length === 3 &&
							number[1].toString().length === 3
						) {
							gears.push(Number(number[0]));
							gears.push(Number(number[0]));
						} else if (
							number[0].index == 2 ||
							number[0].index == 3 ||
							number[0].index == 4
						) {
							gears.push(Number(number[0]));
						} else if (
							number[1].index == 2 ||
							number[1].index == 3 ||
							number[1].index == 4
						) {
							gears.push(Number(number[1]));
						} else {
							gears.push(Number(number[0]));
						}
					}
				}
			}

			// Check down
			if (Number(idx) < input.length - 1) {
				const checkRange = input[Number(idx) + 1].slice(
					idxAst == 0 ? idxAst : idxAst - 1,
					idxAst == input[Number(idx)].length ? idxAst : idxAst + 2,
				);

				if (digitRe.test(checkRange)) {
					const range = input[Number(idx) + 1].slice(
						idxAst - 3 < 0 ? 0 : idxAst - 3,
						idxAst + 4 > input.length - 1
							? input.length
							: idxAst + 4,
					);

					let number = [...range.matchAll(/\d+/g)];
					if (!number) {
						console.error(
							"For some reason, we detected that there was a number above *, but failed to capture it",
						);
						process.exit(1);
					}

					if (number.length == 1) {
						gears.push(Number(number[0]));
					} else if (number.length == 2) {
						if (
							number[0].toString().length === 3 &&
							number[1].toString().length === 3
						) {
							gears.push(Number(number[0]));
							gears.push(Number(number[1]));
						} else if (
							number[0].index == 2 ||
							number[0].index == 3 ||
							number[0].index == 4
						) {
							gears.push(Number(number[0]));
						} else if (
							number[1].index == 2 ||
							number[1].index == 3 ||
							number[1].index == 4
						) {
							gears.push(Number(number[1]));
						} else {
							gears.push(Number(number[0]));
						}
					}
				}
			}
			console.log(gears);
			if (gears.length == 2) {
				gearRatios += gears[0] * gears[1];
			}
		}
	}

	console.log(`Sum of gear ratios for part 2 is ${gearRatios}`);
}

export function part2(): void {
	solve();
}
