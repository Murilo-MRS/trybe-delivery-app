const userService = require('../Services/User.service');

const login = async (req, res) => {
    const { body } = req;
    const token = await userService.login(body);
    return res.status(200).json({ token });
};

const register = async (req, res) => {
    const { body } = req;
    const user = await userService.register(body);
    return res.status(201).json(user);
};

module.exports = {
  login,
  register,
};
