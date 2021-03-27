
const http = require('http');
const https = require('https');
const express = require('express')
const cors = require("cors")
const fs = require("fs")

require("dotenv").config()

const privateKey = fs.readFileSync('/etc/letsencrypt/live/apiprod.ruzh.mx/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/apiprod.ruzh.mx/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/apiprod.ruzh.mx/chain.pem', 'utf8');


const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

const stripe = require('stripe')(process.env.PRIVATE_KEY);


const app = express()
const port = process.env.PORT || 3000


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Step 2 : Create a Customer before setup
/*
app.get('/v1/customers', async ( req, res) => {

  const customer = await stripe.customers.create({
    description: 'Pedro Perez',
    metadata : {
      nombre : 'Pedro Perez',
      telefono : '+573007264758'
    }
  });

  res.status(200).json(customer)
})
*/

//cus_JBgLGwpx7lzwke = Leonardo Tapia

// Step 3 : Create a SetupIntent
/*
app.get('/v1/setup_itents', async ( req, res) => {
    const setupIntent = await stripe.setupIntents.create({
        payment_method_types: ['card'],
        customer : 'cus_JBkmh38TfW2oJr'
      });
    res.status(200).json(setupIntent)
})
*/


/*
app.get('/v1/payment_methods', async ( req, res) => {
  
  const result = await stripe.paymentMethods.list({
    customer : 'cus_JBkmh38TfW2oJr',
    type: 'card',
    });

  res.status(200).json(result)
})
*/

/*
app.get('/v1/pay', async ( req, res) => {
  
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
  // Error code will be authentication_required if authentication is needed
  console.log('Error code is: ', err.code);
  // const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
  // console.log('PI retrieved: ', paymentIntentRetrieved.id);
  res.status(200).json(err)
}

  
})

*/



// Step 5 
// Step 3 : Create a SetupIntent
// app.get('/v1/setup_itents', async ( req, res) => {
  
// try {
  
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1099,
//     currency: 'usd',
//     customer: 'cus_JBgLGwpx7lzwke',
//     payment_method: 'seti_1IZJ3ULDjruEzt5058vHSk9C',
//     off_session: true,
//     confirm: true,
//   });

//   res.status(200).json(paymentIntent)

// } catch (err) {
//   // Error code will be authentication_required if authentication is needed
//   console.log('Error code is: ', err.code);
//   const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
//   console.log('PI retrieved: ', paymentIntentRetrieved.id);
// }

//   res.status(200).json(setupIntent)

// })



// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(12000, () => {
        console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
        console.log('HTTPS Server running on port 443');
})
