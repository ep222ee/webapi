const passportJwt = require('passport-jwt')
const JwtStrategy = passportJwt.Strategy
const ExtractJWT = passportJwt.ExtractJwt

require('dotenv').config()

const JWTOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
  ignoreExpiration: false
}

module.exports = new JwtStrategy(JWTOptions, (jwtPayload, done) => {
  if (jwtPayload.username === 'admin') {
    // hardcoded user
    // find user in db if not hardcoded.
    return done(null, jwtPayload.username)
  } else {
    return done(null, false)
  }
})
