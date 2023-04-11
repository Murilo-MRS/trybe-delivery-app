const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { Product } = require('../../database/models');

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../api/app');

describe('Teste rota Products', function () {
  const productMock = {
    id: 1,
    name: 'Product Test',
    price: 20.99,
    urlImage: 'teste',
  };

  before(async function () {
    sinon
      .stub(Product, 'findOne')
      .resolves(productMock);
  });

  it('SUCESSO - retorna todos produtos', async function () {
    // Arrange
    // Act
    const chaiHttpResponse = await chai.request(app).get('/customer/products').send({});
    // Assert
    expect(chaiHttpResponse).to.have.status(200);
  });
});