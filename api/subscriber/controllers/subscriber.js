'use strict';
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const nodemailer = require('nodemailer')
module.exports = {
    async create(ctx) {
        const { Email } = ctx.request.body
        const existingSub = await strapi.services.subscriber.find({ Email })
        if (!existingSub) {
            await strapi.services.subscriber.create({ Email })
            try {
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.USER_EMAIL,
                        pass: process.env.USER_PASSWORD,
                    }
                })
                const mailOptions = {
                    from: 'BUY HERE stores',
                    to: `${Email}`,
                    subject: 'Welcome',
                    text: `Hey @${Email}, Thanks for subscribing to our NewsLetter`
                };
                await transporter.sendMail(mailOptions)
            } catch (error) {
                console.log(error)
            }
        }
        return Email
    }
};