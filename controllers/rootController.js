'use strict'

// initiate root controller object.
const rootController = {}
/**
 * '/' Get
 * Entrypoint for the api
 * offers hateoas browsing.
 */
rootController.getRoot = async (req, res, next) => {
  res.status(200).json({
    Message: 'Welcome to the blackmouthed goby api. Log in to manage catches'
  }, [
    { rel: 'self', method: 'GET', href: `${process.env.HOST_URL}` },
    { rel: 'login', method: 'POST', title: 'log in', href: `${process.env.HOST_URL}/login` }
  ])
  next()
}

module.exports = rootController
