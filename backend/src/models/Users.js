import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, 'First name is required'],
      minlength: [3, 'First name must be at least 3 characters long'],
      maxlength: [10, 'First name cannot exceed 10 characters'],
    },
    lname: {
      type: String,
      required: [true, 'Last name is required'],
      minlength: [3, 'Last name must be at least 3 characters long'],
      maxlength: [10, 'Last name cannot exceed 10 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Invalid email address',
      },
    },
    phoneNumber: {
      type: String,
      unique: true,
      validate: {
        validator: (value) => validator.isMobilePhone(value, 'any'),
        message: 'Invalid phone number',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      validate: {
        validator: (value) => validator.isStrongPassword(value),
        message: 'Password must be strong',
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    imageUrl: {
      type: Array,
      default: ['https://res.cloudinary.com/dw6pezn3k/image/upload/v1684405497/5770f01a32c3c53e90ecda61483ccb08_v66paa.jpg'],
    },

    verifCode: String,
    verificationCode: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
