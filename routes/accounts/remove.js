const path = require("path");
const dateUtil = require('date-fns');
const db = require("../../models");
const functions = require("../../utility/function.js")

const USER = db.user;
const Accounts = db.accounts;


module.exports = function (app) {
    let endpoint_category = path.basename(path.dirname(__filename));

    app.post(`/${endpoint_category}/remove`, async (request, response, next) => {
        try {

            // token
            // accounts_name

            let payload = {
                is_verified: false,
                is_blocked: false,
                is_registered: false
            }

            let userExists = await USER.find({ token: request.body.token})
            let accountsExists = await Accounts.find({ token: request.body.token })
            
            if (!functions.empty(userExists)) {

                userExists = Array.isArray(userExists)? userExists[0] : userExists;
                accountsExists = Array.isArray(accountsExists)? accountsExists[0] : accountsExists;

                // Check if token has expired
                const difference = Math.abs(dateUtil.differenceInMinutes(new Date(userExists.token_expiry), new Date()))
                if (difference > process.env.TOKEN_EXPIRY_MINUTES) {
                    payload["is_verified"] = functions.stringToBoolean(userExists.is_verified)
                    payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked)
                    payload["is_registered"] = functions.stringToBoolean(userExists.is_registered)
                    throw new Error("This user authentication token has expired, login again retry.")
                }

                // REMOVE INTEGRATION
                await Accounts.updateOne(
                    { "token": request.body.token },
                    { "$pull": { 
                            "accounts": {
                                "name": request.body.accounts_name
                            } 
                        } 
                    }
                )

                accountsExists = await Accounts.find({ token: request.body.token })
                accountsExists = Array.isArray(accountsExists)? accountsExists[0] : accountsExists;

                payload["is_verified"] = functions.stringToBoolean(userExists.is_verified)
                payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked)
                payload["is_registered"] = functions.stringToBoolean(userExists.is_registered)
                payload["accounts"] = accountsExists;

                response.status(200).json({ "status": 200, "message": `Your ${request.body.accounts_name} account has been successfully disconnected`, "data": payload })


            } else {
                response.status(400).json({ "status": 400, "message": "User account access authentication credentials failed, check and retry.", "data": payload });
            }

        } catch (error) {
            response.status(400).json({ "status": 400, "message": error.message, "data": null });
        }
    })

}