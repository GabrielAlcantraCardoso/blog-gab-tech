const express = require("express");
const loginRoutes = require("./login/login.routes");
const registerRoutes = require("./register/register.routes");
const userRoutes = require("./user/user.routes");
const categoriesRoutes = require("./categories/categories.routes");
const postRoutes = require("./post/post.routes");


function routesApp(app) {
  app.use(express.json());
  loginRoutes(app)
  registerRoutes(app);
  userRoutes(app);
  categoriesRoutes(app);
  postRoutes(app);
}

module.exports = { routesApp };