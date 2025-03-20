class ProductRepository {
  constructor(productModel) {
    this.productModel = productModel;
  }

  //findByid
  async findByProductById(productId) {
    const product = await this.productModel.findByPk(productId);
    return product;
  }
  //findAll
  async findAllProducts(queryOptions = null) {
    const products = await this.productModel.findAll({ queryOptions });
    return products;
  }

  //create
  async saveNewProduct(productData, transaction = null) {
    //find if record exist

    const newProduct = await this.productModel.create(productData, {
      transaction,
    });
    return newProduct.get({ plain: true });
  }

  //update
  async updateProduct(updatedData, productId) {
    const updatedProduct = await this.productModel.update(updatedData, {
      where: {
        id: productId,
      },
    });
    return updatedProduct;
  }
  //delete
  async deleteProductById(productId) {
    const deletedProduct = await this.productModel.destroy({
      where: { id: productId },
    });
    return deletedProduct;
  }
}
module.exports = ProductRepository;
