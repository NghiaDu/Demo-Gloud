'use strict'

const mongoose = require('mongoose')
const Company = mongoose.model('Company')

function getcompanies (callback) {
  Company.find()
  .then(companies => callback(null, companies))
  .catch(err => callback(err, null))
}

function deletecompany (name, callback) {
  Company.remove().then(removedCompany => {
    return callback(null, removedCompany)
  }).catch(err => callback(err, name))
}
module.exports = [
  {
    name: 'services.companies.list',
    method: getcompanies
  },
  {
    name: 'services.companies.delete',
    method: deletecompany
  }
]
