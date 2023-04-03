const memoryNode = document.querySelector('#memory');
const resultNode = document.querySelector('#result');
const numericButtons = document.querySelectorAll('.button-number');
const operations = document.querySelectorAll('.button-operation');
const deleteBtn = document.querySelector('#button-del');
const resetBtn = document.querySelector('#button-reset');
const equalsBtn = document.querySelector('#button-equal');

const incompleteExpression = /\s[\+\-\x\/]\s$/g;
const arithmeticExpressionRegex = /\d+(?:\.\d+)?|[\+\-\x\/]/g;
const operationRegex = /[\+\-\x\/]/;
const incompleteEquationRegex = /[\+\-\x\/] ?$/;
const additionRegex = /^-?(\d+(?:\.\d+)?) ?\+ ?(\d+(?:\.\d+)?)/;
const subtractionRegex = /^-?(\d+(?:\.\d+)?) ?\- ?(\d+(?:\.\d+)?)/;
const multiplicationRegex = /(\d+(?:\.\d+)?) ?\x ?(\d+(?:\.\d+)?)/;
const divisionRegex = /(\d+(?:\.\d+)?) ?\/ ?(\d+(?:\.\d+)?)/; //÷


class Calculator {
    constructor(memoryNode, resultNode) {
        this.memoryNode = memoryNode;
        this.resultNode = resultNode;
        this.incompleteExpression = /\s[\+\-\*\/]\s$/;
        this.reset();
    }

    reset() {
        // Memory can exist in 3 states:
        // 1) Empty string
        // 2) Ends with number
        // 3) Ends with operation
        this.memory = '';
        this.memoryNode.textContent = '';
        this.resultNode.textContent = '0';
    }

    adjunctNumber(number) {
        if (number === '.' && this.memory.split(' ').at(-1).includes('.')) return;
        if (number === '.' && this.incompleteExpression.test(this.memory)) return;
        this.memory += number;
        this.update();
    }

    adjunctOperator(operator) {
        if (this.memory.at(-1) === '.') {this.memory = this.memory.slice(0, -1)};
        if (this.incompleteExpression.test(this.memory)) {this.memory = this.memory.slice(0, -3)};
        this.memory += ` ${operator} `;
        this.update();
    }

    delete() {
        if (this.memory === '') return;
        if (this.incompleteExpression.test(this.memory)) {this.memory = this.memory.slice(0, -3)}
        else {this.memory = this.memory.slice(0, -1)};
        this.update();
    }

    update() {
        this.memoryNode.textContent = this.memory;
        this.resultNode.textContent = this.calculate();
    }

    calculate(expression = this.memory) {
        if (expression.at(-1) === '.') {expression = expression.slice(0, -1)};
        if (!isNaN(Number(expression))) return Number(expression);
        if (this.incompleteExpression.test(expression)) return eval(expression.slice(0, -3));
        return eval(expression)
    }
}

const calculator = new Calculator(memoryNode, resultNode);

deleteBtn.addEventListener('click', () => calculator.delete());
resetBtn.addEventListener('click', () => calculator.reset());
equalsBtn.addEventListener('click', () => calculator.calculate(memoryNode.textContent));

numericButtons.forEach(button => {
  button.addEventListener('click', () => calculator.adjunctNumber(button.value));
});

operations.forEach(button => {
  button.addEventListener('click', () => calculator.adjunctOperator(button.value));
});
