module.exports = {
  env: {
    BASE_URL: "http://localhost:3005/backend5/api/v1",
    IMAGE_URL: "http://localhost:3005/backend5/api",
  },
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
      },
      {
        source: "/signup",
        destination: "/auth/signup",
      },
      {
        source: "/forget-password",
        destination: "/auth/forgetpassword",
      },
      {
        source: "/new-password",
        destination: "/auth/newpassword",
      },
      {
        source: "/admin-dashboard",
        destination: "/profile/AdminDashboard",
      },
      {
        source: "/product-cust",
        destination: "/product-cust",
      },
      {
        source: "/product-admin",
        destination: "/product-admin",
      },
      {
        source: "/admin-manage-order",
        destination: "/manage-order-admin",
      },
      {
        source: "/set-promo",
        destination: "/set-promo",
      },
    ];
  },
};
