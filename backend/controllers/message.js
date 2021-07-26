const db = require("../db/DB");

exports.getALL = (req, res, next) => {
  let sql = "SELECT * FROM `message`";
  let query = db.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result).status(201);
    //revoi un tableau [] et on peut for dessus // .length
  });
};
exports.getOne = (req, res, next) => {
  let sql = `SELECT * FROM message WHERE id = "${req.params.id}"`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result).status(201);
  });
};

exports.postMessage = (req, res, next) => {
  let sql = "INSERT INTO message SET ?";
  let message = {
    userid: req.body.userid,
    content: req.body.content,
  };
  let query = db.query(sql, message, (err, result) => {
    if (err) throw err;
    res.send(result).status(201);
  });
};

exports.putLike = (req, res, next) => {
  let change = req.body;

  let sql = `UPDATE message SET nbrLike='${change.nbrLike}',  nbrDisLike = '${
    change.nbrDisLike
  }', userLike = '${JSON.stringify(
    change.userLike
  )}', userDisLike = '${JSON.stringify(change.userDisLike)}' WHERE id = ${
    req.params.messageid
  }`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("result").status(201);
  });
};
// get for user
exports.getALLuser = (req, res, next) => {
  let sql = `SELECT * FROM message WHERE userid IN("${req.params.user}") AND id IN ("${req.params.id}")  `;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result).status(201);
  });
};
exports.getAllUserLke = (req, res, next) => {
  let sql = `SELECT * FROM message WHERE userLike LIKE ("[%${req.params.user}%]"); `;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result).status(201);
  }); 
};
exports.getALLuserDisLke = (req, res, next) => {
  let sql = `SELECT * FROM message WHERE userDisLike LIKE ("[%${req.params.user}%]"); `;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result).status(201);
  }); 
};
exports.dellALLuser = (req, res, next) => {
  // console.log(req.body.userID);
  let sql = `DELETE FROM message WHERE userid =${req.body.userID}`
  db.query(sql,(err,result)=>{
    if (err) throw err;
    res.send(result)
  })
}
