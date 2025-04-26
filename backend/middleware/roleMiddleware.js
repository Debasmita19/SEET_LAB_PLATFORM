const permit = (...allowedRoles) => {
    return (req, res, next) => {
      const { role } = req.user;
      if (allowedRoles.includes(role)) {
        return next();
      }
      return res.status(403).json({
        message: 'Forbidden: You do not have the required role to access this resource.'
      });
    };
  };
  
  module.exports = permit;
  