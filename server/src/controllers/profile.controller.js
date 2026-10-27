export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Middleware errors",
      });
    }
    console.log(req.user);
    return res.status(200).json({
      success: true,
      fname: req.user.fname,
      lname: req.user.lname,
      email: req.user.email,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server er",
    });
  }
};
