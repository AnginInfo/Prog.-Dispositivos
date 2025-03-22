const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { resultado: null, cpfGerado: null });
});

function gerarCPF() {
    let cpf = '';
    
    for (let i = 0; i < 9; i++) {
        cpf += Math.floor(Math.random() * 10);
    }
    
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let primeiroDigito = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
    cpf += primeiroDigito;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let segundoDigito = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
    cpf += segundoDigito;
    
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let primeiroDigito = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let segundoDigito = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
    
    return primeiroDigito === parseInt(cpf.charAt(9)) && 
           segundoDigito === parseInt(cpf.charAt(10));
}

app.post('/gerar', (req, res) => {
    const cpfGerado = gerarCPF();
    res.render('index', { resultado: null, cpfGerado });
});


app.post('/validar', (req, res) => {
    const cpf = req.body.cpf;
    const valido = validarCPF(cpf);
    res.render('index', { 
        resultado: valido ? 'Válido' : 'Inválido', 
        cpfGerado: null 
    });
});


app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});