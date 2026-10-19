import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

export const resendSignupService = async (email, otp) => {
  const resend = new Resend(process.env.RESEND_API);

  if (!email) {
    const error = new Error("Email already exist");
    error.statusCode = 400;
    throw error;
  }
  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your InfoDeck account",
    html: `<p>Your OTP code is <h1>${otp}</h1> <br> Thanks for signing up to InfoDeck <br> <b> OTP expires in 10 minutes</b> <br> <br> Ignore this email if you didn't request this OTP email</p>`,
  });
};
