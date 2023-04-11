const productOne = {
  id: 1,
  name: 'Product Test',
  price: 20.99,
  urlImage: 'teste',
};

const productIdResponse = { datavalues: productOne };

const productResponseMock = [{ datavalues: productOne }];

module.exports = {
  productOne,
  productResponseMock,
  productIdResponse,
};
