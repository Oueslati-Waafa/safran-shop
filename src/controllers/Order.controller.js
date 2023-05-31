import Order from "../models/Order.js";
import User from "../models/Users.js"
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
// Create an instance of the Stripe client
const key =
  "sk_test_51Moo6YHR4eKJdhow9ffFixaIiLSm6FlXjhfnheHGnyBS5yVgVncZDPLlNdSBCQbUOUYtyXh1GlWLlXvmXNUdKs0H00ba59H0X0";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

/**CREATE NEW ORDER */

export const createOrder = async (req, res) => {
  try {
    const { shippingInfo, orderItems, totalPrice, shippingPrice, taxPrice } =
      req.body;

    // Create the order in your database
    const order = new Order({
      shippingInfo,
      orderItems,
      user: req.user.id,
      totalPrice,
      orderStatus: "Processing",
      shippingPrice,
      taxPrice,
    });

    // Save the order to the database
    await order.save();

    res.status(200).json({
      message: "Order placed successfully",
      orderId: order._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const payOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const  userId  = req.user.id; // Assuming the user ID is available as userId

    console.log(userId)
    
    // Retrieve the user from the database based on the user ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Retrieve the order from the database
    const order = await Order.findById(orderId);

    // Check if the order has already been paid
    if (order.isPaid) {
      return res.status(400).json({ error: "Order has already been paid" });
    }

    // Create a test payment method token
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: "4242424242424242",
        exp_month: 12,
        exp_year: 2024,
        cvc: "123",
      },
    });

    // Create a customer
    const customer = await stripe.customers.create({
      email: user.email, // Provide the customer's email here
      name: `${user.fname} ${user.lname}`,
      payment_method: paymentMethod.id,
    });

    // Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: customer.id,
    });

    // Create a payment intent with the customer and order amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.totalPrice * 100, // Stripe requires the amount in cents
      currency: "eur",
      customer: customer.id,
      payment_method: paymentMethod.id,
      confirmation_method: "manual",
      confirm: true,
      metadata: { orderId: order._id },
    });

    // Update the order with payment information
    order.paymentInfo = {
      id: paymentIntent.id,
      status: paymentIntent.status,
      customer: {
        id: customer.id,
        email: customer.email,
        name: customer.name,
      },
    };
    order.isPaid = true;
    order.paidAt = new Date();
    await order.save();

    // Handle any additional order fulfillment logic, such as sending confirmation emails

    res.status(200).json({ message: "Payment confirmed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/**GET MY ORDERS*/
export const getMyOrders = async (req, res) => {
  try {
    console.log(req.user.id); // Check if req.user is populated correctly

    const userId = req.user.id;
    const orders = await Order.find({ user: userId });
    console.log("getMyOrders handler called");
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

/**GET ALL ORDERS */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

/**GET A SINGLE ORDER BY ID*/
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("user");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

/**UPDATE AN ORDER */
export const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updateFields = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateFields, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**CANCEL ORDER FOR ADMIN */
export const cancelOrderAdmin = async (req, res) => {
  try {
    const orderId = req.params.id; // Retrieve the order ID from the request parameters
    const order = await Order.findById(orderId); // Find the order by ID

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.orderStatus !== "Processing") {
      // Check if the order status is "Processing"
      return res.status(400).json({ error: "Order cannot be canceled" });
    }

    // Update the order status to "Cancelled"
    order.orderStatus = "Cancelled";

    // Save the updated order
    await order.save();

    res.status(200).json({ message: "Order canceled successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
