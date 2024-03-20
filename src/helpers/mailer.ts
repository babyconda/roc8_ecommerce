import nodemailer from "nodemailer";

export const sendEmail = async ({ email, OTP }: any) => {
  try {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: "roc8_ecommerce@gmail.com",
      to: email,
      subject: "Verify your email",
      html: `
      <h2>Verify your Registration</h2> <p>Below is your one time password</p> <h1>${OTP}</h1>
      <p>We're here to help if you need it.</p>
      `,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
