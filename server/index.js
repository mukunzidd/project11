import express from 'express';
import dotenv from 'dotenv';
import todoRoute from './routes/todoRoute';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/status', (req, res) => {
  res.send({ message: 'Hello From PROJECT11' });
});

// HOMEWORK: create a route to modify one todo
app.use('/todos', todoRoute);
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on PORT: ${process.env.PORT}`);
});

export default app;
