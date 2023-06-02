const basicErrorHandler = require("../helpers/basicErrorHandler");
const createNewObjectBook = require("../helpers/createnewObjectbook");
const getBodyData = require("../helpers/getBodyData");
const notFoundfunc = require("../helpers/notFound.error");

const pool = require("../config/database/connect");

async function getOrders(req, res) {
  try {
    const results = await new Promise((resolve, reject) => {
      pool.query("SELECT * FROM orders", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    const resp = {
      status: "OK",
      results,
    };
    res.end(JSON.stringify(resp));
  } catch (error) {
    console.log(error);
    basicErrorHandler(res);
  }
}
async function getOrderByID(req, res) {
  try {
    const id = req.url.split("/")[2];
    const results = await new Promise((resolve, reject) => {
      pool.query("SELECT * FROM orders WHERE id =?", id, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    const resp = {
      status: "OK",
      results,
    };
    res.end(JSON.stringify(resp));
  } catch (error) {
    console.log(error);
    basicErrorHandler(res);
  }
}

async function createOrder(req, res) {
  try {
    const data = await getBodyData(req);
    const { book_id, price, address } = JSON.parse(data);
    const values = [book_id, price, address];
    const query = "INSERT INTO orders (book_id, price, address) VALUES(?,?,?)";
    const results = await new Promise((resolve, reject) => {
      pool.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    const resp = {
      status: "OK",
      results,
    };
    res.end(JSON.stringify(resp));
  } catch (error) {
    console.log(error);
    basicErrorHandler(res);
  }
}
async function updateOrder(req, res) {
  try {
    const id = req.url.split("/")[2];
    const data = await getBodyData(req);
    const { book_id, price, address } = JSON.parse(data);
    const query = "UPDATE orders SET book_id=? ,price=?,address=? WHERE id=?";
    const values = [book_id, price, address, id];
    const results = await new Promise((resolve, reject) => {
      pool.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    const resp = {
      status: "OK",
      message: "Order is updated",
    };
    res.end(JSON.stringify(resp));
  } catch (error) {
    console.log(error);
    basicErrorHandler(res);
  }
}
async function deleteOrder(req, res) {
  try {
    const id = req.url.split("/")[2];
    const query = "DELETE from orders  WHERE id=?";
    const results = await new Promise((resolve, reject) => {
      pool.query(query, id, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    const resp = {
      status: "OK",
      message: "Order is deleted",
    };
    res.end(JSON.stringify(resp));
  } catch (error) {
    console.log(error);
    basicErrorHandler(res);
  }
}

module.exports = {
  getOrders,
  getOrderByID,
  createOrder,
  updateOrder,
  deleteOrder,
};
