//rota feita para teste do usuario que quer deletar seu perfil no app
const { Router } = require('express')
const User = require('../models/User')

const router = Router()

//deletar proprio usuario
router.delete('/:userId', async (req, res) => {
    const { userId } = req.user
    try {
        await User.findByIdAndRemove(userId)
        res.status(200).json('User deleted!')
    } catch (error) {
        res.status(500).json({message: `Unable to delete your profile`, error});  
    }
})

module.exports = router
