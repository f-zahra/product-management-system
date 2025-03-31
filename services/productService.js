class ProductService {
  constructor(productRepository, transactionHandler) {
    this.productRepository = productRepository;
    this.transactionHandler = transactionHandler;
  }

  async getProductbyId(productId) {
    return await this.productRepository.findProductById(productId);
  }
  async getAllProducts(queryOptions) {
    return this.productRepository.findAllProducts(queryOptions);
  }
  async createProduct(newProductData) {
    return await this.transactionHandler(async (t) => {
      await this.productRepository.saveNewProduct(newProductData);
    });
  }
  async updateProduct(productData, productId) {
    return await this.productRepository.updateProduct(productData, productId);
  }
  async deleteProduct(productId) {
    const deletedProduct = await this.productRepository.deleteProductById(
      productId
    );

    return deletedProduct;
  }
}
module.exports = ProductService;
