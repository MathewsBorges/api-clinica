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

app.get("/paciente", (req, res) => {
  connection.query("select * from pacientes", (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/paciente/:id", (req, res) => {
  connection.query(
    "SELECT * FROM pacientes WHERE id = ?",
    [req.params.id],
    (error, results, fields) => {
      if (error) throw error;
      res.send(results[0]);
    }
  );
});

app.get("/paciente/pacientes/:email", (req,res) =>{
connection.query("select * from pacientes where email = ?", [req.params.email], (error, results, fields)=>{
if(error) throw error;
  res.send(results[0]);
})
})

app.get("/paciente/:email/:senha", (req, res) => {
  connection.query(
    "select * from pacientes where email = ? and password = ?",
    [req.params.email, req.params.senha],
    (error, results, fields) => {
      if (error) throw error;
      res.send(results[0]);
    }
  );
});

app.get("/agendamento", (req, res) => {
  connection.query("select * from agendamentos", (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/agendamento/:id", (req, res) => {
  connection.query(
    "select * from agendamentos where paciente=?",
    [req.params.id],
    (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.get("/agendamento/:data/:horario/:medico", (req, res) => {
  connection.query(
    "select * from agendamentos where data=? and horario=? and medico=?",
    [req.params.data, req.params.horario, req.params.medico],
    (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.post("/paciente", (req, res) => {
  connection.query(
    "INSERT INTO pacientes (nome,idade,endereco,telefone,sexo,email,password,num) values (?,?,?,?,?,?,?,?)",
    [
      req.body.nome,
      req.body.idade,
      req.body.endereco,
      req.body.telefone,
      req.body.sexo,
      req.body.email,
      req.body.password,
      req.body.num,
    ],
    (error, results, fields) => {
      if (error) throw error;
      res.send("Dados inseridos com sucesso!");
    }
  );
});

app.post("/agendamento", (req, res) => {
  connection.query(
    "insert into agendamentos (data, horario, paciente, medico) values (?,?,?,?)",
    [req.body.data, req.body.horario, req.body.paciente, req.body.medico],
    (error, results, fields) => {
      if (error) throw error;
      res.send("Consulta Agendada com Sucesso");
    }
  );
});

app.put("/paciente/:id", (req, res) => {
  const id = req.params.id
  const sql ="update pacientes set nome=?, idade=?,endereco=?,telefone=?,sexo=?,password=? where id=?";
  const { nome, idade, endereco, telefone, sexo, password} = req.body;
  connection.query(sql, [nome,idade,endereco,telefone,sexo,password, id], (error, results,fields)=>{
    if(error) throw error;
    res.send("Cadastro editado com Sucesso");
  });
});

app.put("/paciente/:id/consulta", (req, res) =>{
  const id = req.params.id;
  const sql = "update pacientes set num=num+1 where id=?"
  connection.query(sql, [id], (error,fields, results) =>{
    if(error) throw error;
    res.send("Consulta Adicionada ao Paciente");
  })

})

app.put("/paciente/:id/less", (req, res) =>{
  const id = req.params.id;
  const sql = "update pacientes set num=num-1 where id=?"
  connection.query(sql, [id], (error,fields, results) =>{
    if(error) throw error;
    res.send("Consulta Adicionada ao Paciente");
  })

})

app.delete("/paciente/:id", (req, res) => {
  connection.query(
    "DELETE FROM pacientes WHERE id = ?",
    [req.params.id],
    (error, results, fields) => {
      if (error) throw error;
      res.send("Registro excluído com sucesso!");
    }
  );
});

app.delete("/agendamento/:id", (req, res) => {
  connection.query(
    "delete from agendamentos where id = ?",
    req.params.id,
    (error, results, fields) => {
      if (error) throw error;
      res.send("Consulta apagada com sucesso");
    }
  );
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
