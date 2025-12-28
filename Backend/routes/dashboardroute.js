const express = require("express");
const router = express.Router();

const DashboardController = require("../controllers/dashboardcontroller");

router.get("/customers", DashboardController.getAllCustomers);


router.get("/customers/search", DashboardController.searchCustomers);

router.post("/customers", DashboardController.addCustomer);

router.put(
  "/customers/:name/:phone",
  DashboardController.updateCustomer
);

module.exports = router;
