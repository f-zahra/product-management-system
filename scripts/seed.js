const sequelize = require("../db");
const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");

async function seed() {
  try {
    await sequelize.sync({ force: true }); // for dev only
    console.log("✅  all models synced!");

    // 1. Seed Users
    const users = await User.bulkCreate([
      { name: "Alicia", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
    ]);
    console.log("Users seeded!");

    // 2. Seed Products
    const products = await Product.bulkCreate([
      { name: "E-book", description: "Learn JS", price: 9.99 },
      { name: "Course", description: "Advanced Node.js", price: 29.99 },
      { name: "Software License", description: "Pro Tools", price: 199.99 },
    ]);
    console.log("Products seeded!");

    // 3. Seed Orders
    const order1 = await Order.create({
      total_price: 39.98,
      status: "completed",
      userId: users[0].id, // Alice
    });

    const order2 = await Order.create({
      total_price: 229.98,
      status: "pending",
      userId: users[1].id, // Bob
    });

    // 4. Associate Products with Orders (many-to-many)
    await order1.setProducts([products[0], products[1]]); // Alice bought E-book + Course
    await order2.setProducts([products[1], products[2]]); // Bob bought Course + License

    console.log("Orders and product associations seeded!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await sequelize.close();
    console.log("Database connection closed.");
  }
}

seed();
