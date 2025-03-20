class ProductController {
  constructor(productService) {
    this.productService = productService;
  }
  async getProductById(req, res) {
    const product = await this.productService.getProductbyId(req.params.id);
    res.status(200).json(product); // Send product details
  }
  async getAllProducts(req, res) {
    let { page, limit } = req.query; // Get from query parameters

    // Set default values if not provided
    page = parseInt(page) || 1; // Default to page 1
    limit = parseInt(limit) || 10; // Default limit of 10
    const order = req.query.order || "ASC";
    const offset = (page - 1) * limit; // Calculate offset

    const products = await this.productService.getAllProducts({
      limit,
      offset,
      order,
    });
    res.status(200).json(products); // Send all products
  }
  async createProduct(req, res) {
    const { name, description, price, stock } = req.validData; // Now it's safe to destructure
    const newProduct = await this.productService.createProduct({
      name,
      description,
      price,
      stock,
    });
    res
      .status(201)
      .json({ id: newProduct, message: "Product created successfully" });
  }
  async updateProduct(req, res) {
    const { name, description, price, stock } = req.validData;
    const updatedProduct = await this.productService.updateProduct(
      { name, description, price, stock },
      req.params.id
    );
    res.status(200).json(updatedProduct); // Send updated product
  }
  async deleteProduct(req, res) {
    await this.productService.deleteProduct(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  }
}

module.exports = ProductController;
