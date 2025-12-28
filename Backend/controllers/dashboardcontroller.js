const db = require("../database");

class DashboardController {

  static async getAllCustomers(req, res) {
    try {
      const [rows] = await db.query(
        "SELECT name, phonenumber AS phone, gender, category, advance, balance, status FROM customers"
      );
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to load customers" });
    }
  }
   static async searchCustomers(req, res) {
    const { name } = req.query;

    try {
      const [rows] = await db.query(
        "SELECT * FROM customers WHERE name LIKE ?",
        [`%${name}%`]
      );
      res.json(rows);
    } catch (err) {
      res.status(500).json({ message: "Search failed" });
    }
  }static async addCustomer(req, res) {
    const { name, phone, gender, category, advance, balance } = req.body;

    const status =
      balance === 0 ? "PAID" : advance > 0 ? "ADVANCE" : "PENDING";

    try {
      await db.query(
        `INSERT INTO customers 
        (name, phonenumber, gender, category, advance, balance, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, phone, gender, category, advance, balance, status]
      );

      res.status(201).json({ message: "Customer added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add customer" });
    }
  }
  static async updateCustomer(req, res) {
    const { name, phone } = req.params;
    const { advance, balance } = req.body;

    const status =
      balance === 0 ? "PAID" : advance > 0 ? "ADVANCE" : "PENDING";

    try {
      await db.query(
        `UPDATE customers
         SET advance = ?, balance = ?, status = ?
         WHERE name = ? AND phonenumber = ?`,
        [advance, balance, status, name, phone]
      );

      res.json({ message: "Customer updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Update failed" });
    }
  }
}

module.exports = DashboardController;