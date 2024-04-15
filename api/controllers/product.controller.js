const Product = require('../models/product.model');

// Product - CRUD

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const { name, minPrice, maxPrice } = req.query;
    let conditions = {};
    if (name) {
      conditions.name = { [Op.iLike]: `%${name}%` }; // Filtra por nombre (insensible a mayúsculas)
    }
    if (minPrice) {
      conditions.price = { ...conditions.price, [Op.gte]: parseFloat(minPrice) }; // Filtra por precio mínimo
    }
    if (maxPrice) {
      conditions.price = { ...conditions.price, [Op.lte]: parseFloat(maxPrice) }; // Filtra por precio máximo
    }

    const products = await Product.findAll({
      where: conditions
    });
    res.json(products);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving products', error: error.message });
  }
};

// Get Product By Id
const getOneProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving product', error: error.message });
  }
};

// Create One Product
const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const newProduct = await Product.create({
      name,
      price,
      description,
      stock
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send({ message: 'Error creating product', error: error.message });
  }
};

// Update One Product
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, description } = req.body;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;

    await product.save();

    res.json(product);

  } catch (error) {
    res.status(500).send({ message: 'Error updating product', error: error.message });
  }
};

// Delete One Product
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    await product.destroy();
    res.json(product);
  } catch (error) {
    res.status(500).send({ message: 'Error deleting product', error: error.message });
  }
};




module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct
}