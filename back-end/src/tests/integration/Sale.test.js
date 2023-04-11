const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const {
  saleReqBodyMock,
  saleResponseMock,
  saleMock,
  allSalesByUserMock,
  saleByIdMock,
} = require('./mocks/sale.mock');
const { Sale, SaleProduct } = require('../../database/models');

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../api/app');
const { tokenMock } = require('./mocks/login.mock');

describe('Teste rota Sale', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('SUCESSO - Cria sale com valores válidos', async function () {
    // Arrange
    sinon.stub(Sale, 'create').resolves(saleMock);
    sinon.stub(SaleProduct, 'create').resolves();
    // Act
    const chaiHttpResponse = await chai
      .request(app)
      .post('/sales')
      .set('Authorization', tokenMock)
      .send(saleReqBodyMock);
    // Assert
    expect(chaiHttpResponse).to.have.status(201);
    expect(chaiHttpResponse.body).to.be.deep.equal(saleResponseMock);
  });

  it('SUCESSO - lista todas as sales do user customer', async function () {
    // Arrange
    sinon.stub(Sale, 'findAll').resolves(allSalesByUserMock);
    // Act
    const chaiHttpResponse = await chai
      .request(app)
      .get('/customer/3/sales')
      .set('Authorization', tokenMock);
    // Assert
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allSalesByUserMock);
  });

  it('SUCESSO - lista todas as sales do user seller', async function () {
    // Arrange
    sinon.stub(Sale, 'findAll').resolves(allSalesByUserMock);
    // Act
    const chaiHttpResponse = await chai
      .request(app)
      .get('/seller/2/sales')
      .set('Authorization', tokenMock);
    // Assert
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allSalesByUserMock);
  });

  it('SUCESSO - atualiza status da sale', async function () {
    // Arrange
    sinon.stub(Sale, 'findByPk').resolves(saleByIdMock);
    sinon.stub(Sale, 'update').resolves([1]);
    // Act
    const chaiHttpResponse = await chai
      .request(app)
      .patch('/sales/1')
      .set('Authorization', tokenMock)
      .send({ status: 2 });
    // Assert
    expect(chaiHttpResponse).to.have.status(201);
    expect(chaiHttpResponse.body).to.be.deep.equal([1]);
  });

  it('SUCESSO - retorna sale por id', async function () {
    // Arrange
    sinon.stub(Sale, 'findOne').resolves(saleByIdMock);
    // Act
    const chaiHttpResponse = await chai
      .request(app)
      .get('/sales/1')
      .set('Authorization', tokenMock);
    // Assert
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(saleByIdMock);
  });

  it('EXCESSÃO - busca sale com id inexistente', async function () {
    // Arrange
    sinon.stub(Sale, 'findByPk').resolves(null);
    // Act
    const chaiHttpResponse = await chai
      .request(app)
      .patch('/sales/1')
      .set('Authorization', tokenMock)
      .send({ status: 2 });
    // Assert
    expect(chaiHttpResponse).to.have.status(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: 'Sale not found',
    });
  });

  it('EXCESSÃO - com token inexistente', async function () {
    // Arrange
    // Act
    const chaiHttpResponse = await chai
      .request(app)
      .patch('/sales/1')
      .set('Authorization', '')
      .send({ status: 2 });
    // Assert
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: 'Token not found',
    });
  });

  it('EXCESSÃO - com token inválido', async function () {
    // Arrange
    // Act
    const chaiHttpResponse = await chai
      .request(app)
      .patch('/sales/1')
      .set('Authorization', 'token')
      .send({ status: 2 });
    // Assert
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: 'Invalid Token',
    });
  });

  it('EXCESSÃO - erro inesperado', async function () {
    // Arrange
    sinon.stub(Sale, 'findOne').throws(new Error('Internal Error'));
    // Act
    const chaiHttpResponse = await chai.request(app)
      .get('/sales/1').set('Authorization', tokenMock);
    // Assert
    expect(chaiHttpResponse).to.have.status(500);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: 'Internal Error',
    });
  });
});
