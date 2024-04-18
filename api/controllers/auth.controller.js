const User = require('../models/user.model')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_ROUNDS))
    console.log(salt)
    req.body.password = bcrypt.hashSync(req.body.password, salt)

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      role: req.body.role
    })

    const userJSON = user.toJSON()
    delete userJSON.password

    const payload = { email: req.body.email }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.status(200).json({ token, user: userJSON})  // === { token: token }
  } catch (error) {
    console.log('Error signing up user', error)
    return res.status(500).json(error)
  }
}

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (!user) {
      return res.status(404).send('Email or password wrong')
    }

    const checkPass = bcrypt.compareSync(req.body.password, user.password)

    if (checkPass) {
      const payload = { email: req.body.email }
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

      const userJSON = user.toJSON()
      delete userJSON.password

      return res.status(200).json({ token, user: userJSON })  // === { token: token }
    } else {
      return res.status(404).send('Email or password wrong')
    }

  } catch (error) {
    console.log('Error login in', error)
    return res.status(500).json(error)
  }
}



module.exports = {
  signup,
  login
}