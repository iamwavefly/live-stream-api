const dateUtil = require('date-fns');
const path = require("path");
const fs = require("fs");

// CACHE
const NodeCache = require('node-cache');
const cache_expiry = process.env.CACHE_EXPIRY_SECONDS;
const cache = new NodeCache({ stdTTL: cache_expiry, checkperiod: cache_expiry * 0.2, useClones: false });

module.exports = function (app) {
    let endpoint_category = path.basename(path.dirname(__filename));
    
    app.get(`/${endpoint_category}/get_countries`, async (request, response) => {
         const countries = fs.readFileSync(path.join(__dirname, "../../json/countries.json"), "utf8");
            const countries_json = JSON.parse(countries);
            const countries_names = countries_json.map(country => country.name);
            response.status(200).json({ "status": 200, "message": `Countries has been fetched successfully.`, "data": countries_names });
    });

}