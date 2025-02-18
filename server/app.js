import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import scrapeTenders from "./services/scrapper.js";
import tenderRoutes from "./routes/tenderRoutes.js";
import cron from "node-cron";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/tenders", tenderRoutes);

// Periodic Scraper (runs every hour)
cron.schedule("0 * * * *", async () => {
  console.log("Running scraper...");
  await scrapeTenders();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
