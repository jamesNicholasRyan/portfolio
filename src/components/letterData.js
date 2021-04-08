const yellowOne = [255, 230, 109]
const yellowTwo = [255, 215, 24]
const cyan = [0, 232, 198]
const hotPink = [255, 0, 170]
const grey = [213, 206, 217]
const pink = [218, 112, 182]

const forceLineOne = [ {'a': yellowOne}, {'p': yellowOne}, {'p': yellowOne}, {'l': yellowOne}, {'y': yellowOne}, {'F': yellowOne}, {'o': yellowOne}, {'r': yellowOne}, {'c': yellowOne}, {'e': yellowOne}, 
  {'(': yellowTwo}, 
  {'f': cyan}, {'o': cyan}, {'r': cyan}, {'c': cyan}, {'e': cyan},
  {')': yellowTwo},
  {' ': yellowOne}, {'{': yellowTwo}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne}, {' ': yellowOne},     
]

const forceLineTwo = [
  {' ': yellowOne}, {' ': yellowOne}, {'t': hotPink}, {'h': hotPink}, {'i': hotPink}, {'s': hotPink}, {'.': grey}, {'a': cyan}, {'c': cyan}, {'c': cyan}, {'e': cyan}, {'l': cyan}, {'e': cyan}, {'r': cyan}, {'a': cyan},
  {'t': cyan}, {'i': cyan}, {'o': cyan}, {'n': cyan}, {'.': grey}, {'a': yellowOne}, {'d': yellowOne}, {'d': yellowOne}, {'(': pink}, {'f': cyan}, {'o': cyan}, {'r': cyan}, {'c': cyan}, {'e': cyan}, {')': pink},
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


export {
  forceLineOne,
  forceLineTwo,
  forceLineThree,
  moveLineOne,
  moveLineTwo,
  moveLineThree,
  moveLineFour
}