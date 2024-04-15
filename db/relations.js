const User = require('../api/models/user.model')
const Product = require('../api/models/product.model')
const Purchase = require('../api/models/purchase.model')
const PurchaseProduct = require('../api/models/purchase_product.model')

function addRelations() {
  try {

    //ONE TO MANY - User & Purchase
    User.hasMany(Purchase, {onDelete: 'SET NULL'})
    Purchase.belongsTo(User, {onDelete: 'SET NULL'})

    //MANY TO MANY
    User.belongsToMany(Product, {through: 'fav_products', as: 'fav'})
    Product.belongsToMany(User, {through: 'fav_products', as: 'fav'})

    //MANY TO MANY
    Purchase.belongsToMany(Product, {
      through: PurchaseProduct,
      as: 'Products'
    });
    Product.belongsToMany(Purchase, {
      through: PurchaseProduct,
      as: 'Purchases'
    });
  
    // Asegurando que onDelete CASCADE esté configurado en el modelo de unión
    PurchaseProduct.belongsTo(Purchase, {
      foreignKey: 'purchaseId',
      onDelete: 'CASCADE'
    });
    PurchaseProduct.belongsTo(Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });


  } catch (error) {
    console.log(error)
  }
}

module.exports = addRelations