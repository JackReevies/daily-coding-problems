#
# In linear algebra, a Toeplitz matrix is one in which the elements on any given diagonal from
# top left to bottom right are identical.
#
# For example:
#
# 1 2 3 4 8
# 5 1 2 3 4
# 4 5 1 2 3
# 7 4 5 1 2
#
# Write a program to determine whether a given input is a Toeplitz matrix.

input = [[1, 2, 3, 4, 8], [5, 1, 2, 3, 4], [4, 6, 1, 2, 3], [7, 4, 5, 1, 2]]

def is_input_toeplitz(matrix):
  expected_row_length = len(matrix[0])
  row = 0
  while(len(matrix) > 0):
    row+=1
    if (len(matrix[0]) != expected_row_length):
      actual_row_length = len(matrix[0])
      print(f'MATRIX MALFORMED - EXPECTED {expected_row_length} ITEMS PER ROW (FOUND {actual_row_length} ON ROW {row})')
      return
    i = 0
    while(i < len(matrix[0])):
      target = matrix[0][i]
      max_length = min(len(matrix), len(matrix[0]) - i)
      z = 0
      while(z < max_length):
        if (matrix[z][i + z] != target):
          print('Not a Toeplitz Matrix')
          print(f'Expected [{matrix[z][i + z]}] at ({i + z + 1}, {z + 1 + row}) to be [{target}]')
          return False
        z+=1
      i+=1
    matrix = matrix[1:]
  if (len(matrix) == 0):
    print('Yay, a Toeplitz Matrix')

is_input_toeplitz(input)
