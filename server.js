import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())


app.post('/usuarios', async (req, res) => { // criando uma rota para adicionar um novo usuário

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)

})

app.get('/usuarios', async (req, res) => {// criando uma rota

    let users = []

    if(req.query){
        users = await prisma.user.findMany({
            where: {
                 name: req.query.name,
                 email: req.query.email,
                 age: req.query.age
            }
        })
    }else{
        users = await prisma.user.findMany()
    }
      
    users = await prisma.user.findMany()
    res.status(200).json(users)
    

})

app.put('/usuarios/:id', async (req, res) => { // criando uma rota para adicionar um novo usuário

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
      
    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => { // criando uma rota para deletar usuarios
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: "Usuario deletado com sucesso!"})
 
})

app.listen(3000) //A porta que estou usando

// senha: 5CtMOtTrhSaopuPW