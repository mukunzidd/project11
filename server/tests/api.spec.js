import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../index';

chai.use(chaiHTTP);
chai.should();

const updatedTodo = {
  id: 2,
  title: 'Get lunch',
  completed: false,
  priority: 2,
};

const createTodo = {
  id: 20,
  title: 'Breakfast',
  completed: false,
  priority: 3,
};

const chaiReq = chai.request(app);

describe('API Root', () => {
  it('Returns API status', () => {
    chaiReq.get('/status').end((err, res) => {
      res.status.should.equals(200);
      expect(res.body).not.to.be.empty;
      res.body.status.should.equals('Project11 Active');
    });
  });
});

describe('Todo Controller', () => {
  it('GET /todos', () => {
    chai
      .request(app)
      .get('/todos')
      .end((err, res) => {
        expect(res.status).to.equals(200);
        expect(res.body.message).to.be.a('string');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data).not.to.be.empty;
        expect(res.body.data[1].id).equals(2);
      });
  });

  it('GET /todos/:id', (done) => {
    const id = 1;
    chai.request(app)
      .get(`/todos/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Fetched todo successful');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('GET /todos/:id with an invalid id', (done) => {
    const id = 100;
    chai.request(app)
      .get(`/todos/${id}`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('DELETE /todos/:id', (done) => {
    const id = 1;
    chai.request(app)
      .delete(`/todos/${id}`)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });

  it('PATCH /todos/:id', (done) => {
    const id = 2;
    chai.request(app)
      .patch(`/todos/${id}`)
      .send(updatedTodo)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'todo updated successfully');
        res.body.data.should.have.property('title', 'Get lunch');
        done();
      });
  });

  it('PATCH /todos/:id with an invalid id', (done) => {
    const id = 100;
    chai.request(app)
      .patch(`/todos/${id}`)
      .send(updatedTodo)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property(
          'message',
          'No found with the given id',
        );
        done();
      });
  });

  it('POST /todos/', (done) => {
    chai.request(app)
      .post('/todos')
      .send(createTodo)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message', 'Todo successfully created');
        res.body.data.should.have.property('id', 20);
        done();
      });
  });
});
