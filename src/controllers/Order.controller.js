import Order from "../models/Order.js";
import Stripe from "stripe";

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
    const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Convert totalPrice from USD to EUR
    const usdToEurRate = 0.85; // Example exchange rate
    const totalPriceEur = totalPrice * usdToEurRate;

    // Create the order in your database
    const order = new Order({
      shippingInfo,
      paymentMethod,
      orderItems,
      user: req.user.id,
      totalPrice: totalPriceEur,
      orderStatus: "Processing",
      shippingPrice,
      taxPrice,
    });

    // Save the order to the database
    await order.save();

    // Create the checkout session
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: orderItems.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * usdToEurRate * 100), // Convert price from USD to EUR
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:9090/orders/success",
      cancel_url: "http://localhost:9090/orders/cancel",
    });

    // Update the order's paymentInfo with the sessionId
    order.paymentInfo = { sessionId: session.id };
    await order.save();

    // Redirect the user to the Stripe payment page
    res.redirect(303, session.url);
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

/**HANDLE PAYMENT SUCCESS */
export const handlePaymentSuccess = async (req, res) => {
  try {
    const { sessionId } = req.query;

    // Retrieve the order associated with the session ID
    const order = await Order.findOne({ "paymentInfo.id": sessionId });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update the order status as paid and set the paidAt timestamp
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentInfo.id = sessionId;
    order.paymentInfo.status = "succeeded";

    // Save the updated order
    await order.save();

    // Send a response to the client
    res.status(200).json({ message: "Payment successful", orderId: order._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**HANDLE CANCEL PAYMENT */
export const handlePaymentCancel = (req, res) => {
  // Handle payment cancellation logic
  res.status(200).json({ message: "Payment cancelled" });
};
