const fs = require("fs")
let day = "day02"

const MOVE_MAP = {
  X: "A", // Rock
  Y: "B", // Paper
  Z: "C", // Scissors
}

const PLAYER_MOVE = {
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3, // Scissors
}

const ROUND_RESULT = {
  X: 0, // Lose
  Y: 3, // Tie
  Z: 6, // Win
}

function gameScore(oppMove, playerMove) {
  if (
    (oppMove === "A" && playerMove === "Y") ||
    (oppMove === "B" && playerMove === "Z") ||
    (oppMove === "C" && playerMove === "X")
  ) {
    return 6 + PLAYER_MOVE[playerMove]
  } else if (oppMove === MOVE_MAP[playerMove]) {
    return 3 + PLAYER_MOVE[playerMove]
  } else {
    return PLAYER_MOVE[playerMove]
  }
}

function getScore(round) {
  let oppMove = round[0]
  let playerMove = round[2]
  return gameScore(oppMove, playerMove)
}

function gameScorePart2(oppMove, roundResult) {
  let playerMove

  if (
    (roundResult === "X" && oppMove === "B") ||
    (roundResult === "Y" && oppMove === "A") ||
    (roundResult === "Z" && oppMove === "C")
  )
    playerMove = PLAYER_MOVE["X"]
  else if (
    (roundResult === "X" && oppMove === "C") ||
    (roundResult === "Y" && oppMove === "B") ||
    (roundResult === "Z" && oppMove === "A")
  )
    playerMove = PLAYER_MOVE["Y"]
  else playerMove = PLAYER_MOVE["Z"]

  return ROUND_RESULT[roundResult] + playerMove
}

function getScorePart2(round) {
  let oppMove = round[0]
  let roundResult = round[2]
  return gameScorePart2(oppMove, roundResult)
}

function part1() {
  return processInput(day, (input) =>
    input.map(getScore).reduce((a, b) => a + b, 0)
  )
}

function part2() {
  return processInput(day, (input) =>
    input.map(getScorePart2).reduce((a, b) => a + b, 0)
  )
}

function processInput(day, processFunc) {
  let input = fs.readFileSync(day + ".txt", "utf8").split("\n")
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

run(process.argv[2])
