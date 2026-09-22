const authorizeRole = (...authorizeRole) => {
  return (req, res, next) => {
    if (!allowedRoles.include(req.user.role)) {
      return res.status(403).json({
        success: true,
        message: "Access denied",
      });
    }
    next();
  };
};

module.exports = { authorizeRole };
