import Product from "../models/Products.js";

// GET /products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET /products/:id
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      console.log(`Product not found for ID: ${productId}`);
      return res.status(404).json({ error: "Product not found" });
    }

    console.log(`Found product: ${product}`);
    res.status(200).json(product);
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**CREATE A NEW PRODUCT */
const createProduct = async (req, res) => {
  try {
    const { productNumber, name, description, price, weight, imageUrl } =
      req.body;

    // Check if the product already exists by its product number
    const existingProduct = await Product.findOne({ productNumber });

    if (existingProduct) {
      return res.status(409).json({ error: "Product already exists" });
    }

    // Create the product if it doesn't exist
    const product = await Product.create({
      productNumber,
      name,
      description,
      price,
      weight,
      imageUrl,
    });

    res.status(201).json(product);
  } catch (error) {
    // Handle specific error cases
    if (error.name === "ValidationError") {
      // Handle validation errors
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({ error: validationErrors });
    }

    // Handle other internal server errors
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT /products/:id
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Update product's stock

// const updateProductCountInStock = async (req, res) => {
//   try {
//     const id = req.params;
//     const newQuantity = req.body;
//     console.log("id to update", id);
//     console.log("newQuantity to update", newQuantity);

//     const product = await Product.findByIdAndUpdate(
//       id,
//       { countInStock: countInStock - newQuantity },
//       { new: true }
//     );
//     console.log("found product", product);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     res.status(200).json(product);
//     console.log("product to update", product);
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// };

// Assuming you have a product model/schema defined and imported

const updateProductCountInStock = async (productId, newCountInStock) => {
  try {
    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    // Update the countInStock value
    product.countInStock = newCountInStock;

    // Save the updated product
    await product.save();

    return product; // Return the updated product if needed
  } catch (error) {
    throw new Error(`Error updating product countInStock: ${error.message}`);
  }
};

// DELETE /products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateProductCountInStock,
  deleteProduct,
};
