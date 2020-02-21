// TODO: move to Factory
const User = require('../models/user');
const queries = require('../repositories/queries');
const { initDB } = require('../../../config/db');

describe('findUsers', () => {
  before(() => initDB('mongodb://localhost/express-todo-test'));

  beforeEach(() => User.create({
    email: 'test@com.pl',
    password: '123',
  }));

  it('should return ', () => {
    return queries.findUserByEmail('test@com.pl')
      .then((user) => {
        expect(user.email).to.equal('test@com.pl');
      });
  });
});
