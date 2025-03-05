const ProductRepository = require("../productRepository");
const ProductService = require("../productService");
//call user service
// Create instances of productRepository and productService
const productRepository = new ProductRepository();
//inject repo into service for loose coupling
const productService = new ProductService(productRepository);

exports.getProductById = async (req, res) => {
  const id = req.params.id;
  const product = await productService.findProductbyId(id);
  res.status(200).json(product); // Send product details
};
exports.getAllProducts = async (req, res) => {
  let { page, limit } = req.query; // Get from query parameters

  // Set default values if not provided
  page = parseInt(page) || 1; // Default to page 1
  limit = parseInt(limit) || 10; // Default limit of 10
  const order = req.query.order || "ASC";
  const offset = (page - 1) * limit; // Calculate offset

  const products = await productService.findAllProducts({
    limit,
    offset,
    order,
  });
  res.status(200).json(products); // Send all products
};
exports.createProduct = async (req, res) => {
  const newProduct = await productService.createProduct(req.validData);
  res.status(201).json(newProduct);
};
exports.updateProduct = async (req, res) => {
  const updatedProduct = await productService.updateProduct(
    req.validData,
    req.params.id
  );
  res.status(200).json(updatedProduct); // Send updated product
};
exports.deleteProduct = async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.status(200).json({ message: "Product deleted successfully" });
};
