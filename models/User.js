//modelo de usuario basico para efetuar login no app
//seria alterado de acordo com as necessidades da epistemic, se precisar saber nome, endereço, qualquer tipo de dado mais
const { model, Schema } = require('mongoose')

//modelo do usuario
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        // match com Regex para verificaçao de combinaçao do email do usuario
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    },
    passwordHash: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

module.exports = model('User', userSchema)