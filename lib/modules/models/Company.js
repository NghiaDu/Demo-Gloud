var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var slug = require('slug')

var CompanySchema = new mongoose.Schema({
  name: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  description: String,
  phone: String
}, { timestamps: true })

CompanySchema.plugin(uniqueValidator, { message: 'is already taken' })

CompanySchema.pre('validate', function (next) {
  this.slugify()

  next()
})

CompanySchema.methods.slugify = function () {
  this.slug = slug(this.title)
}

CompanySchema.methods.toJSONFor = function () {
  return {
    name: this.name,
    email: this.email,
    description: this.description,
    phone: this.phone,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

module.exports = mongoose.model('Company', CompanySchema)
