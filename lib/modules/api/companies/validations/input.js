const Joi = require('joi')
const {validateOptions, HeadersPayLoad} = require('../../validations')
const _ = require('lodash')

// --------------------------------------------------
//    Schema - Input Validations
// --------------------------------------------------

const CompanyUpdatePayload = Joi.object().keys({
  Company: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required()
  })
})

const CompanyCreatePayload = Joi.object().keys({
  Company: Joi.object().keys({
    name: Joi.string().required().description('the Company name').example('Learn HapiJS')
  })
})
// --------------------------------------------------
//    Config - Input Validations
// --------------------------------------------------

const CompanyParamsValidations = {
  params: {
    name: Joi.string().required()
  }
}
const CompanyCreatePayloadValidations = {
  payload: CompanyCreatePayload,
  headers: HeadersPayLoad,
  options: validateOptions.options,
  failAction: validateOptions.failAction
}

const CompanyUpdatePayloadValidations = Object.assign({
  payload: CompanyUpdatePayload,
  headers: HeadersPayLoad,
  options: validateOptions.options,
  failAction: validateOptions.failAction
}, CompanyParamsValidations)

const CompanyDeletePayloadValidations = Object.assign({
  headers: HeadersPayLoad,
  options: validateOptions.options,
  failAction: validateOptions.failAction
}, CompanyParamsValidations)

module.exports = {
  CompanyParamsValidations,
  CompanyCreatePayloadValidations,
  CompanyUpdatePayloadValidations,
  CompanyDeletePayloadValidations
}
