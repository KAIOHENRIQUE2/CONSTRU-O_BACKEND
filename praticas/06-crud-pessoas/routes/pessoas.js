const express = require('express')
const router = express.Router()

let listapessoas = [
    {
        id: 1,
        nome: "joão",
        email: "joao@.com",
        datanascimento: "01/02/2000"

    }
]












router.get('/pessoas', (req, res, next) => {
    res.json(listapessoas)
})



router.get('/pessoas/:id', (req, res, next) => {
    const id = req.params.id
    const pessoa = listapessoas.find(pessoa => pessoa.id == id)
    if (!pessoa) {
        return res.status(404).json({ error: "pessoa não encontrada!!" })
    }
    res.json(pessoa)
})






router.post('/pessoas', (req, res, next) => {
    const { nome, cpf, email, datanascimento } = req.body
    if (!nome || !cpf || !email || datanascimento) {
        return res.status(400).json({ error: "nome, cpf, email, e datanascimento são obrigatorios" })
    }


    if (listapessoas.some(pessoa => pessoa.cpf == cpf)) {
        return res.status(409).json({ error: "cpf já cadastrado!!!" })
    }

    const novapessoa = {
        id: Date.now(),
        nome,
        cpf,
        email,
        datanascimento
    }

    listapessoas.push(novapessoa)
    res.status(201).json({ message: "pessoa cadastrada com sucesso", novapessoa })
})



router.put('/pessoas/:id', (req, res, next) => {
    const id = req.params.id

    const pessoa = listapessoas.find(pessoa => pessoa.id == id)
    if(!pessoa){
        return res.status(404).json({ error: "pessoa não encontrada!!!"})
    }
    const {nome, email, datanascimento } = req.body
    if(!nome || !email || !datanascimento ){
        return res.status(400).json({error: "nome, email datanascimento são obrigados"})
    }


pessoa.nome = nome 
pessoa.email = email
pessoa.datanascimento = datanascimento

res.json({message: "pessoa atualizada com sucesso!!!", pessoa })
})



router.delete('/pessoas/:id', (req, res, next) => {
    const id = req.params.id
   const pessoa = listapessoas.find(pessoa => pessoa.id == id)
   if (!pessoa){
    return res.status(404).json({error: "pessoa não encontrada!!!"})
   }
   listapessoas = listapessoas.filter(pessoa => pessoa.id != id)
   res.json({message: "pessoa excluida com sucesso!!!"})
}
)


module.exports = router