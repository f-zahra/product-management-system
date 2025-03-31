const CustomError = require("../customError");

class ProductRepository {
  constructor(productModel) {
    this.productModel = productModel;
  }

  //findByid
  async findProductById(productId) {
    const product = await this.productModel.findByPk(productId);
    //if record not found
    if (!product) {
      const error = new CustomError("Product not found", 404);
      //passed to error handler
      throw error;
    }
    return product.get({ plain: true });
  }
  //findAll
  async findAllProducts(queryOptions = null) {
    const products = await this.productModel.findAll({ queryOptions });
    return products;
  }

  //create
  async saveNewProduct(productData, transaction = null) {
    //skip "find if record exist" for now because I havent implement any Unique fields

    const newProduct = await this.productModel.create(productData, {
      transaction,
    });
    return newProduct.get({ plain: true });
  }

  //update
  async updateProduct(updatedData, productId) {
    //skip "find if record exist" for now because I havent implement any Unique fields
    const updatedProduct = await this.productModel.update(updatedData, {
      where: {
        id: productId,
      },
    });
    if (!updatedProduct) {
      throw new CustomError("Product not found", 404);
    }
    return updatedProduct;
  }
  //delete
  async deleteProductById(productId) {
    const deletedProduct = await this.productModel.destroy({
      where: { id: productId },
    });
    if (!deletedProduct) {
      throw new CustomError("Product not found", 404);
    }
    return deletedProduct;
  }
}
module.exports = ProductRepository;
