import nodemailer from "nodemailer";
import createWelcomeEmailTemplate from "./emailTemplates.js"

const sendWelcomeEmail = async (email, name, clientURL) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Chat App 🎉",
      html: createWelcomeEmailTemplate(name, clientURL)
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("SMTP ERROR:", error);
    throw new Error("Email not sent");
  }
};

export default sendWelcomeEmail;