const express = require('express');
const puppeteer = require('puppeteer');
const pup = express.Router()

pup.get('/puppeteer', async (req, res) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Configure the navigation timeout
    await page.setDefaultNavigationTimeout(0);
    let url ='https://www.mpinfo.org/Home/';
    url ='https://www.mpinfo.org/Home/TodaysNews';

    await page.goto(url, { waitUntil: 'load' });
    // Set screen size
    console.log(await page.title())
    await page.setViewport({ width: 1080, height: 1024 });

    //await page.waitForSelector('[id="492"]');
    //await page.click('[id="492"]');

    //identify element
    //page.waitForSelector('[id="lblNewsTitle"]')
    //const f = await page.$('[id="lblNewsTitle"]')
    const element = await page.$("h3");
    const text = await (await element.getProperty("innerText")).jsonValue();
    //obtain text
   // const text = await (await f.getProperty('textContent')).jsonValue()
   console.log(text)




})

module.exports = { pup }