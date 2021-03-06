# Remove Islands - Matrix Algorithm O(n*m)

Algorithm made for an intermediate Google interview challenge.

The challenge is to make an algorithm that takes a 2D array with a bunch of 1s and 0s as input, and has to take each 1 that's not connected, horizontally or vertically, to a border and convert it to a 0, then output that new matrix without those 1s.

Sample Input:
```javascript
[
  [1, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 1, 1, 0],
  [0, 1, 1, 1, 0, 0, 0],
  [1, 0, 0, 0, 1, 1, 0],
  [0, 1, 1, 0, 1, 0, 0],
  [0, 1, 1, 0, 0, 1, 0],
  [1, 0, 0, 0, 0, 1, 1],
]
```

Sample Output:
```javascript
[ 
  [ 1, 1, 0, 1, 0, 1, 0 ],
  [ 0, 1, 0, 0, 1, 1, 0 ],
  [ 0, 1, 1, 1, 0, 0, 0 ],
  [ 1, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 1, 0 ],
  [ 1, 0, 0, 0, 0, 1, 1 ] 
]
```

Example of all removed 1s:
```javascript
[
  [ ,  ,  ,  ,  ,  ,  ],
  [ ,  ,  ,  ,  ,  ,  ],
  [ ,  ,  ,  ,  ,  ,  ],
  [ ,  ,  ,  , 1, 1,  ],
  [ , 1, 1,  , 1,  ,  ],
  [ , 1, 1,  ,  ,  ,  ],
  [ ,  ,  ,  ,  ,  ,  ],
]
```

Auxiliary diagram to explain the logic behind the algorithm:
![diagram](https://github.com/DarwinDemian/Remove-Islands-Matrix-Algo/blob/84fd3ea827a52fa55d8118e6d173e55f9ea2b17f/Matrix-Diagram.jpg)


You can run the code with `node Matrix.js` and you'll see the original matrix and the new matrix. You can check for different test cases by commenting/uncommenting the matrix variables at the end of the code.

See the code running online here:
https://jsfiddle.net/Demian6662/50gwzna9/3/
