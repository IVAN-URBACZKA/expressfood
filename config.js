// Connexion à la base de données mysql

const express = require('express');

const cors = require('cors');

var mysql = require('mysql');


const app = express();

const SELECT_ALL_CLIENT_QUERY = 'SELECT * FROM client';

const SELECT_ALL_PLAT_QUERY = 'SELECT * FROM plat';



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hercule",
  database:'express_food'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
});


app.use(cors());



app.get('/', (req,res) => {
 res.send('go /client')
})

app.get('/client/add' , (req,res) => {

  const { civilite , nom , prenom , email } = req.query;
  const INSERT_CLIENT_QUERY = `INSERT INTO client (civilite , nom , prenom , email) VALUES ('${civilite}','${nom}', '${prenom}' , '${email}' )`
  con.query(INSERT_CLIENT_QUERY, (err,results) => {
    if(err) {
      return res.send(err)
    }
    else {
      return res.send('add ok');
    }
  });
});







app.get('/client', (req,res) => {

  con.query(SELECT_ALL_CLIENT_QUERY, (err, results) => {

    if(err) {

  return res.send(err);
    }
    else {
      return res.json({
        data: results
      })
    }

  });

});

app.get('/commande', (req,res) => {

  con.query(SELECT_ALL_PLAT_QUERY, (err,results) => {

    if(err) {

      return res.send(err)

    }

    else {
      return res.json({
        data: results
      })
    }

  });


});


app.listen(4000, () => {
  console.log('ok port 4000')
} );






