const fs = require("fs")
const day = "data"

function processInput(day, processFunc) {
  let input = fs.readFileSync(day + ".txt", "utf8").split("\n")
  input = input
    .filter((line) => line.trim() !== "")
    .map((line) => {
      return line
        .replace(/Card \d+: /, "")
        .split(" | ")
        .map((part) => new Set(part.trim().split(" ")))
    })

  return processFunc(input)
}

function run(arg) {
  switch (arg) {
    case "part1":
      console.log(part1())
      break
    case "part2":
      console.log(part2())
      break
    default:
      console.log(`Unknown argument: ${arg}`)
      process.exit(1)
  }
}

function part1() {
  return processInput(day, (input) => {
    let totalScore = 0

    console.table(input)

    input.forEach((newCard) => {
      let cardScore = 0

      for (const num of Array.from(newCard[0])) {
        if (num.trim() !== "" && newCard[1].has(num)) {
          cardScore = cardScore === 0 ? 1 : cardScore * 2
        }
      }

      console.log(cardScore)
      totalScore += cardScore
    })

    return totalScore
  })
}

function part2() {
  return "Not implemented"
}

run(process.argv[2])
