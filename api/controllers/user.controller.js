const User = require("../models/user.model")

const getUserByToken = async (req, res) => {
  try {

    const userJSON = res.locals.user.toJSON()
    delete userJSON.password

    return res.status(200).json({ user: userJSON });
  } catch (error) {
    return res.status(500).json({
      message: 'Error searching user',
      description: error.message,
    });
  }
};

module.exports = {
  getUserByToken
}