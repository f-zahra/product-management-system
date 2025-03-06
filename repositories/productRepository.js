const Product = require("../models/product");
const sequelize = require("../db");

class ProductRepository {
  //TODO: db injection

  //findAll
  async findAllProducts({ limit, offset, order }) {
    const products = await Product.findAll({
      limit: limit,
      offset: offset,
      order: [["name", order]],
    });
    return products;
  }
  //findByid
  async findById(productId) {
    const product = await Product.findByPk(productId);
    return product;
  }
  //create
  async createProduct(productData) {
    return await sequelize.transaction(async (t) => {
      const newProduct = await Product.create(productData, { transaction: t });
      return newProduct.get({ plain: true });
    });
  }
  //update
  async updateProduct(updatedData, productId) {
    const updatedProduct = await Product.update(updatedData, {
      where: {
        id: productId,
      },
    });
    return updatedProduct;
  }
  //delete
  async deleteProductById(productId) {
    const deletedProduct = await Product.destroy({
      where: { id: productId },
    });
    return deletedProduct;
  }
}
module.exports = ProductRepository;
