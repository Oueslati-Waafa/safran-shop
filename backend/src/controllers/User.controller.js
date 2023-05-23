import User from '../models/Users.js'

// GET /users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('shippingDetails');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
  // GET /users/:id
  const getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId).populate('shippingDetails');
  
      if (!user) {
        console.log(`User not found for ID: ${userId}`);
        return res.status(404).json({ error: 'User not found' });
      }
  
      console.log(`Found user: ${user}`);
      res.status(200).json(user);
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  /**CREATE A NEW USER */
  const createUser = async (req, res) => {
    try {
      const { fname, lname, email, phoneNumber, password, isAdmin, shippingDetails } = req.body;
  
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }
  
  
      const user = await User.create({
        fname,
        lname,
        email,
        phoneNumber,
        password,
        isAdmin,
 
      });
  
      res.status(201).json(user);
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({ error: validationErrors });
      }
  
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // PUT /users/:id
  const updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // DELETE /users/:id
  const deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
  