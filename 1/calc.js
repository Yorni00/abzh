const display = document.getElementById('display')
const clearButton = document.getElementById('clear')
const equalsButton = document.getElementById('equals')
//получить все элементы с классом .btn
const buttons = document.querySelectorAll('.btn')

// в цикле для каждой кнопки, вешаем прослушку события на клик
// при событии клика, получаем значение кнопки и выводим на дисплей

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.innerHTML
        display.value += value
    })
})

// метод чистки дисплея
clearButton.addEventListener('click', () => {
    display.value = ``
})

//метод вычисления
equalsButton.addEventListener('click', () => {
    try {
        display.value = eval(display.value)
    } catch (error) {
        display.value = `неееееееееет`
    }
})
