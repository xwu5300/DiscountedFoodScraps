var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'priceline'
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('database connected');
  }
});

// var selectAll = function(callback) {
//   connection.query('SELECT * FROM items', function(err, results, fields) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// };

// module.exports.selectAll = selectAll;

module.exports = connection;
