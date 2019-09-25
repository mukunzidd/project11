import express from 'express';

const router = express.Router();

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

router.get('/', (req, res) => {
  return res.status(200).json({
    status: 200,
    message: 'Retrieved all todos',
    data: todos,
  });
});

router.get('/:id', (req, res) => {
  const matchTodo = todos.find((todo) => todo.id === parseInt(req.params.id, 10));
  if (matchTodo) {
   return res.status(200).json({
      status: 200,
      message: 'Fetched todo successful',
      data: matchTodo,
    });
  }
  res.sendStatus(404);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find((t) => t.id === id);
  todos.splice(todos.indexOf(todo), 1);
  return res.sendStatus(204);
});
router.post('/', (req, res) => {
  // getting current id of todos array
  const currentId = todos.length + 1;
  const todo = {
    id: currentId,
    title: req.body.title,
    priority: parseInt(req.body.priority, 10),
    completed: req.body.completeds,
  };

  todos.push(todo);
 return res.status(201).json({
    status: 201,
    message: 'Todo successfully created',
    data: todo,
  });
});
router.patch('/:todoId', (req, res)=>{
  const todoId = parseInt(req.params.todoId, 10);
  const updatedTodo = req.body;

  for(let todo of todos){
    if(todo.id === todoId){
      todo.id        = parseInt(updatedTodo.id, 10)    || todo.id;
      todo.title     = updatedTodo.title || todo.title;
      todo.completed = updatedTodo.completed || todo.completed;
      todo.priority  = updatedTodo.priority || todo.priority;

      return res.status(200).json({
        status: 200,
        message: 'todo updated successfully',
        data: todo
      });
    }
  }

   return res.status(404).json({
      status: 404,
      message: 'No found with the given id'
    });
});
export default router;
