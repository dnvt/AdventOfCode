const fs = require("fs")
const day = "day03"

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

function part1() {
  return processInput(day, (input) => {
    console.table(input)

    let height = input.length
    let width = input[0].length

    const dx = [-1, -1, -1, 0, 0, 1, 1, 1]
    const dy = [-1, 0, 1, -1, 1, -1, 0, 1]

    let number = ""

    let cacheOfNumbers = {}

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (!isNaN(input[y][x])) {
          number += input[y][x]
        } else {
          if (number !== "") {
            cacheOfNumbers[number] = {
              y,
              x: { start: x - number.length, end: x },
            }
          }
          number = ""
        }
      }
    }
    console.log(cacheOfNumbers)

    let sum = 0

    for (let number in cacheOfNumbers) {
      let { y, x } = cacheOfNumbers[number]

      console.log("number: ", number, "coordinates: ", y, x)

      let isSurroundedByDots = true

      for (let j = x.start; j <= x.end; j++) {
        for (let i = 0; i < dx.length; i++) {
          let newY = y + dy[i]
          let newX = j + dx[i]

          let element = "."

          if (newY >= 0 && newY < height && newX >= 0 && newX < width) {
            if (isNaN(input[newY][newX])) {
              element = input[newY][newX]
            }
          }

          console.log("coordinates: ", newY, newX, "element: ", element)

          if (element !== ".") {
            isSurroundedByDots = false
            break
          }
        }
        if (!isSurroundedByDots) break
      }

      if (!isSurroundedByDots) {
        sum += Number(number)
      }
    }

    return sum
  })
}

function part2() {
  return "Not implemented"
}

run(process.argv[2])
