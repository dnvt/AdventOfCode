const fs = require("fs")
const day = "day02"

const CUBES = {
  red: 12,
  green: 13,
  blue: 14,
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

function processInput(day, processFunc) {
  let input = fs
    .readFileSync(day + ".txt", "utf8")
    .split("\nGame ")
    .map((round) => {
      const array = round.split(": ")
      const roundArr = array[1].split(";").map((roundStr) => {
        const colorCounts = roundStr
          .trim()
          .split(",")
          .reduce(
            (counts, colorCountString) => {
              let [count, color] = colorCountString.trim().split(" ")
              // remove any trailing comma
              color = color.replace(/,$/, "")
              counts[color] = parseInt(count)
              return counts
            },
            { red: 0, green: 0, blue: 0 }
          )
        return colorCounts
      })
      return { [array[0]]: roundArr }
    })
  return processFunc(input)
}

// Part 01

function part1() {
  return processInput(day, (input) =>
    input.map(isRealGame).reduce((a, b) => a + b, 0)
  )
}

function isRealGame(round) {
  const game = Object.keys(round)[0]
  const rounds = round[game]

  for (const round of rounds) {
    if (
      round.red > CUBES.red ||
      round.green > CUBES.green ||
      round.blue > CUBES.blue
    ) {
      return 0
    }
  }

  return Number(game)
}

// Part 02

function part2() {
  return processInput(day, (input) =>
    input.map(getPowerOfSet).reduce((a, b) => a + b, 0)
  )
}

function getPowerOfSet(round) {
  const game = Object.keys(round)[0]
  const rounds = round[game]

  const maxNumbers = rounds.reduce(
    (maxNumbersInit, round) => {
      maxNumbersInit.red = Math.max(maxNumbersInit.red, round.red)
      maxNumbersInit.green = Math.max(maxNumbersInit.green, round.green)
      maxNumbersInit.blue = Math.max(maxNumbersInit.blue, round.blue)

      return maxNumbersInit
    },
    { red: 0, green: 0, blue: 0 }
  )

  console.log(Object.values(maxNumbers))
  return Object.values(maxNumbers).reduce((acc, number) => acc * number, 1)
}

run(process.argv[2])
