import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide a email"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "please provide the password"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVarified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: String,
  verifyToken: String,
  verifyTokenExpiry: String,
});

const User = mongoose.model.users || mongoose.model("users", userSchema);

export default User;
