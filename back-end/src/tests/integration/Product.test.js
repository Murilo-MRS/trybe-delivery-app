const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { Product } = require('../../database/models');
const { productResponseMock, productIdResponse } = require('./mocks/product.mock');

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../api/app');

describe('Teste rota Products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('SUCESSO - retorna todos produtos', async function () {
    // Arrange
    sinon.stub(Product, 'findAll').resolves(productResponseMock);
    // Act
    const chaiHttpResponse = await chai.request(app).get('/customer/products');
    // Assert
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(productResponseMock);
  });

  it('SUCESSO - retorna um produto por id', async function () {
    // Arrange
    sinon.stub(Product, 'findOne').resolves(productIdResponse);
    // Act
    const chaiHttpResponse = await chai.request(app).get('/customer/products/1');
    // Assert
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(productIdResponse);
  });

  it('EXCESSÃO - produto com id inexistente', async function () {
    // Arrange
    sinon.stub(Product, 'findOne').resolves(null);
    // Act
    const chaiHttpResponse = await chai.request(app).get('/customer/products/1');
    // Assert
    expect(chaiHttpResponse).to.have.status(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Not found' });
  });
});