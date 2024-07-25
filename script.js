function calculate(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultField = document.getElementById('result');

    if (isNaN(num1) || isNaN(num2)) {
        resultField.innerText = 'Resultado: Erro - Insira números válidos';
        return;
    }

    let result;

    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 === 0) {
                resultField.innerText = 'Resultado: Erro - Divisão por zero';
                return;
            }
            result = num1 / num2;
            break;
        case 'power':
            result = Math.pow(num1, num2);
            break;
        case 'sqrt':
            if (num1 < 0 || num2 < 0) {
                resultField.innerText = 'Resultado: Erro - Raiz de número negativo';
                return;
            }
            result = Math.sqrt(num1) + Math.sqrt(num2);
            break;
        case 'modulus':
            result = num1 % num2;
            break;
        default:
            resultField.innerText = 'Resultado: Erro - Operação inválida';
            return;
    }

    resultField.innerText = 'Resultado: ' + result;
}
