// const authorizeRole = (...authorizeRole) => {
//   return (req, res, next) => {
//     if (!allowedRoles.include(req.user.role)) {
//       return res.status(403).json({
//         success: true,
//         message: "Access denied",
//       });
//     }
//     next();
//   };
// };

// module.exports = { authorizeRole };

const authorizeRole = (...allowedRoles) => {
	return (req, res, next) => {
		if (!req.admin) {
			return res.status(401).json({
				success: false,
				message: "Admin authentication required",
			});
		}
		if (!allowedRoles.includes(req.admin.role)) {
			return res.status(403).json({
				success: false,
				message: "Access denied",
			});
		}

		next();
	};
};

module.exports = { authorizeRole };
