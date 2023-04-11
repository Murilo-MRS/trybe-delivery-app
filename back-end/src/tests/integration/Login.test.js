/* eslint-disable sonarjs/no-duplicate-string */
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const { User } = require('../../database/models');
const {
  validUserMock,
  userResponseMock,
  tokenMock,
  loginResponseSuccess,
  registerToken,
  registerResponseMock,
  newUserMock,
  registerResponseSuccess,
  sellersMock,
  tokenAdmin,
  invalidEmail,
  userNotFound,
  userInvalidPassword,
} = require('./mocks/login.mock');
const app = require('../../api/app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Teste rota Login', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('SUCESSO - Login com valores válidos', async function () {
    // Arrange
    sinon.stub(jwt, 'sign').returns(tokenMock);
    sinon.stub(User, 'findOne').resolves(userResponseMock);
    // Act
    const chaiHttpResponse = await chai.request(app).post('/login').send(validUserMock);
    // Assert
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(loginResponseSuccess);
  });

  it('SUCESSO - Register com valores válidos', async function () {
    // Arrange
    sinon.stub(jwt, 'sign').returns(registerToken);
    sinon.stub(User, 'findOne')
      .onFirstCall()
      .resolves(null)
      .onSecondCall()
      .resolves(null);
    sinon.stub(User, 'create').resolves(registerResponseMock);
    // Act
    const chaiHttpResponse = await chai.request(app).post('/register').send(newUserMock);
    // Assert
    expect(chaiHttpResponse).to.have.status(201);
    expect(chaiHttpResponse.body).to.be.deep.equal(registerResponseSuccess);
  });

  it('SUCESSO - Lista todos users com role "seller"', async function () {
    // Arrange
    sinon.stub(User, 'findAll').resolves(sellersMock);
    // Act
    const chaiHttpResponse = await chai.request(app).get('/sellers').send();
    // Assert
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(sellersMock);
  });

  it('SUCESSO - Lista todos users apenas quando logado como admin', async function () {
    // Arrange
    sinon.stub(User, 'findAll').resolves(sellersMock);
    // Act
    const chaiHttpResponse = await chai.request(app)
      .get('/users').set('Authorization', tokenAdmin);
    // Assert
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(sellersMock);
  });

  it('SUCESSO - Deleta user apenas quando logado como admin', async function () {
    // Arrange
    sinon.stub(User, 'findOne').resolves(userResponseMock);
    sinon.stub(User, 'destroy').resolves();
    // Act
    const chaiHttpResponse = await chai.request(app)
      .delete('/admin/delete/3').set('Authorization', tokenAdmin);
    // Assert
    expect(chaiHttpResponse).to.have.status(204);
  });

  it('EXCESSÃO - login com email inválido', async function () {
    // Arrange
    // Act
    const chaiHttpResponse = await chai.request(app)
      .post('/login').send(invalidEmail);
    // Assert
    expect(chaiHttpResponse).to.have.status(422);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: '"email" must be a valid email' });
  });

  it('EXCESSÃO - login com user inexistente', async function () {
    // Arrange
    sinon.stub(User, 'findOne').resolves(null);
    // Act
    const chaiHttpResponse = await chai.request(app)
      .post('/login').send(userNotFound);
    // Assert
    expect(chaiHttpResponse).to.have.status(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Not found' });
  });

  it('EXCESSÃO - login com user com password inválida', async function () {
    // Arrange
    sinon.stub(User, 'findOne').resolves(userResponseMock);
    // Act
    const chaiHttpResponse = await chai.request(app)
      .post('/login').send(userInvalidPassword);
    // Assert
    expect(chaiHttpResponse).to.have.status(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'email or password is invalid' });
  });

  it('EXCESSÃO - deletar user inexistente', async function () {
    // Arrange
    sinon.stub(User, 'findOne').resolves(null);
    // Act
    const chaiHttpResponse = await chai.request(app)
      .delete('/admin/delete/3').set('Authorization', tokenAdmin);
    // Assert
    expect(chaiHttpResponse).to.have.status(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Not found' });
  });

  it('EXCESSÃO - registrar user já existente', async function () {
    // Arrange
    sinon.stub(User, 'findOne')
      .onFirstCall()
      .resolves(registerResponseMock)
      .onSecondCall()
      .resolves(registerResponseMock);
    // Act
    const chaiHttpResponse = await chai.request(app)
      .post('/register').send(newUserMock);
    // Assert
    expect(chaiHttpResponse).to.have.status(409);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'User already registered' });
  });

  it('EXCESSÃO - registrar com dados inválidos', async function () {
    // Arrange
    // Act
    const chaiHttpResponse = await chai.request(app)
      .post('/register').send({
        name: '',
        email: 'cicrana@deliveryapp.com',
        password: '1234567',
        role: 'customer',
      });
    // Assert
    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.be.deep
      .equal({ message: '"name" is not allowed to be empty' });
  });

  it('EXCESSÃO - com token admin inexistente', async function () {
    // Arrange
    // Act
    const chaiHttpResponse = await chai.request(app)
      .delete('/admin/delete/3').set('Authorization', '');
    // Assert
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found' });
  });

  it('EXCESSÃO - com token inválido', async function () {
    // Arrange
    // Act
    const chaiHttpResponse = await chai.request(app)
      .delete('/admin/delete/3').set('Authorization', 'token');
    // Assert
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: 'Invalid Token',
    });
  });

  it('EXCESSÃO - com token que não pertence a admin', async function () {
    // Arrange
    // Act
    const chaiHttpResponse = await chai.request(app)
      .delete('/admin/delete/3').set('Authorization', tokenMock);
    // Assert
    expect(chaiHttpResponse).to.have.status(403);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: 'Forbidden',
    });
  });
});
