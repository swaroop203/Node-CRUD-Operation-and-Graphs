const Model = require("../models/model.js");


// Create and Save a new Model
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Model
  const Model = new Model({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save Model in the database
  Model.create(Model, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Model."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAllCustomers = (req, res) => {
  Model.getAllCustomer((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Retrieve all Orders from the database.
exports.findAllOrders = (req, res) => {
  Model.getAllOrders((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

exports.getOrdersByShippingStatus = (req, res) => {
  Model.getAllOrdersStatus((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
}

exports.getOrdersByMonth = (req, res) => {
  Model.getAllOrdersByMonth((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
}

exports.getTop5Customers = (req, res) => {
  Model.getTop5Customers((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
}

exports.getShippingTime = (req, res) => {
  Model.getShippingTime((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
}

exports.getTotalQuantityOrdered = (req, res) => {
  Model.getTotalQuantityOrdered((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
}

exports.getOrderTotalPrice = (req, res) => {
  Model.getOrderTotalPrice((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
}

exports.createEmployee = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Model
  const Employee = {
    employeeNumber: req.body.employeeNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    extension: req.body.extension,
    email: req.body.email,
    reportsTo: req.body.reportsTo,
    jobTitle: req.body.jobTitle,
    officeCode: req.body.officeCode
  };
  console.log(Employee);

  // Save Model in the database
  Model.createEmployee(Employee, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Model."
      });
    else res.send(data);
  });
};

// Update a Model identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  const office = {
    city: req.body.city,
    phone: req.body.phone,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    state: req.body.state,
    country: req.body.country,
    postalCode: req.body.postalCode,
    territory: req.body.territory,
    officeLocation: req.body.officeLocation,
  };
  Model.updateById(
    req.params.cityname,
    office,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Model with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Model with id " + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );
};
