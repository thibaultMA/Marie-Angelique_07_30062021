const db = require("../db/DB");

exports.test = (req, res, next) => {
  let sql = `SELECT MAX(id),MIN(id) FROM message`;
  db.query(sql, (err, result) => {
    let max = "MAX(id)";
    if (err) throw err;
    const str = JSON.stringify(result[0]);
    const m = str.split(`,"`);

    const Max = m[0];
    const min = m[1];

    let finMax = Max.length - 11;
    let finMin = min.length - 10;

    let nbrMax = Max.substr(11, finMax);
    let nbrMin = min.substr(9, finMin);

    let nbr = {
      max: nbrMax,
      min: nbrMin,
    };
    res.send(nbr).status(201);
    //revoi un tableau [] et on peut for dessus // .length
  });
};
