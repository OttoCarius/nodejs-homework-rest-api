const { User } = require("../../models/user");

const { HttpError, sendEmail } = require("../../Helpers");

const dotenv = require("dotenv");

dotenv.config();

const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email, verificationToken } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404);
  }
  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify${verificationToken}">Click to verify</a>`,
  };
  await sendEmail(mail);
  res.status({
    message: "Resend verify link",
  });
};

module.exports = resendEmail;
