const buttons = document.querySelectorAll('input[value]');
const display = document.getElementById('input');
const inputBuffer = [];
Array.prototype.last = function() {
    return this[this.length - 1];
}
const isMathSign = symbol => ['-', '+', '÷', '×', '%'].includes(symbol);
const displayExpresion = (buffer) => {
    display.value = buffer.map(item => Array.isArray(item) ? item.join('') : item).join(' ');
}
const isMathPoint = symbol => ['.'].includes(symbol);

const updateInput = (symbol) => {
    const lastBufferItem = inputBuffer.last();
    const isArrayLastItem = Array.isArray(lastBufferItem);

    if (symbol === 'del') {
        inputBuffer.pop();
    } else if (symbol === 'C') {
        inputBuffer.splice(0, inputBuffer.length);
    } else if (isMathSign(symbol) && inputBuffer.length) {
        if (isMathSign(inputBuffer.last())) {
            inputBuffer[inputBuffer.length - 1] = symbol;
        } else {
            inputBuffer.push(symbol);
        }
    } else if (isMathSign(symbol) && inputBuffer.length) {
        if (isMathSign(inputBuffer.last())) {
            inputBuffer[inputBuffer.length - 1] = symbol;
        } else {
            inputBuffer.push(symbol);
        }
    } else {
        if (isArrayLastItem || isMathPoint(symbol)) {
            lastBufferItem.push(symbol);
        } else {
            inputBuffer.push([symbol]);
        }
    }

    console.log(symbol, inputBuffer);
    displayExpresion(inputBuffer);
}

buttons.forEach(button => {
    button.addEventListener('click',(e) => {
        updateInput(e.target.value);
    });
});


// input: 2 -> output: [[2]]
// input: 3 -> output: [[2, 3]]
// input: '+' -> output: [[2, 3], '+']
// input: 0 -> output: [[2, 3], '+', [0]]
// input: '.' -> output: [[2, 3], '+', [0, '.']]
// input: 5 -> output: [[2, 3], '+', [0, '.', 5]]

//если в инпуте нет чисел и мы нажимаем точку то создается массив  [0,...]
// в одном массиве с числами может быть только одна точка может быть
// точка не может быть последним елементов в массиве чисел если так то она не учитывается