const Joi = require('joi')

const {
  ErrorsWithAuthOutputValidations,
  ErrorsOnPostOutputValidations,
  ErrorsOnGetOutputValidations,
  ErrorsOnPutOutputValidations,
  ErrorsOnDeleteOutputValidations
} = require('../../validations')

const _ = require('lodash')

// --------------------------------------------------
//    Schema - Output Validations
// --------------------------------------------------

const CompanyJSON = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string().email().required()
})

const SingleCompanyOutputPayload = Joi.object().keys({
  Company: CompanyJSON
})

const ListCompanyOutputPayload = Joi.object().keys({
  Companys: Joi.array().items(CompanyJSON),
  CompanysCount: Joi.number().required().description('The number of Companys')
})

const ErrorOutputValidation = Joi.object().keys({
  errors: Joi.object().keys({
    title: Joi.array().items(Joi.string()).optional(),
    description: Joi.array().items(Joi.string()).optional(),
    body: Joi.array().items(Joi.string()).optional()
  })
})

// --------------------------------------------------
//    Config - Output Validations
// --------------------------------------------------

const ListCompanyOutputValidationsConfig = {
  status: {
    200: ListCompanyOutputPayload
  }
}

const ListCompanyWithAuthOutputValidationsConfig = _.merge({}, ErrorsWithAuthOutputValidations, ListCompanyOutputValidationsConfig)

const CompanyOnGetOutputValidationsConfig = _.merge({}, ErrorsOnGetOutputValidations, {
  status: {
    200: SingleCompanyOutputPayload
  }
})

const CompanyOnPostOutputValidationsConfig = _.merge({}, ErrorsOnPostOutputValidations, {
  status: {
    200: SingleCompanyOutputPayload,
    422: ErrorOutputValidation
  }
})

const CompanyOnPutOutputValidationsConfig = _.merge({}, ErrorsOnPutOutputValidations, {
  status: {
    200: SingleCompanyOutputPayload,
    422: ErrorOutputValidation
  }
})

const CompanyOnDeleteOutputValidationsConfig = _.merge({}, ErrorsOnDeleteOutputValidations, {
  status: {
    204: false
  }
})

const CompanyDeleteOutputValidationsConfig = _.merge({}, ErrorsOnDeleteOutputValidations, {
  status: {
    204: false
  }
})

module.exports = {
  CompanyDeleteOutputValidationsConfig,
  CompanyOnGetOutputValidationsConfig,
  CompanyOnPostOutputValidationsConfig,
  CompanyOnPutOutputValidationsConfig,
  CompanyOnDeleteOutputValidationsConfig,
  ListCompanyOutputValidationsConfig,
  ListCompanyWithAuthOutputValidationsConfig,
  SingleCompanyOutputPayload,
  ListCompanyOutputPayload
}
