import Order from "../models/Order.js";

/**CREATE NEW ORDER */

export const createOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      user,
      paymentInfo,
      paidAt,
      totalPrice,
      orderStatus,
      isPaid,
      shippingPrice,
      taxPrice,
      deliveredAt,
      shippedAt,
      createdAt,
    } = req.body;

    const orderExist = await Order.findOne({
      "paymentInfo.id": paymentInfo.id,
    });

    if (orderExist) {
      return res.status(400).json({ error: "Order Already Placed" });
    }

    const order = new Order({
      shippingInfo,
      orderItems,
      user,
      paymentInfo,
      paidAt,
      totalPrice,
      orderStatus,
      isPaid,
      shippingPrice,
      taxPrice,
      deliveredAt,
      shippedAt,
      createdAt,
      user: req.user.id,
    });

    await order.save();

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
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

/**CANCEL MY ORDERS */

export const cancelMyOrder = async (req, res) => {
  try {
    const userId = req.user.id; // Retrieve the user ID from the authenticated request

    const order = await Order.findById(req.params.id); // Find the order by ID

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.user.toString() !== userId) {
      // Check if the order belongs to the logged-in user
      return res
        .status(403)
        .json({ error: "Unauthorized to cancel this order" });
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
