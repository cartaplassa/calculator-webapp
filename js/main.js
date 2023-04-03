const resultNode = document.querySelector('#result');
const numericButtons = document.querySelectorAll('.button-number');
const operations = document.querySelectorAll('.button-operation');
const deleteBtn = document.querySelector('#button-del');
const resetBtn = document.querySelector('#button-reset');
const equalsBtn = document.querySelector('#button-equal');


class Calculator {
    constructor(resultNode) {
        this.resultNode = resultNode;
        this.incompleteExpression = /\s[\+\-\*\/]\s$/;
        this.correctExpression = /^(\d(\.\d+)?)+\s[\+\-\*\/]\s(\d(\.\d+)?)+$/;
        this.zeroRegex = /(^$)|(^0$)|(\s0$)/;
        this.reset();
    }

    reset() {
        this.memory = '0';
        this.resultNode.textContent = '0';
    }

    adjunctNumber(number) {
        if (number === '.' && this.memory.split(' ').at(-1).includes('.')) return;
        if (number === '.' && this.incompleteExpression.test(this.memory)) this.memory += '0';
        if (!(number === '.') && this.zeroRegex.test(this.memory)) this.memory = this.memory.slice(0, -1);
        this.memory += number;
        this.update();
    }

    adjunctOperator(operator) {
        if (this.memory.at(-1) === '.') this.memory = this.memory.slice(0, -1);
        if (this.incompleteExpression.test(this.memory)) this.memory = this.memory.slice(0, -3);
        if (this.correctExpression.test(this.memory)) this.update(true);
        this.memory += ` ${operator} `;
        this.update();
    }

    delete() {
        if (this.memory === '') return;
        if (this.incompleteExpression.test(this.memory)) this.memory = this.memory.slice(0, -3);
        else this.memory = this.memory.slice(0, -1);
        this.update();
    }

    update(rewrite = false) {
        if (this.memory === '') {this.memory = '0'};
        if (rewrite) {
            this.memory = this.calculate();
        }
        this.resultNode.textContent = this.memory;
    }

    calculate(expression = this.memory) {
        if (expression.at(-1) === '.') expression = expression.slice(0, -1);
        if (!isNaN(Number(expression))) return Number(expression);
        if (this.incompleteExpression.test(expression)) return Number(expression.slice(0, -3));
        if (this.correctExpression.test(expression)) {
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

deleteBtn.addEventListener('click', () => calculator.delete());
resetBtn.addEventListener('click', () => calculator.reset());
equalsBtn.addEventListener('click', () => calculator.update(true));

numericButtons.forEach(button => {
  button.addEventListener('click', () => calculator.adjunctNumber(button.value));
});

operations.forEach(button => {
  button.addEventListener('click', () => calculator.adjunctOperator(button.value));
});
