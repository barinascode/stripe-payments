const { Router } = require('express')
const { createCustomer, createSetupIntents, paymentMethodList, pay } = require('./controller')

const route = Router()

route.get('/v1/customers', createCustomer)

route.get('/v1/setup_itents', createSetupIntents)

route.get('/v1/payment_methods', paymentMethodList)

route.get('/v1/pay', pay)

module.exports = route