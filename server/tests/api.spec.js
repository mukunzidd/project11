import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import app from '../index';

chai.use(chaiHTTP);

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
});
