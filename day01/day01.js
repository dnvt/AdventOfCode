const fs = require("fs")
let day = "day01"

const wordToDigit = (word) => {
  switch (word) {
    case "one":
      return 1
    case "two":
      return 2
    case "three":
      return 3
    case "four":
      return 4
    case "five":
      return 5
    case "six":
      return 6
    case "seven":
      return 7
    case "eight":
      return 8
    case "nine":
      return 9
    case "zero":
      return 0
    default:
      return parseInt(word)
  }
}

const findMatchingSuffix = (input, regex) => {
  const matches = input.matchAll(regex)
  let lastMatch

  for (const match of matches) {
    lastMatch = match
  }

  if (lastMatch) {
    return {
      matchStatus: "match",
      match: [lastMatch.input.slice(lastMatch.index), lastMatch[0]],
    }
  } else {
    return { matchStatus: "no_match", match: "" }
  }
}

const processInput = (day, processFunc) => {
  let input = fs.readFileSync(day + ".txt", "utf8").split("\n")
  return processFunc(input)
}

const part1 = () => {
  return processInput(day, (input) =>
    input
      .map((line) => {
        const matches = line.match(/\d/g)
        return parseInt(matches[0] + matches.slice(-1))
      })
      .reduce((a, b) => a + b, 0)
  )
}

const part2 = () => {
  return processInput(day, (input) =>
    input
      .map((line) => {
        const regex = /one|two|three|four|five|six|seven|eight|nine|zero|\d/g
        const matches = line.match(regex)
        const first = wordToDigit(matches[0])

        const { match } = findMatchingSuffix(line, regex)
        const last = wordToDigit(match[1])

        return parseInt(first.toString() + last.toString())
      })
      .reduce((a, b) => a + b, 0)
  )
}

const run = (arg) => {
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

run(process.argv[2])
