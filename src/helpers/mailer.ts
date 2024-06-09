import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/userModels";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "ad5dbcda4605fc",
    pass: "9e2908f91f1a28",
    //TODO add this details to .ev file
  },
});

export const sendMail = async ({ email, typeOfEmail, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 8);
    if (typeOfEmail === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (typeOfEmail === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }
    const mailOptions = {
      from: "niroshshetty@gmail.com",
      to: email,
      subject:
        typeOfEmail === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        typeOfEmail === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>`,
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error: any) {
    console.log(error.message);
  }
};
