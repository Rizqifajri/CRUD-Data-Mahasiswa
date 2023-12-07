const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mysql = require("mysql");
const db = require("./connection");
const response = require("./response");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  response(200, "API v1 ready to go", "SUCCESS", res);
});

app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM tbl_mahasiswa";
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, "Ok", res);
  });
});

app.get("/mahasiswa/:npm", (req, res) => {
  const npm = req.params.npm;
  const sql = `SELECT * FROM tbl_mahasiswa WHERE npm = ${npm}`;
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, "get detail mahasiswa", res);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { npm, nama_lengkap, kelas, jenis_kelamin } = req.body;
  const sql = `INSERT INTO tbl_mahasiswa (npm, nama_lengkap, kelas, jenis_kelamin) VALUES (${npm}, '${nama_lengkap}', '${kelas}', '${jenis_kelamin}')`;
  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "err", res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, "data add success", res);
    } else {
      console.log("tidak masuk");
    }
  });
});

app.put("/mahasiswa", (req, res) => {
  const { npm, nama_lengkap, kelas, jenis_kelamin } = req.body;
  const sql = `UPDATE tbl_mahasiswa SET nama_lengkap = '${nama_lengkap}', kelas = '${kelas}',jenis_kelamin = '${jenis_kelamin}' WHERE npm = ${npm}`;
  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "err", res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, "Successfully to Update Data", res);
    } else {
      console.log(404, "user not found", "error", res);
    }
  });
});

app.delete("/mahasiswa/:npm", (req, res) => {
  const npm = req.params.npm;
  const sql = "DELETE FROM tbl_mahasiswa WHERE npm = ?";
  db.query(sql, [npm], (err, fields) => {
    if (err) {
      response(500, "invalid", "error", res);
    } else if (fields.affectedRows > 0) {
      const data = {
        isDeleted: fields.affectedRows,
      };
      response(200, data, "Successfully Deleted Data", res);
    } else {
      response(404, "user not found", "error", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


