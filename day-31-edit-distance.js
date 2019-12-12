/*
This problem was asked by Google.

The edit distance between two strings refers to the minimum number of character insertions, deletions, and substitutions required to change one string to the other.
For example, the edit distance between “kitten” and “sitting” is three: substitute the “k” for “s”, substitute the “e” for “i”, and append a “g”.

Given two strings, compute the edit distance between them.
*/

const inputString = 'kitann'
const inputString2 = 'sitting'

function stringToArray (input) {
  let array = []
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    array.push(char)
  }
  return array
}

function isAligned (input, target) {
  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    const targetChar = target[i]
    if (char) {
      if (targetChar !== char) {
        return false 
      }
    }
  }
  return true
}

function checkForNonNullsAfterIndex(array, index){
  for (let i = index; i < array.length; i++) {
    const char = array[index];
    if (char){
      return true
    }
  }
  return false
}

function findDistance (input, input2) {
  let eval = []
  let inputArray = stringToArray(input)
  let input2Array = stringToArray(input2)
  let smallest = inputArray
  let longest = input2Array
  let third = []
  let cost = 0
  if (input.length > input2.length) {
    smallest = input2Array
    longest = inputArray
  }

  let matchSmallest = Object.assign([], smallest)
  let matchLongest = Object.assign([], longest)

  for (let i = 0; i < matchSmallest.length; i++) {
    const char = matchSmallest[i]
    let matchedChar = null
    for (let x = 0; x < matchLongest.length; x++) {
      const longChar = matchLongest[x]
      if (longChar === char) {
        matchedChar = char
        matchLongest[x] = null
        break
      }
    }
    if (matchedChar) {
      matchSmallest[i] = null
    }
    third.push(matchedChar)
  }

  // Removal

  for (let i = 0; i < third.length; i++) {
    const thirdChar = third[i]
    const longestChar = longest[i]
    if (thirdChar !== longestChar) {
      // Character in the wrong place - lets try removing it
      let tmpThird = Object.assign([], third)
      tmpThird.splice(i, 1)
      
      if (checkForNonNullsAfterIndex(tmpThird, i) && isAligned(tmpThird, longest)){
        // If we remove this character, the other non nulls become correct
        third.splice(i, 1)
        third.push(null)
        cost++
        console.log(`Char ${thirdChar} is out of place at position ${i}. Removing at the cost of 1 (total cost: ${cost}) (current string: ${third.map(char => { if (char) return char })})`)
        i--
      }
    }
  }

  // Substitutions

  for (let i = 0; i < third.length; i++) {
    const thirdChar = third[i];
    if (!thirdChar) {
      // We need to make a sub here
      third[i] = longest[i]
      cost++
      console.log(`Substituting ${thirdChar} for ${longest[i]} at position ${i} at the cost of 1 (total cost: ${cost}) (current string: ${third.map(char => { if (char) return char })})`)
    }
  }

  // Additions

  for (let i = 0; i < longest.length; i++) {
    const longestChar = longest[i]
    const thirdChar = third[i]
    if (thirdChar !== longestChar) {
      third[i] = longestChar
      cost++
      console.log(`Adding ${longestChar} at position ${i} at the cost of 1 (total cost: ${cost}) (current string: ${third.map(char => { if (char) return char })})`)
    }
  }
}

console.log(findDistance(inputString, inputString2))
