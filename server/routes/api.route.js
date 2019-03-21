const express = require('express')
const router = express.Router()

const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://sprint-ng.auth0.com/.well-known/jwks.json`
  }),

  audience: 'https://sprint-ng.auth0.com/api/v2/',
  issuer: `https://sprint-ng.auth0.com/`,
  algorithms: ['RS256']
})

const checkToken = (req, res, next) => {
  const token = req.get('Token')
  if (token && token === process.env.TOKEN) {
    next()
    return
  }
  next(new Error('Invalid token'))
}

const pastSprints = require('./api/past-sprints.route')
const sprintTemplates = require('./api/sprint-templates.route')
const users = require('./api/users.route')
const tokens = require('./api/tokens.route')

router.use('/past-sprints', checkJwt, pastSprints)
router.use('/sprint-templates', checkJwt, sprintTemplates)
router.use('/users', checkJwt, users)

router.use('/token', tokens)
router.use('/token/past-sprints', checkToken, pastSprints)
router.use('/token/sprint-templates', checkToken, sprintTemplates)
router.use('/token/users', checkToken, users)

module.exports = router
