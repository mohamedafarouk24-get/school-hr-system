const authorize = (...permissions) => {

  return (req, res, next) => {

    // 1. Get User Permissions
    const userPermissions =
      req.user.permissions || [];

    // 2. Super Admin Access
    if (req.user.role === "super_admin") {
      return next();
    }

    // 3. Check Permissions
    const hasPermission =
      permissions.some(permission =>
        userPermissions.includes(permission)
      );

    // 4. Access Denied
    if (!hasPermission) {

      return res.status(403).json({
        message: "Access denied"
      });
    }

    // 5. Continue
    next();
  };
};

module.exports = authorize;