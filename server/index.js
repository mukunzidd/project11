import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const todos = [
  {
    id: 1,
    title: 'some title',
    completed: false,
    priority: 3,
  },
  {
    id: 2,
    title: 'some title',
    completed: false,
    priority: 2,
  },
];
const app = express();
app.use(express.json());

app.get('/status', (req, res) => {
  res.send({ message: 'Hello From PROJECT11' });
});

app.get('/todos', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Retrieved all todos',
    data: todos,
  });
});

app.get('/todos/:id', (req, res) => {
  const matchTodo = todos.find(todo => todo.id === parseInt(req.params.id, 10));
  if (matchTodo) {
    res.status(200).json({
      status: 200,
      message: 'Fetched todo successful',
      data: matchTodo,
    });
  }
  res.sendStatus(404);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find(todo => todo.id === id);
  todos.splice(todos.indexOf(todo), 1);
  res.sendStatus(204);
});

// HOMEWORK: solved below

app.put('/todos/:id', (req, res) => {
  const matchTodo = todos.find((todo) => todo.id === parseInt(req.params.id, 10));

  if (!matchTodo) {
    res.status(404).json({
      status: 404,
      error: 'Todo not found',
    });
  }
  const index = todos.indexOf(matchTodo);

  const { body } = req;

  const updatedTodo = {
    id: parseInt(body.id, 10) || matchTodo.id,
    title: body.title || matchTodo.title,
    completed: body.completed || matchTodo.completed,
    priority: body.priority || matchTodo.priority,
  };

  todos.splice(index, 1, updatedTodo);

  res.status(200).json({
    status: 200,
    message: 'Todo updated successfully',
    data: todos[index],
  });
});

app.post('/todos', (req, res) => {
  const todo = {
    id: parseInt(req.body.id, 10),
    title: req.body.title,
    priority: parseInt(req.body.priority, 10),
    completed: req.body.completeds,
  };

  todos.push(todo);
  res.status(201).json({
    status: 201,
    message: 'Todo successfully created',
    data: todo,
  });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on PORT: ${process.env.PORT}`);
});
