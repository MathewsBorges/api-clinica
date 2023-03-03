const express = require("express");
const mysql = require("mysql2");
const app = express();

const connection = mysql.createConnection({
  host: "db4free.net",
  user: "******",
  password: "******",
  database: "******",
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

app.get("/agendamento", function (req, res) {
  connection.query(
    "select * from agendamentos",
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.get("/agendamento/:id", function (req, res) {
  connection.query(
    "select * from agendamentos where paciente=?",[req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.get("/agendamento/:data/:horario/:medico", function (req, res) {
  connection.query(
    "select * from agendamentos where data=? and horario=? and medico=?",[req.params.data, req.params.horario, req.params.medico],
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
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

app.post("/agendamento", function (req,res){
  connection.query('insert into agendamentos (data, horario, paciente, medico) values (?,?,?,?)',[req.body.data, req.body.horario, req.body.paciente, req.body.medico], function(error, results, fields){
    if(error) throw error;
    res.send("Consulta Agendada com Sucesso")
  })
})

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

app.delete("/agendamento/:id", function(req, res){
  connection.query("delete from agendamentos where id = ?", req.params.id, function (error, results, fields){
    if(error) throw error
    res.send("Consulta apagada com sucesso")
  })
})

app.listen(3000, function () {
  console.log("Servidor rodando na porta 3000");
});
