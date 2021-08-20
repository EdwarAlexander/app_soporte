import nodemailer from 'nodemailer';

const sendMail = (correos, message) => {
    console.log(correos);
    console.log(message);
}

export {
    sendMail
}