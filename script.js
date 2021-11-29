document.addEventListener('mousemove',
    function (e){
        const body = document.querySelector('body');
        const snow = document.createElement('span');
        let x = e.offsetX;
        let y = e.offsetY;
        snow.style.left = x + 'px';
        snow.style.top = y + 'px';
        let size = Math.random()*60;
        snow.style.width = 20 + size + 'px';
        snow.style.height = 20 + size + 'px';
        body.appendChild(snow);
        setTimeout(function () {
            snow.remove();
        }, 1800);
    })

const buttons = document.querySelectorAll('input[value]');
const display = document.getElementById('input');
const inputBuffer = [];
Array.prototype.last = function() {
    return this[this.length - 1];
}
const isMathPoint = symbol => ['.'].includes(symbol);
const isMathSign = symbol => ['-', '+', '÷', '×', '%'].includes(symbol);
const displayExpresion = (buffer) => {
    display.value = buffer.map(item => Array.isArray(item) ? item.join('') : item).join(' ');
}


const updateInput = (symbol) => {
    const lastBufferItem = inputBuffer.last();
    const isArrayLastItem = Array.isArray(lastBufferItem);

    if (symbol === 'del') {
        inputBuffer.pop();
    } else if (symbol === 'C') {
        inputBuffer.splice(0, inputBuffer.length);
    } else if (isMathSign(symbol)) {
        if (inputBuffer.length) {
            if (isMathSign(inputBuffer.last())) {
                inputBuffer[inputBuffer.length - 1] = symbol;
            } else {
                inputBuffer.push(symbol);
            }
        } else if (symbol === '-') {
            inputBuffer.push(symbol);
        }
    } else if (isMathPoint(symbol)) {
        if (isArrayLastItem) {
            if (!lastBufferItem.includes(symbol)) {
                lastBufferItem.push(symbol);
            }
        } else {
            inputBuffer.push([0, '.']);
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
