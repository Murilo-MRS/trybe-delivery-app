const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { User } = require('../../database/models');

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../api/app');

describe('Teste rota Login', function () {
  const userLoginMock = {
    id: 1,
    name: 'User Test',
    email: 'teste@teste.com',
    password: '123456',
  };

  before(async function () {
    sinon
      .stub(User, 'findOne')
      .resolves(userLoginMock);
  });

  it('SUCESSO - Login com valores válidos', async function () {
    // Arrange
    // Act
    const chaiHttpResponse = await chai.request(app).post('/login').send({});
    // Assert
    expect(chaiHttpResponse).to.have.status(200);
  });
});
