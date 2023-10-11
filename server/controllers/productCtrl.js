import puppeteer from "puppeteer"
import * as cheerio from 'cheerio';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getProductsDetails = async (req, res) => {
    const { urls } = req.body
    try {
        const resData = await Promise.all(urls.map( async (url) => {
            const browser = await puppeteer.launch({ headless: "new" ,defaultViewport: {
                width:1920,
                height:1080
              }})
            const page = await browser.newPage()
            await page.goto(url)
            await sleep(2000)
            await page.click(".header_pincode__sjB2y")
            await sleep(1000)
            await page.type("#pincodeInput", "500035")
            await sleep(1000)
            const btnSelectPin = await page.$(".pincode-widget_pincode-list__ACLIQ > li > button")
            btnSelectPin.click()
            await sleep(1000)
            await page.evaluate(() => {
                document.querySelector(".pincode-widget_success-cntr__BJsFU > .MuiGrid-root.MuiGrid-container.mui-style-1d3bbye > .MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-6.mui-style-iol86l").children[0].click()
            })
            await sleep(1000)
            await page.goto(url)
            await sleep(1000)
            const htmlContent = await page.content()
            browser.close()
            const $ = cheerio.load(htmlContent)
            const title = $(".text-label-component_title__TpDIk").text()
            const quantity = $(".text-label-component_title-container__ebrYm span:nth-child(2)").text().replace(":", "").trim()
            const price = $(".price-details-component_sp___qeys").text().replace(/[^0-9]/g, '')
            const mrp = $(".price-details-component_mrp__s_Q2d .price-details-component_value__IIJeF").text().replace(/[^0-9]/g, '')
            const saving = $(".price-details-component_save__c4IDF").text().replace(/[^0-9]/g, '')
            return ({ title, quantity, mrp: Number(mrp), price: Number(price), saving: Number(saving) })
        }))
        res.status(200).send(resData)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

// Single Product
const getSingleProductDetails = async (req, res) => {
    const url = "https://www.dmart.in/product/premia-groundnut"
    try {
        const browser = await puppeteer.launch({ headless: "new" ,defaultViewport: {
            width:1920,
            height:1080
          }})
        const page = await browser.newPage()
        await page.goto(url)
        await page.click(".header_pincode__sjB2y")
        await page.type("#pincodeInput", "500035")
        await sleep(1000)
        const btnSelectPin = await page.$(".pincode-widget_pincode-list__ACLIQ > li > button")
        btnSelectPin.click()
        await sleep(1000)
        await page.evaluate(() => {
            document.querySelector(".pincode-widget_success-cntr__BJsFU > .MuiGrid-root.MuiGrid-container.mui-style-1d3bbye > .MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-6.mui-style-iol86l").children[0].click()
        })
        await sleep(1000)
        await page.goto(url)
        await sleep(1000)
        const htmlContent = await page.content()
        browser.close()
        const $ = cheerio.load(htmlContent)
        const title = $(".text-label-component_title__TpDIk").text()
        const quantity = $(".text-label-component_title-container__ebrYm span:nth-child(2)").text().replace(":", "").trim()
        const price = $(".price-details-component_sp___qeys").text().replace(/[^0-9]/g, '')
        const mrp = $(".price-details-component_mrp__s_Q2d .price-details-component_value__IIJeF").text().replace(/[^0-9]/g, '')
        const saving = $(".price-details-component_save__c4IDF").text().replace(/[^0-9]/g, '')
        res.status(200).send({ title, quantity, mrp: Number(mrp), price: Number(price), saving: Number(saving) })
    } catch(error) {
        res.status(500).send({ error: error.message })
    }
}

export {getProductsDetails, getSingleProductDetails}