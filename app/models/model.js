const sql = require("./db.js");

// constructor
const Model = function(customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

Model.createEmployee = (newCustomer, result) => {
  sql.query("INSERT INTO employees SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return; 
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};


Model.getAllCustomer = result => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Model.getAllOrders = result => {
  sql.query("SELECT * FROM orders", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};



Model.getAllOrdersStatus = result => {
  sql.query("select status, count('status') as total from orders group by status", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Model.getAllOrdersByMonth = result => {
  sql.query(`SELECT   MONTHNAME(orderDate) as Month,
  count(orderDate) AS DateCount
FROM     orders
GROUP BY MONTH(orderDate),
  MONTHNAME(orderDate)
ORDER BY MONTH(orderDate)`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Model.getTop5Customers = result => {
  sql.query(`select customerName, count('orderNumber') as ordersCount from orders join Customers on Customers.customerNumber=orders.customerNumber group by orders.customerNumber ORDER BY ordersCount DESC limit 5;`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Model.getShippingTime = result => {
  sql.query(`SELECT orderNumber,DATEDIFF(shippedDate, orderDate) AS days from Orders;`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Model.getTotalQuantityOrdered = result => {
  sql.query(`SELECT Orders.orderNumber, sum(OrderDetails.quantityOrdered) as total from Orders join OrderDetails on Orders.orderNumber = OrderDetails.orderNumber group by Orders.orderNumber;`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Model.getOrderTotalPrice = result => {
  sql.query(`SELECT Orders.orderNumber, sum(OrderDetails.priceEach) as price from Orders join OrderDetails on Orders.orderNumber = OrderDetails.orderNumber group by Orders.orderNumber;`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};




Model.updateByCity = (id, office, result) => {
  sql.query(
    `UPDATE offices SET city = ?, phone = ?, addressLine1 = ?, addressLine2 = ?, state = ?, country = ?, postalCode = ?, territory = ?, officeLocation =?
    WHERE city = ?`,
    [office.city, office.phone, office.addressLine1, office.addressLine2, office.state, office.country, office.postalCode, office.territory, office.officeLocation, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Model with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated office: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

module.exports = Model;
