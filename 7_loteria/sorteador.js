var sorteados = []
var outputSorteio = document.querySelector('#output-sorteio')

document.querySelector('#submit').addEventListener('click', loteria)
document.querySelector('#limpar').addEventListener('click', limpar)
document.querySelector('#defaults').addEventListener('click', defaults)

function limpar() {
  sorteados = []
  outputSorteio.innerHTML = null
}

function defaults() {
  document.querySelector('#numSortear').value = 6
  document.querySelector('#numMin').value = 1
  document.querySelector('#numMax').value = 60
  ordenar = true
  ordem = 'crescente'
  document.querySelector('#crescente').checked = true
  permitirRepetidos = false
  document.querySelector('#permitirRepetidos').checked = false
}

function loteria(event) {
  event.preventDefault()
  limpar()

  var numSortear = document.querySelector('#numSortear').value
  var numMin = document.querySelector('#numMin').value
  var numMax = document.querySelector('#numMax').value

  var permitirRepetidos = false
  if (document.querySelector('#permitirRepetidos').checked === true) {
    permitirRepetidos = true
  }

  var ordenar = true
  if (document.querySelector('#semOrdem').checked === true) {
    ordenar = false
    var ordem = ''
  } else if (document.querySelector('#crescente').checked === true) {
    ordenar = true
    var ordem = 'crescente'
  } else if (document.querySelector('#decrescente').checked === true) {
    ordenar = true
    var ordem = 'decrescente'
  }

  function sortear() {
    numMin = Math.ceil(numMin)
    numMax = Math.floor(numMax)
    return Math.floor(Math.random() * (numMax - numMin + 1)) + numMin
  }

  var i = 0
  while (i < numSortear) {
    var num = sortear()

    if (!permitirRepetidos) {
      while (sorteados.indexOf(num) !== -1) {num = sortear()}
    }
    sorteados[i] = num
    i++
  }

  if (ordenar === true && ordem === 'crescente') {
    sorteados = sorteados.sort((a, b) => a - b).join('</div><div>')
  } else if (ordenar === true && ordem === 'decrescente') {
    sorteados = sorteados.sort((a, b) => b - a).join('</div><div>')
  } else {
    sorteados = sorteados.join('</div><div>')
  }

  outputSorteio.innerHTML += '<h3>sorteados:</h3><div id="block"><div>' + sorteados + '</div></div>'
}
