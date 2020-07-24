const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db = new sqlite3.Database(path.join(__dirname, 'db.sqlite3'), sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to database.');
});



function createRow(table, values) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${table} WHERE address = ?`, values[0],
      function (err, rows) {
        if (err) reject(err);
        if (rows.length > 0) {
          resolve(rows[0].Slug);
        } else {
          db.run(`INSERT into ${table} (address,slug,created) VALUES (?,?,?)`, values,
            function (err, result) {
              if (err) reject(err);
              //console.log("DB Inserted")
              resolve(values[1]);
            });
        }
      });
  });
};

function readTable(table, values) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${table} WHERE slug = ?`, values[0],
      function (err, rows) {
        if (err) reject(err);
        resolve(rows[0]);
      });
  });
}

module.exports = {
  createRow,
  readTable
};
