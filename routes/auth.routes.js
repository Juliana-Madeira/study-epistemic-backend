//Usei express para fazer as rotas de signup e login
//Estao funcionando no insomnia
//bcryptjs faz a criptografia de senhas, usado tanto na web como em mobile
const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = Router()

//Signup do usuario
//rotas e funcionalidade para o cadastro de um novo usuario
router.post('/signup', async (req, res) => {
    const { email, password } = req.body
    try {
        if(!email || !password){
            res.status(422).json({msg:`Preencha todos os campos`});
        }

        const user = await User.findOne({email})
        if(user){
            res.status(401).json({msg: `O usuário já existe`})
        }

        //criptografia de senha
        const salt = bcrypt.genSaltSync(12)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = await User.create({
            email,
            passwordHash: hash
        })

        res.status(201).json('Usuário criado com sucesso')

    } catch (error) {
        res.status(500).json({message: `Por favor, tente novamente!`, error})
    }
})


//login do usuario
//rotas e funcionalidade para o login de um usuario cadastrado
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const userFromDB = await User.findOne({email})
        if(!userFromDB){
            res.status(401).json({msg: `Usuário não encontrado`})
        }

        //comparaçao de senha
        //para que nao haja nenhum ataque hacker com muita facilidade, 
        //ao verificar a senha, colocamos no erro que ou o email ou a senha estao invalidos, assim
        //confundimos um hacker amador
        const verifiedHash = bcrypt.compareSync(password, userFromDB.passwordHash)
        if(!verifiedHash){
            res.status(401).json({msg: `Email ou Senha inválidos`})
            
        }

        const payload = {
            id: userFromDB._id,
            email: userFromDB.email
        }

        //pegamos o payload que é email e id do usuario e temos esse token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'})
        
        res.status(200).json({user: payload, token})
        
    } catch (error) {
        res.status(500).json({message: `Sorry, Please try logging again!`, error})
    }
})


module.exports = router