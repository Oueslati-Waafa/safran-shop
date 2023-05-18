import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    imageUrl: {
      type: Array,
      required: false,
      default :"https://res.cloudinary.com/dw6pezn3k/image/upload/v1684405497/5770f01a32c3c53e90ecda61483ccb08_v66paa.jpg"
    },
    shippingDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'ShippingDetails' },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
