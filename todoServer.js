const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000;

app.use(bodyParser.json());

let todos =[]

app.get('/todos', (req, res) => {
  res.json(todos)
})

app.post('/todos', (req, res) => {
    const newTodo = {
        id:Math.floor(Math.random() * 10000000),
        title: req.body.title,
        description:req.body.description
    }
    todos.push(newTodo);
    res.status(201).json(newTodo);
  })

app.get('/todos/:id', (req, res) => {
    const todo= todos.find(todo => todo.id === parseInt(req.params.id));
    if(!todo){
        res.status(401).send("Id doesn't exist");
    }else{
        res.json(todo);
    }
  })  

  app.put('/todos/:id', (req, res) => {
    const todoId= todos.find(todo => todo.id === parseInt(req.params.id));
    if(todoId === -1){
        res.status(401).send("Id doesn't exist");
    }else{
        const updated={
            id:req.params.id,
            title: req.body.title,
            description:req.body.description
        }
        todos.splice(todoId,updated);
        res.send(todos);
    }
  })  

  app.delete('/todos/:id', (req, res) => {
    const todoId= todos.find(todo => todo.id === parseInt(req.params.id));
    if(todoId === -1){
        res.status(401).send("Id doesn't exist");
    }else{
       todos.splice(todoId,1);
       res.status(200).send();
    }
  }) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})