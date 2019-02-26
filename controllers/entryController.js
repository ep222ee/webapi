'use strict'

const entryController = {}

entryController.entry = async (req, res, next) => {
  res.status(200).json({
    Message: 'Welcome to the blackmouthed goby api. Log in to manage catches'
  }, [
    { rel: 'self', method: 'GET', href: `${process.env.HOST_URL}` },
    { rel: 'login', method: 'POST', title: 'log in', href: `${process.env.HOST_URL}/login` }
  ])
}

module.exports = entryController
