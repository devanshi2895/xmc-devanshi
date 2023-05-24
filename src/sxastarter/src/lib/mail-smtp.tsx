import nodemailer from 'nodemailer';

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

const smtpOptions = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: parseInt('465'),
  secure: true,
  auth: { user: process.env.SMTP_USERNAME, pass: process.env.SMTP_KEY },
};
console.log('UserName : ' + process.env.SMTP_USERNAME);
console.log('Password : ' + process.env.SMTP_KEY);
export const SendEmail = async (emailData: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });
  console.log('inside send email');
  return await transporter.sendMail({
    from: 'mulyankan2023@gmail.com',
    ...emailData,
  });
};
