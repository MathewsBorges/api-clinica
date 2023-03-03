const express = require("express");
const mysql = require("mysql2");
const app = express();

const connection = mysql.createConnection({
  host: "db4free.net",
  user: "clinicamedica",
  password: "clinicamedica",
  database: "topicos_clinica",
});

app.use(express.json());

app.get("/paciente", function (req, res) {
  connection.query(
    "select * from pacientes",
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.get("/paciente/:id", function (req, res) {
  connection.query(
    "SELECT * FROM pacientes WHERE id = ?",
    [req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.send(results[0]);
    }
  );
});

app.post("/paciente", function (req, res) {
  connection.query(
    "INSERT INTO pacientes (nome, email,senha, endereco) values (?,?,?,?)",
    [req.body.nome, req.body.email, req.body.senha, req.body.endereco],
    function (error, results, fields) {
      if (error) throw error;
      res.send("Dados inseridos com sucesso!");
    }
  );
});

app.delete("/paciente/:id", function (req, res) {
  connection.query(
    "DELETE FROM pacientes WHERE id = ?",
    [req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.send("Registro excluído com sucesso!");
    }
  );
});

app.listen(3000, function () {
  console.log("Servidor rodando na porta 3000");
});
