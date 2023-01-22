//autenticaçao de usuario com jwt
//para determinadas funcionalidades, o usuario deve estar logado na propria conta
//ou seja, para sabermos qual o paciente, ele deve estar logado para anotar suas proprias crises
const jwt = require('jsonwebtoken')

const authorization = (req, res, next) => {
    //fazendo autorizaçao do usuario com bearer
    const bearer = req.get(`Authorization`)
    try {
        if(!bearer){
            return res.status(401).json({msg: `O usuário precisa estar logado`})
        }
        //decodificando o token que retorna com o login do usuario 
        const token = bearer.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {...decodedToken}
        next()
    } catch (error) {
        res.status(401).json({msg: `Usuário não autorizado`, error: error.message})
    }
}
module.exports = authorization