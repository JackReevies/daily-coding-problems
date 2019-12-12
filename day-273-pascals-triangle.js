/*
Pascal's triangle is a triangular array of integers constructed with the following formua:
  + The first row consists of the number 1
  + For each subsequent row, each element is the sum of the numbers directly above it, on either side

  Given an input `k` return the `k`th row of Pascals triangle
*/

function getRow (n, previousRow) {
  const row = [1]
  for (let i = 1; i < previousRow.length; i++) {
    const leftNumber = previousRow[i - 1]
    const rightNumber = previousRow[i]
    row.push(leftNumber + rightNumber)
  }
  row.push(1)
  return row
}

function drawTriangle (k) {
  const triangle = [[1]]
  for (let i = 2; i <= k; i++) {
    triangle.push(getRow(i, triangle[triangle.length - 1]))
  }

  const paddedTriangle = padTriangle(triangle) // For layout only
  for (let i = 0; i < paddedTriangle.length; i++) {
    const row = paddedTriangle[i]
    console.log(row.join(' '))
  }
}

function padTriangle (triangle) {
  const max = triangle.reduce((acc, row) => acc < row.length ? row.length : acc, 0)
  const maxNumberSize = triangle[triangle.length - 1].reduce((acc, num) => num.toString().length > acc ? num.toString().length : acc, 0) * 2
  const paddedTriangle = []
  for (let i = 0; i < triangle.length; i++) {
    /** @type {Array} */
    let row = triangle[i]
    row.forEach((num, i) => { row[i] = `${num.toString().padStart(maxNumberSize, ' ')}` })
    if (row.length % 2 === 0) {
      const half = Math.floor(row.length / 2)
      row = row.slice(0, half).concat([' '.padStart(maxNumberSize)]).concat(row.splice(half))
    }
    const padLeft = Math.floor((max - row.length) / 2) + 1
    const padRight = Math.ceil((max - row.length) / 2) + 1
    const leftArray = new Array(padLeft).fill(' '.padStart(maxNumberSize, ' '))
    const rightArray = new Array(padRight).fill(' '.padStart(maxNumberSize, ' '))
    paddedTriangle.push(leftArray.concat(row).concat(rightArray))
  }
  return paddedTriangle
}

drawTriangle(10)
