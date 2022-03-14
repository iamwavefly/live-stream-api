const path = require("path");
const dateUtil = require('date-fns');
const db = require("../../../models");
const functions = require("../../../utility/function.js")

const USER = db.user;

module.exports = function (app) {
    let endpoint_directory = path.basename(path.dirname(__dirname));
    let endpoint_category = path.basename(path.dirname(__filename));
    
    app.post(`/${endpoint_directory}/${endpoint_category}/disconnect_facebook`, async (request, response, next) => {
        try {  

            // token

            if (request.body.token) {

                let payload = {
                    is_verified: false,
                    is_blocked: false,
                    is_registered: false,
                    token: request.body.token
                }

                let userExists = await USER.find({ token: request.body.token})
                
                if (!functions.empty(userExists)) {

                    userExists = Array.isArray(userExists)? userExists[0] : userExists;
                    console.log(userExists.connected_accounts, 'userExists');

                    // Check if token has expired
                    const difference = Math.abs(dateUtil.differenceInMinutes(new Date(userExists.token_expiry), new Date()))
                    if (difference > process.env.TOKEN_EXPIRY_MINUTES) {
                        payload["is_verified"] = functions.stringToBoolean(userExists.is_verified)
                        payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked)
                        payload["is_registered"] = functions.stringToBoolean(userExists.is_registered)
                        throw new Error("This user authentication token has expired, login again retry.")
                    }

                    //diccconnect facebook account
                    let user = await USER.findOneAndUpdate({ token: request.body.token }, {
                        $set: {
                            token: request.body.token,
                            facebook_access_token: "",
                            is_connected_facebook: false,
                            connected_accounts:  - 1
                        }
                    }, { new: true })

                    if (user) {
                        response.status(200).json({
                            "status": 200,
                            "message": "Successfully disconnected facebook account.",
                            "payload": payload
                        })
                    }
     
                } else {
                    response.status(400).json({ "status": 400, "message": "User account access authentication credentials failed, check and retry.", "data": payload });
                }

            } else {
                response.status(400).json({ "status": 400, "message": "Incomplete or missing requests parameter(s)", "data": null });
            }

        } catch (error) {
            response.status(400).json({ "status": 400, "message": error.message, "data": null });
        }
    })

}