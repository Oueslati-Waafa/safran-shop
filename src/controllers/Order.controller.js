import Order from "../models/Order.js";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export async function createCustomer(foundUser) {
  if (foundUser.stripeCustomerID) {
    return foundUser.stripeCustomerID;
  }

  const customer = await stripe.customers.create({
    email: foundUser.email,
    metadata: {
      userId: foundUser.id.toString(),
    },
  });

  foundUser.stripeCustomerID = customer.id;
  await foundUser.save();

  return customer.id;
}


// Create an instance of the Stripe client



/**CREATE NEW ORDER */

export const createOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      paymentMethod,
      orderItems,
      totalPrice,
      shippingPrice,
      taxPrice,
    } = req.body;

    // Create the order in your database
    const order = new Order({
      shippingInfo,
      paymentMethod,
      orderItems,
      user: req.user.id,
      totalPrice,
      orderStatus: "Processing",
      shippingPrice,
      taxPrice,
    });

    // Save the order to the database
    await order.save();

    // Create the customer and associate the customer ID with the order
    const customerID = await createCustomer(req.user); // Pass the foundUser object to createCustomer
    order.customerID = customerID;
    await order.save();

    // Redirect the user to the Stripe payment page
    res
      .status(200)
      .json({ message: "Order placed successfully", orderId: order._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**GET MY ORDERS*/
export const getMyOrders = async (req, res) => {
  try {
    console.log(req.user); // Check if req.user is populated correctly

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


export const handlePaymentStripe = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Create a payment intent using the Stripe secret key
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Create a payment method for the card details
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: "4242424242424242",
        exp_month: 12,
        exp_year: 2024,
        cvc: "123",
      },
    });

    // Associate the payment method with the customer
    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: order.customerID, // Use the customer ID associated with the order
    });

    // Confirm the payment intent with the payment method
    const paymentIntent = await stripe.paymentIntents.confirm(
      order.paymentInfo.id,
      {
        payment_method: paymentMethod.id,
      }
    );

    // Update the order with payment details
    order.paymentInfo = {
      id: paymentIntent.id,
      status: paymentIntent.status,
    };
    order.isPaid = true;
    order.paidAt = Date.now();
    await order.save();

    res.status(200).json({ message: "Payment successful", orderId: order._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
