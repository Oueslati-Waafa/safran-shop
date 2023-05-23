import Order from '../models/Order.js';



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

    const orderExist = await Order.findOne({ 'paymentInfo.id': paymentInfo.id });

    if (orderExist) {
      return res.status(400).json({ error: 'Order Already Placed' });
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
    res.status(500).json({ error: 'Server error' });
  }
};

//get my orders
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
  
// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single order by ID
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

// Update an order
export const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate request data
    if (!status) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findByIdAndRemove(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
