module.exports = app => {
  const controller = require("../controllers/controller.js");


  // Retrieve all Customers
  app.get("/customers", controller.findAllCustomers);

  // Retrieve all Orders
  app.get("/orders", controller.findAllOrders);

  // Retrieve all Orders
  app.get("/ordersbystatus", controller.getOrdersByShippingStatus);

  // Retrieve all Orders
  app.get("/ordersbymonth", controller.getOrdersByMonth);

  // Retrieve all Orders
  app.get("/topfivecustomers", controller.getTop5Customers);

  app.get("/shippingtime", controller.getShippingTime);

  app.get("/totalquantityordered", controller.getTotalQuantityOrdered);

  app.get("/ordertotalprice", controller.getOrderTotalPrice);

  app.post("/createemployee", controller.createEmployee);

  // Update a Customer with customerId
  app.put("/office/:cityname", controller.update);

};
