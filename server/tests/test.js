import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('', () => {
  it('GET /todos', () => {
    chai.request(app)
  });
});
