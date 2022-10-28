const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const { User } = require('../model/user')

const checkValidtoAddUser = [
    check('email').isEmail().bail().custom( async (value) => {
        const email = await User.find({email : value})
        if (email.length !== 0) throw new Error('Email is Already to Used')
        return true 
    }),
    check('password').isLength({ min : 8}),
    check('password_confirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true
    }),
    (req, res, next) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) return next()
        return res.status(400).send(errors)
    }
]

const verifyToken = (req, res, next) => {
    const token = req.cookies['x-access-token']
    
    if (!token) return res.status(401).send({
        status : 'error',
        msg : 'Invalid Token'
    })
    jwt.verify(token, process.env.SECRET_CODE, function(err, decoded) {
        if (err) return res.status(500).send({
            status : 'error',
            msg : 'Invalid Token'
        })
        next()
    })
}

module.exports = {
    checkValidtoAddUser,
    verifyToken
}