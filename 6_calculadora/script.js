var num1 = '0'
var operator = null
var num2 = ''
var pressedEqualKey = false

function show(value) {
  document.getElementById('display').innerHTML = value
}

function allCancel() {
  num1 = '0'
  operator = null
  num2 = ''
  show(num1)
}

function addDigit(key) {
  if (!operator) {
    num1 === '0' ? (num1 = key) : (num1 += key)
    show(num1)
  } else {
    num2 += key
    show(num2)
  }
}

function operation(btn) {
  if (pressedEqualKey) {
    pressedEqualKey = false
    num2 = ''
  }

  if (!operator || num2 === '') {
    operator = btn
  } else {
    var result = calculation()
    num1 = result
    operator = btn
    num2 = ''
    show(num1)
  }
}

function calculation() {
  var result = 0
  num1_float = parseFloat(num1)
  num2_float = parseFloat(num2)

  // THE CALCULATIONS MUST BE MULTIPLIED (AND THEN DIVIDED) BY A MULTIPLE OF TEN
  // TO AVOID THE JS BUG WHERE IT DOESN'T HANDLE DECIMALS ALL THAT WELL
  // eg. ---> 0.8 - 0.1 = 0.7000000000000001
  // (even then, it's not a perfect solution)

  switch (operator) {
    case '+':
      result = (num1_float * 1000000 + num2_float * 1000000) / 1000000
      break
    case '-':
      result = (num1_float * 1000000 - num2_float * 1000000) / 1000000
      break
    case '*':
      result = (num1_float * 1000000 * (num2_float * 1000000)) / 1000000000000
      break
    case '/':
      result = (num1_float * 1000000) / (num2_float * 1000000)
      break
  }
  return result
}

function equalTo() {
  pressedEqualKey = true
  var result = calculation()
  num1 = result
  show(num1)
}

function decimalSeparator() {
  if (operator && num2 === '') {
    num2 = '0.'
    show(num2)
  } else if (operator && num2 != '') {
    if (pressedEqualKey) {
      num1 = '0.'
      operator = null
      num2 = ''
      pressedEqualKey === false
    } else {
      num2 += '.'
      show(num2)
    }
  } else {
    num1 += '.'
    show(num1)
  }
}
