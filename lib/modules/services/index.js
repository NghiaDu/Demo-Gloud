const register = (server, options, next) => {
  let services = [].concat(
    require('./users'),
    require('./companies')
  )
  server.method(services)
  return next()
}

register.attributes = {
  pkg: require('./package.json')
}

module.exports = register
