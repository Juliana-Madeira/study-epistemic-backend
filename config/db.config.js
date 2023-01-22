//Usei o banco de dados do mongoDB, entao utilizei o mongoose para conectar a aplicação ao banco de dados
//variaveis de ambiente nao sobem para internet, entao uso o dotenv

require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connect to mongo: ${connection.connections[0].name}`);
    } catch (error) {
        console.log('Error connecting to DB');
    }
}

module.exports = connectDB