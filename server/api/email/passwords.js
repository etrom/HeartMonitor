var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
      user: 'heartbarsmailer@gmail.com',
      pass: '4Zyl*R8wax'
   }
});


module.exports = transporter;