import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'honeycombindia.lokesh@gmail.com',
        pass: 'vtyl ayna fego alga'
    }
});

export default transporter;
