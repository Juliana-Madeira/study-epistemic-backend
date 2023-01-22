//Backend com rotas feitas em Node e Express
//Banco de dados no MongoDB
const express = require('express')
const cors = require('cors')
const connectDb = require('./config/db.config')
require('dotenv').config()
const User = require('./models/User')
const router = require('./routes/auth.routes.js')

connectDb()

const app = express()

app.use(express.json())
app.use(router)
app.use(cors())

app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({msg: `No users`})
    }
})



//middleware auth
app.use(require('./middlewares/auth.middleware'))

//rota usuario logado
app.use('/delete', require('./routes/user.routes.js'))

//servidor
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
})