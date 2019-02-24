/*
This problem was asked by Facebook.

Given a string of round, curly, and square open and closing brackets, return whether the brackets are balanced (well-formed).

For example, given the string "([])[]({})", you should return true.

Given the string "([)]" or "((()", you should return false.

*/
const inputString = '3'

function isWellBalanced (input) {
  if (input.length === 0) {
    return true
  }
  if (input.length === 1) {
    return false
  }
  for (let i = 0; i < input.length;) {
    const char = input[i]
    let closing = ''
    if (char === '(') {
      closing = ')'
    } else if (char === '[') {
      closing = ']'
    } else if (char === '{') {
      closing = '}'
    }
    if (!closing) {
      i++
      continue
    }
    let closingIndex = -1
    let lvl = 0
    for (let x = i; x < input.length; x++) {
      const element = input[x]
      if (element === char) {
        lvl++
      } else if (element === closing) {
        lvl--
      }
      if (element === closing && lvl === 0) {
        closingIndex = x
        break
      }
    }
    if (closingIndex === -1) {
      return false
    }
    if (input.length === 2 && closingIndex > -1) {
      return true
    }
    let substr = input.substring(i + 1, closingIndex)
    input = input.substring(0, i + 1) + input.substring(closingIndex)
    if (substr.length > 0) {
      if (!isWellBalanced(substr)) {
        return false
      }
    } else {
      input = input.substring(0, i) + input.substring(closingIndex + 1)
    }
  }
  if (input.length === 0) {
    return true
  }
}

console.log(isWellBalanced(inputString))
