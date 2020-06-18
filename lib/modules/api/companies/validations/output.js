const Joi = require('joi')

const {
  ErrorsWithAuthOutputValidations,
  ErrorsOnPostOutputValidations,
  ErrorsOnGetOutputValidations,
  ErrorsOnPutOutputValidations,
  ErrorsOnDeleteOutputValidations,
  NoChangeOutputValidations
} = require('../../validations')

const _ = require('lodash')

// --------------------------------------------------
//    Schema - Output Validations
// --------------------------------------------------

const CompanyJSON = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required()
})

const SingleCompanyOutputPayload = Joi.object().keys({
  Company: CompanyJSON
})

const ListCompanyOutputPayload = Joi.object().keys({
  companies: Joi.array().items(CompanyJSON),
  companiesCount: Joi.number().required().description('The number of Companys')
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

const CompanyOnDeleteOutputValidationsConfig = _.merge({}, ErrorsOnDeleteOutputValidations, NoChangeOutputValidations)

module.exports = {
  CompanyOnGetOutputValidationsConfig,
  CompanyOnPostOutputValidationsConfig,
  CompanyOnPutOutputValidationsConfig,
  CompanyOnDeleteOutputValidationsConfig,
  ListCompanyOutputValidationsConfig,
  ListCompanyWithAuthOutputValidationsConfig,
  SingleCompanyOutputPayload,
  ListCompanyOutputPayload
}
