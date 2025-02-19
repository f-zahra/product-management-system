const Product = require("../models/product");
const sequelize = require("../db");

exports.getProductById = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json(product); // Send product details
};
exports.getAllProducts = async (req, res) => {
  let { page, limit } = req.query; // Get from query parameters

  // Set default values if not provided
  page = parseInt(page) || 1; // Default to page 1
  limit = parseInt(limit) || 10; // Default limit of 10

  const offset = (page - 1) * limit; // Calculate offset

  const products = await Product.findAll({
    limit: limit,
    offset: offset,
    order: [["name", "ASC"]],
  });
  res.status(200).json(products); // Send all products
};
exports.createProduct = async (req, res) => {
  await sequelize.transaction(async (t) => {
    const { name, description, price } = req.validData;
    const newProduct = await Product.create(
      { name, description, price },
      { transaction: t }
    );
    res.status(201).json(newProduct);
  });
};
exports.updateProduct = async (req, res) => {
  const { name, price, description } = req.validData;

  const [updatedProduct] = await Product.update(
    { name: name, price: price, description: description },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.status(200).json(updatedProduct); // Send updated product
};
exports.deleteProduct = async (req, res) => {
  //find product
  const productId = req.params.id;
  const productToDelete = await Product.findByPk(productId);
  if (!productToDelete) {
    return res.status(404).json({ msg: "product not found" });
  }

  await productToDelete.destroy(); // Delete product
  res.status(200).json({ message: "Product deleted successfully" });
};
