'use strict'
// Requires.
const jwt = require('jsonwebtoken')

// initiate login controller object.
const loginController = {}
/**
 * /login/ Post
 * authenticate to api
 * receives body with username and password.
 * check if credentials are correct.
 * signs JWT Token
 * offers hateoas browsing.
 */
loginController.loginPost = async (req, res, next) => {
  if (req.body.username === 'admin' && req.body.password === 'admin') {
    // Hardcoded user.
    // Should query DB.
    let secret = process.env.SECRET
    let tokenLifeTime = '1h'
    let token = jwt.sign({ username: req.body.username }, secret, { expiresIn: tokenLifeTime })

    res.status(200).json({
      message: `Logged in successfully!, Token received. Use the token in upcoming requests, token will live for ${tokenLifeTime}`,
      token
    }, [
      { rel: 'self', method: 'POST', title: 'Login', href: `${process.env.HOST_URL}/login/` },
      { rel: 'view all', method: 'GET', title: 'view all catches', href: `${process.env.HOST_URL}/catches/` }
    ])
  } else {
    res.status(401).json({
      message: 'Bad credentials, please try again'
    })
  }
  next()
}

module.exports = loginController
