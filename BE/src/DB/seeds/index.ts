import sequelize from "../connection.ts";
import logger from "../../utils/logs/logger.ts";
import User from "../models/user.model.ts";
import Book from "../models/book.model.ts";
import Order from "../models/orders_model.ts";
import { userSeeds } from "./users.seed.ts";
import { bookSeeds } from "./books.seed.ts";
import { orderSeeds } from "./orders.seed.ts";

async function seed() {
  try {
    // Connect to database
    await sequelize.authenticate();
    logger.info("✅ Database connected successfully");

    // Sync all models (creates tables if they don't exist)
    await sequelize.sync({ force: true }); // force: true drops existing tables
    logger.info("✅ Database synced - tables created");

    // Seed Users
    const createdUsers = await User.bulkCreate(userSeeds);
    logger.info(`✅ Seeded ${createdUsers.length} users`);

    // Seed Books
    const createdBooks = await Book.bulkCreate(bookSeeds);
    logger.info(`✅ Seeded ${createdBooks.length} books`);

    // Seed Orders
    const createdOrders = await Order.bulkCreate(orderSeeds);
    logger.info(`✅ Seeded ${createdOrders.length} orders`);

    logger.info("🎉 Database seeding completed successfully!");
    
    // Display summary
    console.log("\n📊 SEED SUMMARY:");
    console.log(`   Users:  ${createdUsers.length}`);
    console.log(`   Books:  ${createdBooks.length}`);
    console.log(`   Orders: ${createdOrders.length}\n`);

    process.exit(0);
  } catch (error) {
    logger.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
