const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { Sale } = require('../../database/models');
// const { SaleProduct } = require('../../database/models');

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../api/app');

describe('Teste rota Sale', function () {
  const saleMock = {
    id: 1,
    name: 'User Test',
    email: 'teste@teste.com',
    password: '123456',
  };

  before(async function () {
    sinon
      .stub(Sale, 'findOne')
      .resolves(saleMock);
  });

  it('SUCESSO - Login com valores válidos', async function () {
    // Arrange
    // Act
    const chaiHttpResponse = await chai.request(app).get('/customer/1/sales').send({});
    // Assert
    expect(chaiHttpResponse).to.have.status(200);
  });
});