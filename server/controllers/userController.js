const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View articles
exports.view = (req, res) => {
  // article the connection
  connection.query('SELECT * FROM article ORDER BY id DESC', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from article table: \n', rows);
  });
}

// Find article by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // article the connection
  connection.query('SELECT * FROM article WHERE user_id LIKE ? OR title LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from article table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-user');
}

// Add new article
exports.create = (req, res) => {
  const { user_id, title, content } = req.body;
  let searchTerm = req.body.search;

  // article the connection
  connection.query('INSERT INTO article SET user_id = ?, title = ?, content = ?', [user_id, title,content], (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'User article successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from article table: \n', rows);
  });
}


// Edit article
exports.edit = (req, res) => {
  // article the connection
  connection.query('SELECT * FROM article WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from article table: \n', rows);
  });
}


// Update article
exports.update = (req, res) => {
  const { user_id, title, content, phone, comments } = req.body;
  // article the connection
  connection.query('UPDATE article SET user_id = ?, title = ?, content = ? WHERE id = ?', [user_id, title, content, req.params.id], (err, rows) => {

    if (!err) {
      // article the connection
      connection.query('SELECT * FROM article WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          res.render('edit-user', { rows, alert: `${user_id} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from article table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from article table: \n', rows);
  });
}

// Delete article
exports.delete = (req, res) => {

  // Delete a record

  // article the connection
   connection.query('DELETE FROM article WHERE id = ?', [req.params.id], (err, rows) => {

     if(!err) {
       res.redirect('/admin/');
     } else {
       console.log(err);
     }
     console.log('The data from article table: \n', rows);

   });

}

// View articles
exports.viewall = (req, res) => {

  // article the connection
  connection.query('SELECT * FROM article WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from article table: \n', rows);
  });

}
