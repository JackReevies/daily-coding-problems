/*
This problem was asked by Amazon.

Run-length encoding is a fast and simple method of encoding strings.
The basic idea is to represent repeated successive characters as a single count and character.
For example, the string "AAAABBBCCDAA" would be encoded as "4A3B2C1D2A".

Implement run-length encoding and decoding.
You can assume the string to be encoded have no digits and consists solely of alphabetic characters.
You can assume the string to be decoded is valid.
*/

const inputString = 'AAAABBBCCDAA'

function encode (input) {
  let lastChar
  let currentCount = 0
  let encoded = ''
  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    if (!lastChar || lastChar !== char) {
      if (lastChar) {
        encoded += `${currentCount}${lastChar}`
      }
      lastChar = char
      currentCount = 1
    } else {
      currentCount++
    }
  }
  return `${encoded}${currentCount}${lastChar}`
}

function decode (input) {
  let decoded = ''
  for (let i = 0; i < input.length - 1; i += 2) {
    const count = input[i]
    const char = input[i + 1]
    decoded += repeatChars(char, count)
  }
  return decoded
}

function repeatChars (char, count) {
  let builder = ''
  for (let i = 0; i < count; i++) {
    builder += char
  }
  return builder
}

let encoded = encode(inputString)
let decoded = decode(encoded)
console.log(`Input: ${inputString}`)
console.log(`Encoded: ${encoded}`)
console.log(`Decoded: ${decoded}`)
console.log(`Self Test: ${inputString === decoded ? 'input is equal to decoded' : 'decoded string was not equal to input string'}`)
