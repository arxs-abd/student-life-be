const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { checkValidtoAddUser, verifyToken } = require('../middleware/user')
const { User } = require('../model/user')

const router = express.Router()

router.get('/api/post', verifyToken, async (req, res) => {
    return res.send('Login')
})

router.post('/api/logout', verifyToken, async (req, res) => {
    res.clearCookie('x-access-token')
    return res.status(200).send({
        status : 'success',
        msg : 'Logout Successfull'
    })
})

router.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email : req.body.email
    })
    if (!user) return res.status(400).send({
        status : 'error',
        msg : 'Email not Found'
    })

    if (! await bcrypt.compare(req.body.password, user.password)) return res.status(401).send({
        status : 'error',
        msg : 'Password is Wrong'
    })

    let token = jwt.sign({
        user
    }, process.env.SECRET_CODE)

    res.cookie('x-access-token', token)

    return res.send({
        status : 'success',
        msg : 'Login Successfully',
        data : {
            id : user.id,
            email : user.email,
            jwt : token
        }
    })
})
  
router.post('/api/register', checkValidtoAddUser, async (req, res) => {
    const salt = bcrypt.genSaltSync(10)
    const data = {
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, salt),
    }

    const newUser = new User(data)
    await newUser.save()
    return res.send({
        status : 'success',
        msg : 'Signup Successfully'
    })
})

module.exports = router