const replyHelper = require('../helpers')

module.exports = (server) => {
  return {
    /**
     * GET /api/companies
     */
    getcompanies (request, reply) {
      server.methods.services.companies.list((err, companies) => {
        if (err) return reply(replyHelper.constructErrorResponse(err)).code(422)
        console.log(companies, err)
        return reply(companies)
      })
    },
    /**
     * GET /api/companies/{name}
     * @param {*} request
     * @param {*} reply
     */
    getCompany (request, reply) {
      var company = request.pre.company.toJSONFor(null)
      if (request.auth.isAuthenticated) {
        company = request.pre.company.toJSONFor(request.auth.credentials.user)
      }
      return reply({
        company
      })
    },
    /**
     * POST /api/Companies
     * @param {*} request
     * @param {*} reply
     */
    createcompany (request, reply) {
      server.methods.services.companies.create(
        request.auth.credentials.user,
        request.payload.company,
        (err, company) => {
          if (err) return reply(replyHelper.constructErrorResponse(err)).code(422)
          return reply({
            company: company.toJSONFor(request.auth.credentials.user)
          }).code(201)
        })
    },
    /**
     * PUT /api/Companies/{slug}
     * @param {*} request
     * @param {*} reply
     */
    updateCompany (request, reply) {
      server.methods.services.companies.update(
        request.pre.company,
        request.payload.company,
        (err, company) => {
          if (err) return reply(replyHelper.constructErrorResponse(err)).code(422)
          return reply({
            company: company.toJSONFor(request.auth.credentials.user)
          })
        })
    },
    /**
     * DELETE /api/company/{name}
     * @param {*} request
     * @param {*} reply
     */
    deletecompany (request, reply) {
      server.methods.services.companies.delete(
        request.pre.company,
        (err, company) => {
          if (err) return reply(replyHelper.constructErrorResponse(err)).code(422)
          return reply().code(204)
        })
    }
  }
}
