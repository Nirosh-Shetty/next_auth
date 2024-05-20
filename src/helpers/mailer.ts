import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
    //TODO add this details to .ev file
  },
});

export const sendMail = async ({ email, typeOfEmail }: any) => {
  try {
    const mailOptions = {
      from: '"Madison Foo Koch 👻" <maddison53@ethereal.email>',
      to: email,
      subject:
        typeOfEmail == "VERIFY" ? "Verify your email" : "Reset your password",
      //   text: "Hello world?",
      html: "<b>Hello world?</b>",
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error: any) {
    throw new error(error.message);
  }
};
