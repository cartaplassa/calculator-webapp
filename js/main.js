const resultNode = document.querySelector('#result');
const numericButtons = document.querySelectorAll('.button-number');
const operationsButtons = document.querySelectorAll('.button-operation');
const deleteButton = document.querySelector('#button-del');
const resetButton = document.querySelector('#button-reset');
const equalsButton = document.querySelector('#button-equal');
const copyButton = document.querySelector('#button-copy');
const dotButton = document.querySelector('#button-dot');


class Calculator {
    constructor(resultNode) {
        this.resultNode = resultNode;
        this.reset();
    }

    reset() {
        this.memory = '0';
        this.resultNode.textContent = '0';
    }

    checkIncompleteExpression(target = this.memory) {
        return /\s[\+\-\*\/]\s$/.test(target);
    }

    checkCorrectExpression(target = this.memory) {
        return /^(\-?\d(\.\d+)?)+\s[\+\-\*\/]\s(\-?\d(\.\d+)?)+$/.test(target);
    }

    checkLastCharDot(target = this.memory) {
        return target.at(-1) === '.';
    }

    checkDotAlreadyPlaced(target = this.memory) {
        return target.split(' ').at(-1).includes('.');
    }

    checkNaN(target = this.memory) {
        return /(^$)|(^0$)|(\s0$)|(^Infinity$)|(^NaN$)/.test(target);
    }

    adjunctNumber(number) {
        if (this.checkNaN()) this.memory = '';
        this.memory += number;
        this.update();
    }

    adjunctDot() {
        if (this.checkDotAlreadyPlaced()) return;
        if (this.checkIncompleteExpression()) this.memory += '0';
        this.memory += '.';
        this.update();
    }

    adjunctOperator(operator) {
        if (operator === '-') {
            if (this.memory === '-') return;
            if (this.checkNaN()) this.memory = operator;
            if (this.checkIncompleteExpression()) this.memory += operator;
            this.update();
            return;
        }
        if (this.checkLastCharDot()) this.memory = this.memory.slice(0, -1);
        if (this.checkIncompleteExpression()) this.memory = this.memory.slice(0, -3);
        if (this.checkCorrectExpression()) this.update(true);
        this.memory += ` ${operator} `;
        this.update();
    }

    delete() {
        console.log(this.checkNaN())
        if (this.checkNaN()) this.memory = '';
        if (this.checkIncompleteExpression()) this.memory = this.memory.slice(0, -3);
        else this.memory = this.memory.slice(0, -1);
        this.update();
    }

    update(rewrite = false) {
        if (this.checkNaN()) {this.memory = '0'};
        if (rewrite) {
            this.memory = this.calculate();
        }
        this.resultNode.textContent = this.memory;
    }

    calculate(expression = this.memory) {
        if (this.checkLastCharDot(expression)) expression = expression.slice(0, -1);
        if (!isNaN(Number(expression))) return Number(expression).toString();
        if (this.checkIncompleteExpression(expression)) return Number(expression.slice(0, -3)).toString();
        if (this.checkCorrectExpression(expression)) {
            const temp = expression.split(' ');
            let result;
            switch (temp[1]) {
                case '+':
                    result = Number(temp[0]) + Number(temp[2]);
                    break;
                case '-':
                    result = Number(temp[0]) - Number(temp[2]);
                    break;
                case '*':
                    result = Number(temp[0]) * Number(temp[2]);
                    break;
                case '/':
                    result = Number(temp[0]) / Number(temp[2]);
            }
            return Number(result.toFixed(6)).toString();
        }
    }
}

const calculator = new Calculator(resultNode);

deleteButton.addEventListener('click', () => calculator.delete());
resetButton.addEventListener('click', () => calculator.reset());
equalsButton.addEventListener('click', () => calculator.update(true));

numericButtons.forEach(button => {
  button.addEventListener('click', () => calculator.adjunctNumber(button.value));
});

operationsButtons.forEach(button => {
  button.addEventListener('click', () => calculator.adjunctOperator(button.value));
});

dotButton.addEventListener('click', () => calculator.adjunctDot());

copyButton.addEventListener('click', async () => await navigator.clipboard.writeText(resultNode.textContent))
