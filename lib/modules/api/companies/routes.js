module.exports = (server) => {
  const inputValidations = require('./validations/input')
  const outputValidations = require('./validations/output')
  const handlers = require('./handlers')(server)

  return [
    // GET /api/companies
    {
      method: 'GET',
      path: '/companies',
      config: {
        description: 'Get a list of companies',
        notes: 'Returm a list of companies',
        tags: ['api', 'companies'],
        response: outputValidations.ListCompanyOutputValidationsConfig,
        validate: inputValidations.companiesQueryValidations
      },
      handler: handlers.getcompanies
    },
    // POST /api/companies
    {
      method: 'POST',
      path: '/companies',
      config: {
        description: 'Create a new company',
        tags: ['api', 'companies'],
        auth: 'jwt',
        response: outputValidations.CompanyOnPostOutputValidationsConfig,
        validate: inputValidations.CompanyCreatePayloadValidations
      },
      handler: handlers.createcompany
    },
    // DELETE /api/companies/{name}
    {
      method: 'DELETE',
      path: '/companies/{name}',
      config: {
        description: 'Delete an company',
        tags: ['api', 'companies'],
        auth: 'jwt',
        response: outputValidations.CompanyOnDeleteOutputValidationsConfig,
        validate: inputValidations.CompanyCreatePayloadValidations
      },
      handler: handlers.deletecompany
    }
  ]
}
