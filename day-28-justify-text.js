/*
This problem was asked by Palantir.

Write an algorithm to justify text.
Given a sequence of words and an integer line length k, return a list of strings which represents each line, fully justified.

More specifically, you should have as many words as possible in each line.
There should be at least one space between each word.
Pad extra spaces when necessary so that each line has exactly length k.
Spaces should be distributed as equally as possible, with the extra spaces, if any, distributed starting from the left.

If you can only fit one word on a line, then you should pad the right-hand side with spaces.

Each word is guaranteed not to be longer than k.

For example, given the list of words ["the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"] and k = 16,
you should return the following:

["the  quick brown", # 1 extra space on the left
"fox  jumps  over", # 2 extra spaces distributed evenly
"the   lazy   dog"] # 4 extra spaces distributed evenly

*/
const words = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog']
const k = 16

let currentList = []
let currentIndex = 0
let currentLength = 0
let atCapacity = false
let output = []
let verbose = []
for (let i = currentIndex; i < words.length; i++) {
  const word = words[i]
  if (currentLength + word.length <= 15) {
    currentList.push(word)
    currentLength += (word.length + 1)
  } else {
    atCapacity = true
  }
  if (atCapacity || i === words.length - 1) {
    atCapacity = false
    currentLength -= 1 // To remove the last space
    let padding = k - currentLength // how many spaces we need to add in
    for (let i = 0; i < padding; i++) {
      let wordIndexToPad = currentList.length === 1 ? 0 : i % (currentList.length - 1)
      currentList[wordIndexToPad] += ' '
    }
    output.push(currentList.join(' '))
    verbose.push(padding)
    currentList = [word]
    currentLength = word.length + 1
  }
}

console.log(output)

for (let i = 0; i < output.length; i++) {
  const line = output[i]
  const padding = verbose[i]
  if (i === 0) {
    console.log(`["${line}", # ${padding} extra space(s) added`)
  } else if (i !== output.length - 1) {
    console.log(`"${line}", # ${padding} extra space(s) added`)
  } else {
    console.log(`"${line}"] # ${padding} extra space(s) added`)
  }
}
