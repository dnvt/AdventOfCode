const fs = require("fs")
const day = "day03"

function processInput(day, processFunc) {
  let input = fs.readFileSync(day + ".txt", "utf8").split("\n")

  input = input.filter((line) => line.trim() !== "")
  const maxLength = Math.max(...input.map((line) => line.length))
  input = input.map((line) => line.padEnd(maxLength, "."))

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

function isNonNumeric(value) {
  // Updated to more clearly identify non-numeric and non-dot characters
  return /[^0-9\.]/.test(value)
}

function part1() {
  return processInput(day, (input) => {
    const height = input.length
    const width = input[0].length
    let number = ""
    let cacheOfNumbers = {}

    for (let y = 0; y < height; y++) {
      for (let x = 0; x <= width; x++) {
        if (!isNaN(parseInt(input[y][x]))) {
          number += input[y][x]
        } else {
          if (number !== "") {
            cacheOfNumbers[[y, x - number.length, number].join(" ")] = {
              y,
              x: { start: x - number.length, end: x - 1 },
            }
            number = ""
          }
        }
      }
      number = "" // reset the number when the line ends
    }

    const deltaX = [-1, -1, -1, 0, 0, 1, 1, 1]
    const deltaY = [-1, 0, 1, -1, 1, -1, 0, 1]

    let sum = 0

    for (let key in cacheOfNumbers) {
      const { y, x } = cacheOfNumbers[key]
      let isSurroundedByDots = true

      digitLoop: for (let m = x.start; m <= x.end; m++) {
        for (let j = 0; j < deltaY.length; j++) {
          let newY = y + deltaY[j]
          let newX = m + deltaX[j]

          // Check boundaries
          if (newY >= 0 && newY < height && newX >= 0 && newX < width) {
            if (isNonNumeric(input[newY][newX])) {
              isSurroundedByDots = false
              break digitLoop
            }
          }
        }
      }

      if (!isSurroundedByDots) {
        let actualNumber = key.split(" ").pop()
        sum += Number(actualNumber)
      }
    }

    return sum
  })
}

function part2() {
  return "Not implemented"
}

run(process.argv[2])
