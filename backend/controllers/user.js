const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/DB");

exports.addpost = (req, res, next) => {
  let post = req.body;
  bcrypt
    .hash(post.password, 10)
    .then((hash) => {
      const user = {
        name: post.name,
        email: post.email,
        password: hash,
      };
      let sql = "INSERT INTO users SET ?";
      console.log(sql,user);
      db.query(sql, user, (err, result) => {
        if (!!err) {
          res.status(501).send({ err });
        } else {
          res.status(201).json(result);
        }
      });
    })
    .catch((error) => res.status(501).json({ error }));
};

exports.getAll = (req, res, next) => {
  let sql = "SELECT * FROM `users`";
  let query = db.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
    //revoi un tableau [] et on peut for dessus // .length
  });
};
exports.getOneid = (req, res, next) => {
  let sql = `SELECT * FROM users WHERE id = "${req.params.id}"`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};
exports.getOneEmail = (req, res, next) => {
  let sql = `SELECT * FROM users WHERE email = "${req.params.email}"`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};
exports.updateOne = (req, res, next) => {
  let change = req.body;
  // console.log(change);
  let sql = `UPDATE users SET email = '${change.email}' , name = '${change.userName}'  WHERE id = '${req.params.id}'`;
  // console.log(sql);
  let query = db.query(sql, (err, result) => {
    if (err) throw err;

    res.send(change);
  });
};

exports.deleteOne = (req, res, next) => {
  let sql = `DELETE FROM users WHERE id = ${req.body.userID}`;
 
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("user delete");
  });
};
exports.login = (req, res, next) => {
  let userEmail = req.body.email;
  let password = req.body.password;
  let sql = `SELECT * FROM users WHERE email = "${userEmail}"`;
  let query = db.query(sql, (err, result) => {
    if (result.length != 0) {
      bcrypt
        .compare(password, result[0].password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: result[0].id,
            token: jwt.sign({ userId: result[0].id }, "key_test_ok", {
              expiresIn: "24",
            }),
          });
        })
        .catch((error) =>
          res.status(500).json({ error: "compare echec", error })
        );
    } else {
      return res.status(401).json({ error: "Utilisateur non trouvé !" });
    }
  });
};
