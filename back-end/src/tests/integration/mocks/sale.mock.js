const saleReqBodyMock = {
  userId: 3,
  sellerId: 2,
  totalPrice: '25.00',
  deliveryAddress: 'Rua teste',
  deliveryNumber: '123',
  products: [
    {
      id: 2,
      quantity: 2,
    },
  ],
};

const saleResponseMock = {
  id: 1,
};

const saleMock = { dataValues: saleResponseMock };

const saleByIdMock = {
  datavalues: {
  id: 1,
  status: 'Pendente',
  ...saleReqBodyMock,
} };

const allSalesByUserMock = [saleByIdMock];

module.exports = {
  saleReqBodyMock,
  saleResponseMock,
  saleMock,
  allSalesByUserMock,
  saleByIdMock,
};
