"use strict"

class Sudoku {
  constructor(board_string,num) {
    this.string = board_string
    this.papan = this.board(num)
  }

  solveX() {
    let papan = this.papan   
    const array = []
    for (let i=0; i<papan.length; i++) {
      for (let j=0; j<papan.length; j++) {
        if (papan[i][j]=== 0) {
          array.push([i,j])
        }
      }
    }            
    for (let i=0; i<array.length; i++) {
      for (let num=1; num <= papan.length; num++) {
        let indexI = array[i][0]
        let indexJ = array[i][1]      
        if (isBoxClear(num,indexI,indexJ,papan) && isClear(num,indexI,indexJ,papan)) {
          papan[indexI][indexJ] = num
          break
        } else if (num === papan.length) {
          papan[indexI][indexJ] = 'X'
        }     
        
      }
    }
    
  }

  // Returns a string representing the current state of the board
  board(num) {
    let output = []
    let temp = []    
    for (let i=0; i<this.string.length; i++) {
      temp.push(Number(this.string[i]))
      if ((i+1) % num === 0 && i>0) {        
        output.push(temp)
        temp = []
      }
    }
    return output
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string,9)

// Remember: this will just fill out what it can and not "guess"
console.table(game.board(9))
game.solveX()
console.table(game.papan)

function isClear(number,indexI,indexJ,papan) {  
  for (let index=0; index<9; index++) {  
    if (papan[indexI][index] === number) {          
      return false
    }  
    if (papan[index][indexJ]===number) {
      return true      
    }
  }
  return true
}

function isBoxClear(num,indexI,indexJ,papan) {
  let sqrt = Math.sqrt(papan.length); 
  indexI = indexI - indexI % sqrt; 
  indexJ = indexJ - indexJ % sqrt;   
    for (let i = indexI; i < indexI + sqrt; i++)  { 
        for (let j = indexJ; j < indexJ + sqrt; j++)  { 
            if (papan[i][j] === num)  
            { 
                return false; 
            } 
        } 
    }         
    return true; 
}

let papan = game.board(9)
console.table(papan)

function isKosong (papan) {  
  for (let i=0; i<papan.length; i++) {
    for (let j=0; j<papan.length; j++) {
      if (papan[i][j] === 0) {        
        return [i,j]
      }
    } 
  }
  return true
}

function beresinSodoku(papan) {  
  if (isKosong (papan) === true) {
    return true;
  } else {
    let indexI = isKosong (papan)[0]
    let indexJ = isKosong (papan)[1]
    for (let num=1; num<=papan.length; num++) {
      if (isBoxClear(num,indexI,indexJ,papan) && isClear(num,indexI,indexJ,papan) ) {
        papan[indexI][indexJ] = num;
        if (beresinSodoku(papan)) {
          return true
        } else {
          papan[indexI][indexJ] = 0;
        }
      } 
    } 
  }
  return false
}
//rekursif backtracking
beresinSodoku(papan)
console.table(papan)

let papan1 = game.board(9)
console.table(papan1)

function solveNoX(papan1) {
    let papan = papan1       
    const array = []
    for (let i=0; i<papan.length; i++) {
      for (let j=0; j<papan.length; j++) {
        if (papan[i][j]=== 0) {
          array.push([i,j])
        }
      }
    }   
    for (let i=0; i<array.length; i++) {
        let indexI = array[i][0]
        let indexJ = array[i][1] 
        let num = papan[indexI][indexJ]
        while(!(isBoxClear(num,indexI,indexJ,papan) && isClear(num,indexI,indexJ,papan))) {
            num++
            if(num === papan.length+1) {
                papan[indexI][indexJ] = 0
                i-=2
                break;
            }
        }
        if(num<=papan.length) {
            papan[indexI][indexJ] = num
        } 
    }
}  

solveNoX(papan1)
console.table(papan1)