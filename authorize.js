// const jwt = require('jsonwebtoken');
// const { JwksClient } = require('jwks-rsa');



// function authorize(request, response, next){
    
//     function valid(err, user) {
//         request.user = user;
//         next();
//       }
    
//       try {
//         const token = request.headers.authorization.split(' ')[1];
//         jwt.verify(token, getKey, {}, valid);
//       } catch (error) {
//           console.log(error)
//         next('Not Authorized');
//       }
//     }
    
    
  
//     const client = new JwksClient({
//       // this url comes from your app on the auth0 dashboard
//       jwksUri: process.env.JWKS_URI,
//     });
    
//     // Match the JWT's key to your Auth0 Account Key so we can validate it
//     function getKey(header, callback) {
//       client.getSigningKey(header.kid, function (err, key) {
//         const signingKey = key.publicKey || key.rsaPublicKey;
//         callback(null, signingKey);
//       });
    

// }

// module.exports = authorize




