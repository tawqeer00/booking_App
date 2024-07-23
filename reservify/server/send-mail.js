// "use strict";
// // const dotenv = require("dotenv").config()
// const nodemailer = require("nodemailer");
// /**
//  * sendEmail
//  * @param {Object} mailObj - Email information
//  * @param {String} from - Email address of the sender
//  * @param {Array} to - Array of receipents email address
//  * @param {String} subject - Subject of the email
//  * @param {String} text - Email body
//  */
// const sendEmail = async (mailObj) => {
//   const { from, to, subject, text } = mailObj;

//   try {
//     // Create a transporter
//     let transporter = nodemailer.createTransport({
//       host: "smtp-relay.sendinblue.com",
//       port: 587,
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_KEY,
//       },
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: from, // sender address
//       to: to, // list of receivers
//       subject: subject, // Subject line
//       text: text, // plain text body
//     });

//     console.log(`Message sent: ${info.messageId}`);
//     return `Message sent: ${info.messageId}`;
//   } catch (error) {
//     console.error(error);
//     throw new Error(
//       `Something went wrong in the sendmail method. Error: ${error.message}`
//     );
//   }
// };

// module.exports = sendEmail;




// "use strict";
// // const dotenv = require("dotenv").config()
// const nodemailer = require("nodemailer");
// /**
//  * sendEmail
//  * @param {Object} mailObj - Email information
//  * @param {String} from - Email address of the sender
//  * @param {Array} to - Array of receipents email address
//  * @param {String} subject - Subject of the email
//  * @param {String} text - Email body
//  */
// const sendEmail = async (mailObj) => {
//   const { from, to, subject, text } = mailObj;

//   try {
//     // Create a transporter
//     let transporter = nodemailer.createTransport({
//       service:'gmail',
//       host: "smtp.gmail.com",
//       port: 587,
//       secure:false,
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.APP_PASSWORD,
//       },
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: from, // sender address
//       to: to, // list of receivers
//       subject: subject, // Subject line
//       text: text, // plain text body
//     });

//     console.log(`Message sent: ${info.messageId}`);
//     return `Message sent: ${info.messageId}`;
//   } catch (error) {
//     console.error(error);
//     throw new Error(
//       `Something went wrong in the sendmail method. Error: ${error.message}`
//     );
//   }
// };

// module.exports = sendEmail;





"use strict";
const dotenv = require("dotenv").config()
const nodemailer = require("nodemailer");
/**
 * sendEmail
 * @param {Object} mailObj - Email information
 * @param {String} from - Email address of the sender
 * @param {Array} to - Array of receipents email address
 * @param {String} subject - Subject of the email
 * @param {String} text - Email body
 */

    // Create a transporter
    let transporter = nodemailer.createTransport({
      service:'gmail',
      host: "smtp.gmail.com",
      port: 587,
      secure:false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    // send mail with defined transport object
    let info = {
      from: process.env.EMAIL, // sender address
      to: "vegebet614@bacaki.com", // list of receivers
      subject: "hello anonymus", // Subject line
      text: "heyyyyyyyyyyyy watsup mannnn", // plain text body
    };



    const sendMail=async()=>{
      try{
        await transporter.sendMail(info)
        console.log("Mail sent successfully");

      }
      catch(error){
        console.log(error);
      }



      
    }
    sendMail(transporter,info);







