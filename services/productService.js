class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async findProductbyId(productId) {
    const productFound = this.productRepository.findById(productId);

    if (!productFound) {
      throw new Error("Product not found");
    }
    return productFound;
  }
  async findAllProducts({ limit, offset, order }) {
    return this.productRepository.findAllProducts({
      limit,
      offset,
      order,
    });
  }
  async createProduct(newProduct) {
    return this.productRepository.createProduct(newProduct);
  }
  async updateProduct(productData, productId) {
    return await this.productRepository.updateProduct(productData, productId);
  }
  async deleteProduct(productId) {
    const deletedProduct = await this.productRepository.deleteProductById(
      productId
    );
    if (deletedProduct === 0) {
      throw new Error("product not found");
    }
    return deletedProduct;
  }
}
module.exports = ProductService;
