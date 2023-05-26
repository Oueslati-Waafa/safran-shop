import jwt from "jsonwebtoken";



/**ENSURE THAT THE USER IS LOGGED IN */
export function ensureUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedTokenUser = jwt.verify(token, process.env.JWT_SECRET);
    console.log("user decoded token:", decodedTokenUser);
    console.log("ensureUser middleware called");

    req.user = {
      id: decodedTokenUser.user.id,
      email: decodedTokenUser.user.email,
    };
    next();
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
}


/**ENSURE THAT USER IS LOGGED IN */
export function ensureLoggedIn(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const id = decodedToken.user.id;
      const name = decodedToken.user.name;
      const email = decodedToken.user.email;
      
      const user = req.params.param;
      
      if (
        user.toString() !== name.toString() &&
        user.toString() !== email.toString() &&
        user.toString() !== id.toString() 
      ) {
        return res.status(401).json({
          message: "Invalid token",
        });
      } else {
        next();
      }
    } catch (err) {
      return res.status(500).json({
        error: new Error("Invalid request!"),
      });
    }
  }

  /**ENSURE THAT THE USER IS AN ADMIN */
  export function ensureAdmin(req, res, next) {
    try {
      // Get the token from the request headers
      const token = req.headers.authorization.split(' ')[1];
  
      // Verify the token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
      console.log('admin decoded token: ', decodedToken)
      // Check if the user is an admin
      if (!decodedToken.user.isAdmin) {
        return res.status(401).json({
          error: 'Unauthorized. You are not an admin.',
        });
      }
  
      // User is an admin, proceed to the next middleware
      next();
    } catch (error) {
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
  