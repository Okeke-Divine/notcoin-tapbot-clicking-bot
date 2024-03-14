const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const ProxyAuthPlugin = require('puppeteer-extra-plugin-proxy');

puppeteer.use(StealthPlugin()).use(ProxyAuthPlugin());

require("dotenv").config();

const clickWorker = async (res = null, uname, pswd, time, hostUrl) => {
  let console_log = 1;
  console.log('Intialising bot for uname:' + uname + ' pswd:' + pswd);

  puppeteer.launch({
    headless: false, timeout: 240000, args: [
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  }).then(async browser => {


    const UserAgen = {
      useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      screenWdith: 412,
      screenHeight: 914,
    }

    const page = await browser.newPage();
    if (console_log == 1) { console.log('Browser Launched' + ' => for uname:' + uname + ' pswd: ******'); }
    // DISABLE TIMEOUT
    await page.setDefaultNavigationTimeout(0);
    // CONFIGURE BROWSER USER AGENT
    await page.setUserAgent(UserAgen.useragent);
    await page.setViewport({
      width: UserAgen.screenWdith,
      height: UserAgen.screenHeight,
    });
    // INTERCEPTOR
    await page.setRequestInterception(true);
    // terminate StyleSheetList,fontf file and images to increase load time and reduce resource usage
    page.on('request', (req) => {
      if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image' || req.url().includes('hm.js')) {
        req.abort();
      }
      else {
        req.continue();
      }
    });

    const response = await page.goto('https://clicker.joincommunity.xyz/clicker#tgWebAppData=query_id%3DAAFUXrUBAwAAAFRetQF7Yh4b%26user%3D%257B%2522id%2522%253A6471114324%252C%2522first_name%2522%253A%2522.n%2522%252C%2522last_name%2522%253A%2522%2522%252C%2522username%2522%253A%2522x1x_unknown%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26auth_date%3D1710193390%26hash%3D14ed497e9ab43cbf30a96a2880fcd1a8a6fa504814a01eef6b7ccd52b13f6def&tgWebAppVersion=6.9&tgWebAppPlatform=android&tgWebAppBotInline=1&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22secondary_bg_color%22%3A%22%23f0f0f0%22%2C%22text_color%22%3A%22%23222222%22%2C%22hint_color%22%3A%22%23a8a8a8%22%2C%22link_color%22%3A%22%232678b6%22');
  });
  await page.waitForSelector('._scoreCurrent_7wnko_30', { timeout: 0 });
  const loopTotal = document.querySelector("._scoreCurrent_7wnko_30");

  //uptime per minute
  let total_uptime_in_mins = 0;
  setInterval(function () {
    if ((total_uptime_in_mins + 1) >= 5) {
      browser.close()
    }
  }, 60000);

}


module.exports = { clickWorker }