import puppeteer from "puppeteer";
import Tender from "../models/Tender.js";

const scrapeTenders = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://eprocure.gov.in/cppp/", {
    waitUntil: "load",
    timeout: 60000,
  });

  const tenders = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".tender-list-item")).map((item) => ({
      title: item.querySelector(".tender-title")?.innerText || "No Title",
      description: item.querySelector(".tender-description")?.innerText || "No Description",
      startDate: item.querySelector(".tender-start")?.innerText || "Unknown",
      closingDate: item.querySelector(".tender-deadline")?.innerText || "Unknown",
      department: item.querySelector(".tender-department")?.innerText || "N/A",
    }));
  });

  await browser.close();

  for (const tender of tenders) {
    await Tender.findOneAndUpdate({ title: tender.title }, tender, { upsert: true });
  }

  console.log(`Scraped ${tenders.length} tenders.`);
};

export default scrapeTenders;
