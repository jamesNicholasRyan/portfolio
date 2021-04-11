const yellowOne = [255, 230, 109]
const yellowTwo = [255, 215, 24]
const cyan = [0, 232, 198]
const hotPink = [255, 0, 170]
const grey = [213, 206, 217]
const pink = [218, 112, 182]
const orange = [243, 156, 18]
const lightBlue = [109, 206, 250]

// const forceLineOne = [ {'a': yellowOne}, {'p': yellowOne}, {'p': yellowOne}, {'l': yellowOne}, {'y': yellowOne}, {'F': yellowOne}, {'o': yellowOne}, {'r': yellowOne}, {'c': yellowOne}, {'e': yellowOne}, 
//   {'(': yellowTwo}, 
//   {'f': cyan}, {'o': cyan}, {'r': cyan}, {'c': cyan}, {'e': cyan},
//   {')': yellowTwo},
//   {' ': yellowOne}, {'{': yellowTwo}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne},     
// ]

const forceLineOne = [ {'apply': yellowOne}, {'Force': yellowOne}, 
  {'(': yellowTwo}, {'force': cyan}, {')': yellowTwo},
  {' ': yellowOne}, {'{': yellowTwo}, 
]

const forceLineTwo = [
  {' ': yellowOne}, {' ': yellowOne}, {'this': hotPink}, {'.': grey}, {'acceleration': cyan}, 
  {'.': grey}, {'add': yellowOne}, {'(': pink}, {'force': cyan}, {')': pink},
]

const forceLineThree = [
  {'}': yellowTwo}
]

const moveLineOne = [
  {'move': yellowOne}, {'()': yellowTwo}, {' ': yellowTwo}, {'{': yellowTwo}
]

const moveLineTwo = [
  {' ': yellowOne}, {' ': yellowOne}, {'this': hotPink}, {'.': grey}, {'velocity': cyan}, {'.': grey}, {'add': yellowOne}, {'(': pink}, {'this': hotPink}, 
  {'.': grey}, {'acceleration': cyan}, {')': pink}
]

const moveLineThree = [
  {' ': yellowOne}, {' ': yellowOne}, {'this': hotPink}, {'.': grey}, {'location': cyan}, {'.': grey}, {'add': yellowOne}, {'(': pink}, {'this': hotPink}, 
  {'.': grey}, {'velocity': cyan}, {')': pink}
]

const moveLineFour = [
  {'}': yellowTwo}
]

const arrayLineOne = [
  {'letters' : orange}, {'.': grey}, {'forEach': yellowOne}, {'(': yellowTwo}, {'(': pink}, {'character': cyan}, {')': pink}, {' ': grey},
  {'=': hotPink}, {'>': hotPink}, {' ': grey}, {'{': pink}
]

const arrayLineTwo = [
  {' ': grey}, {' ': grey}, {'character': orange}, {'.': grey}, {'applyForce': yellowOne}, {'(': lightBlue}, {'mouse': cyan},
  {')': lightBlue}
]

const arrayLineThree = [
  {' ': grey}, {' ': grey}, {'character': orange}, {'.': grey},
  {'move': yellowOne}, {'()': lightBlue}
]

const arrayLineFour = [
  {'}': pink}, {')': yellowTwo}
]


export {
  forceLineOne,
  forceLineTwo,
  forceLineThree,
  moveLineOne,
  moveLineTwo,
  moveLineThree,
  moveLineFour,
  arrayLineOne,
  arrayLineTwo,
  arrayLineThree,
  arrayLineFour
}