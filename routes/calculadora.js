
const express = require('express');
const router = express.Router();


function validarNumeros(req, res, ...args) {
    const numeros = args.map(arg => Number(req.query[arg]));
    if (numeros.some(isNaN)) {
        return res.status(400).json({ erro: "Parâmetros inválidos." });
    }
    return numeros;
}

router.get('/somar', (req, res) => {
    const [a, b] = validarNumeros(req, res, 'numA', 'numB');
    res.json({ resultado: a + b });
});

router.get('/subtrair', (req, res) => {
    const [a, b] = validarNumeros(req, res, 'numA', 'numB');
    res.json({ resultado: a - b });
});

router.get('/multiplicar', (req, res) => {
    const [a, b] = validarNumeros(req, res, 'numA', 'numB');
    res.json({ resultado: a * b });
});

router.get('/dividir', (req, res) => {
    const [a, b] = validarNumeros(req, res, 'numA', 'numB');
    if (b === 0) return res.status(400).json({ erro: "Divisão por zero." });
    res.json({ resultado: a / b });
});

router.get('/aoQuadrado', (req, res) => {
    const [a] = validarNumeros(req, res, 'numA');
    res.json({ resultado: a ** 2 });
});

router.get('/raizQuadrada', (req, res) => {
    const [a] = validarNumeros(req, res, 'numA');
    if (a < 0) return res.status(400).json({ erro: "Raiz de número negativo." });
    res.json({ resultado: Math.sqrt(a) });
});

module.exports = router;
