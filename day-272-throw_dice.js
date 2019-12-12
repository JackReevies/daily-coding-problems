const colors = require('colors')
const hashMap = require('hashmap')

/*
This problem was asked by Spotify.

Write a function, throw_dice(N, faces, total), that determines
how many ways it is possible to throw N dice with some number 
of faces each to get a specific total.

For example, throw_dice(3, 6, 7) should equal 15.

*/

function throw_dice(n, faces, total) {
  let max = Math.min(total - n + 1, faces)
  let combinations = []
  for (let a = 1; a <= max; a++) {
    // ie,. when dice One is 1, the other dice need to add to total - 1
    if (total - a <= faces) {
      combinations.push([a, total - a])
    }
    let brokeDown = breakDown(faces, total - a)
    let numbers = [a].concat(brokeDown)
    //if (numbers.reduce((acc, obj) => acc + obj, 0) < total) continue
    //if (numbers.length > n) continue
    if (!containsSameCombination(combinations, numbers)) {
      combinations.push(numbers)
      goDeeper(n, faces, numbers, combinations)
    }
  }

  combinations = combinations.filter(o => o.length === n)
  let newStuff = new hashMap()

  for (let i = 0; i < combinations.length; i++) {
    const sequence = combinations[i];
    let created = []
    fiddleNeighbors(faces, sequence, newStuff)
  }


  let valids = []
  let estimatedPerms = 0

  for (let i = 0; i < combinations.length; i++) {
    const combo = combinations[i];
    if (combo.reduce((acc, obj) => acc + obj, 0) !== total || combo.length !== n) {
      // console.log(`wah`)
    } else {
      valids.push(combo)
    }
  }

  // console.log(`${valids.length} COMBINATIONS FOR  ESTIMATED ${estimatedPerms}`)
  let permutations = new hashMap(newStuff)
  console.log(`RESULTS\n-=-=-=-=-=-`.brightMagenta)
  valids.forEach((o, i) => {
    //findWaysOfPrinting(o, permutations)
    console.log(`Combination: ${o.join(', ')} is valid ${i} / ${valids.length} | ${permutations.size}`.green)
  })
  // permutations.forEach(o => console.log(o.join(' ').yellow))
  console.log(`Found a total of ${permutations.size} permutations`.brightMagenta)
  return permutations.size
}

function fiddleNeighbors(faces, sequence, permutations) {
  let newAdditions = [sequence]
  let currentSequence
  while (newAdditions.length > 0) {
    currentSequence = newAdditions.splice(0, 1)[0]
    for (let a = 0; a < currentSequence.length; a++) {
      const firstDice = currentSequence[a];
      for (let b = a + 1; b < currentSequence.length; b++) {
        const anotherDice = currentSequence[b]
        for (let x = 1 - firstDice; x < faces; x++) { // CAN OPTIMISE THE WHILE PART
          if (firstDice + x <= faces && firstDice + x > 0 && anotherDice - x >= 1 && anotherDice - x <= faces) {
            let newSequence = currentSequence.slice()
            newSequence.splice(a, 1, firstDice + x)
            newSequence.splice(b, 1, anotherDice - x)
            if (!permutations.has(newSequence)) {
              permutations.set(newSequence, newSequence)
              newAdditions.push(newSequence)
            }
          }
        }
      }
    }
  }
}

function containsSameCombination(array, com) {
  for (let i = 0; i < array.length; i++) {
    const com2 = array[i];
    if (isSameCombination(com, com2)) {
      return true
    }
  }
}

function isSameCombination(com1, com2) {
  com1.sort()
  com2.sort()
  for (let i = 0; i < com1.length; i++) {
    const ele1 = com1[i]
    const ele2 = com2[i]
    if (ele1 !== ele2) {
      return false
    }
  }
  return true
}

function goDeeper(die, faces, sequence, all) {
  for (let i = 0; i < sequence.length; i++) {
    const n = sequence[i];
    if (n >= 2) {
      let tmp = breakDown(faces, n)
      let another = Object.assign([], sequence)
      another.splice(i, 1)
      another = another.slice(0, i).concat(tmp).concat(another.slice(i))
      // console.log(`SPAwNED ${another.join(', ')} from ${sequence.join(', ')}`)
      if (another.length > die) continue
      if (!containsSameCombination(all, another)) {
        all.push(another)
        goDeeper(die, faces, another, all)
      }

    }
  }
}

function breakDown(max, total) {
  let half = total / 2
  let numbers = []
  if (Math.ceil(half) > max) {
    numbers = numbers.concat(breakDown(max, Math.ceil(half)))
  } else {
    numbers.push(Math.ceil(half))
  }
  if (Math.floor(half) > max) {
    numbers = numbers.concat(breakDown(max, Math.floor(half)))
  } else {
    numbers.push(Math.floor(half))
  }
  return numbers
}

function validate() {
  let tests = [
    { input: [3, 6, 7], output: 'X' },
    { input: [4, 6, 7], output: 'X' },
    { input: [5, 6, 18], output: 'X' },
    { input: [3, 8, 18], output: 'X' },
    { input: [4, 7, 21], output: 'X' },
    { input: [5, 9, 15], output: 'X' },
    { input: [7, 6, 27], output: 'X' },
    { input: [3, 11, 15], output: 'X' },
    { input: [10, 6, 34], output: 'X' },
    { input: [10, 7, 40], output: 'X' },
    { input: [10, 8, 40], output: 'X' },
    { input: [10, 9, 65], output: 'X' },
    { input: [10, 10, 75], output: 'X' }
  ]

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    console.log(`RUNNING FOR ${test.input}`)
    let time = Date.now()
    console.log(`Input: ${test.input.join(', ')} | Expected: ${test.output} | Actual: ${throw_dice.apply(this, test.input)} | TIME: ${(Date.now() - time) / 1000} s`)
  }
}

validate()