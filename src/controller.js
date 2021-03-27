const Ctrls = {}

Ctrls.createCustomer = async (req, res) => {
    try {
        const customer = await stripe.customers.create({
            description: 'Pedro Perez',
            metadata: {
                nombre: 'Pedro Perez',
                telefono: '+573007264758'
            }
        });

        res.status(200).json(customer)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal Server Error' })
    }
}

Ctrls.createSetupIntents = async (req, res) => {
    try {
        const setupIntent = await stripe.setupIntents.create({
            payment_method_types: ['card'],
            customer: 'cus_JBkmh38TfW2oJr'
        });
        res.status(200).json(setupIntent)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal Server Error' })
    }
}

Ctrls.paymentMethodList = async () => {
    try {
        const result = await stripe.paymentMethods.list({
            customer: 'cus_JBkmh38TfW2oJr',
            type: 'card',
        });

        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal Server Error' })
    }
}

Ctrls.pay = async () => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 900,
            currency: 'usd',
            customer: 'cus_JBkmh38TfW2oJr',
            payment_method: 'pm_1IZNLkLDjruEzt50M2jhab2o',
            off_session: true,
            confirm: true,
        });

        res.status(200).json(paymentIntent)
    } catch (err) {
        console.log('Error code is: ', err.code);
        return res.status(500).json({ msg: 'Internal Server Error' })
    }
}

module.exports = Ctrls