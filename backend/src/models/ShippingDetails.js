import mongoose from "mongoose";

const shippingDetailsSchema = new mongoose.Schema(
  {
    houseNumber: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    postalCode: { 
        type: String, 
        required: true 
    },
    landmark : { 
        type: String, 
        required: true 
    },
  },
  {
    timestamps: true,
  }
);

const ShippingDetails = mongoose.model("ShippingDetails", shippingDetailsSchema);

export default ShippingDetails;