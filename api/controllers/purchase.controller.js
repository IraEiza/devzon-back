const Purchase = require('../models/purchase.model');
const User = require('../models/user.model')
const Product = require('../models/product.model')


// Get all purchases
const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.findAll({
      include: [{
        model: User,
        attributes: ['name', 'email', 'address']
      },
      {
        model: Product,
        as: "products",
        attributes: ['name', 'description', 'price',  "image"]
      }
    ]
    });
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Error getting purchases', error: error.message });
  }
};

// Get a single purchase by ID
const getOnePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await Purchase.findByPk(id, {
      include: [{
        model: User,
        attributes: ['name', 'email', 'address']
      }]
    });
    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ message: 'Error getting the purchase', error: error.message });
  }
};

// Create a new purchase
const createPurchase = async (req, res) => {
  try {
    const { productIds } = req.body;
    const userId = res.locals.user.id;

    const products = await Product.findAll({
      where: {
        id: productIds
      }
    });

    const total = products.reduce((acc, prod) => acc + prod.price, 0)
    
    const newPurchase = await Purchase.create({
      total,
      paid: true,
      paymentDate: new Date(),
      userId
    });

    await newPurchase.addProducts(products);
    newPurchase.setDataValue('products', products);

    res.status(201).json(newPurchase);
  } catch (error) {
    res.status(500).json({ message: 'Error creating new purchase', error: error.message });
  }
};

// Update a purchase
const updatePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const { total, paid, paymentDate } = req.body;
    const purchase = await Purchase.findByPk(id, {
      include: [{
        model: User,
        attributes: ['name', 'email', 'address']
      }]
    });
    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    purchase.total = total;
    purchase.paid = paid;
    purchase.paymentDate = paymentDate;
    await purchase.save();

    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ message: 'Error updating purchase', error: error.message });
  }
};

// Delete a purchase
const deletePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await Purchase.findByPk(id, {
      include: [{
        model: User,
        attributes: ['name', 'email', 'address']
      }]
    });
    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }
    await purchase.destroy();
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting purchase', error: error.message });
  }
};

// Purchase Controller

const getMyPurchases = async (req, res) => {
  try {
    const userId = res.locals.user.id;

    if (!userId) {
      return res.status(403).json({ message: 'User ID not provided' });
    }

    const purchases = await Purchase.findAll({
      where: { userId: userId },
      include: {
        model: Product,
        as: "products",
        attributes: ['name', 'description', 'price',  "image"]
      }
    });

    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user purchases', error: error.message });
  }
};


module.exports = {
  getAllPurchases,
  getOnePurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
  getMyPurchases
}