import ShippingDetails from '../models/ShippingDetails.js'

// GET /shipping-details
const getShippingDetails = async (req, res) => {
    try {
      const shippingDetails = await ShippingDetails.find();
      res.status(200).json(shippingDetails);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // GET /shipping-details/:id
  const getShippingDetailsById = async (req, res) => {
    try {
      const shippingDetailsId = req.params.id;
      const shippingDetails = await ShippingDetails.findById(shippingDetailsId);
  
      if (!shippingDetails) {
        console.log(`Shipping details not found for ID: ${shippingDetailsId}`);
        return res.status(404).json({ error: 'Shipping details not found' });
      }
  
      console.log(`Found shipping details: ${shippingDetails}`);
      res.status(200).json(shippingDetails);
    } catch (error) {
      console.error('Error retrieving shipping details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  /**CREATE NEW SHIPPING DETAILS */
  const createShippingDetails = async (req, res) => {
    try {
      const { houseNumber, address, postalCode, landmark } = req.body;
  
      // Check if the shipping details already exist by postal code
      const existingShippingDetails = await ShippingDetails.findOne({ postalCode });
  
      if (existingShippingDetails) {
        return res.status(409).json({ error: 'Shipping details already exist' });
      }
  
      // Create the shipping details if they don't exist
      const shippingDetails = await ShippingDetails.create({
        houseNumber,
        address,
        postalCode,
        landmark,
      });
  
      res.status(201).json(shippingDetails);
    } catch (error) {
      // Handle specific error cases
      if (error.name === 'ValidationError') {
        // Handle validation errors
        const validationErrors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({ error: validationErrors });
      }
  
      // Handle other internal server errors
      console.error('Error creating shipping details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // PUT /shipping-details/:id
  const updateShippingDetails = async (req, res) => {
    try {
      const shippingDetails = await ShippingDetails.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!shippingDetails) {
        return res.status(404).json({ error: 'Shipping details not found' });
      }
      res.status(200).json(shippingDetails);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // DELETE /shipping-details/:id
  const deleteShippingDetails = async (req, res) => {
    try {
      const shippingDetails = await ShippingDetails.findByIdAndDelete(req.params.id);
      if (!shippingDetails) {
        return res.status(404).json({ error: 'Shipping details not found' });
      }
      res.status(200).json({ message: 'Shipping details deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export {
    getShippingDetails,
    getShippingDetailsById,
    createShippingDetails,
    updateShippingDetails,
    deleteShippingDetails,
  };
  