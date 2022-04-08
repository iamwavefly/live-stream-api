
module.exports = mongoose => {
  let schema = mongoose.Schema({
        token: { 
            type: String,
            required: true
        },

        accounts: [
            {
                name: {
                    type: String,
                    default: "",
                    enum: ["facebook", "youtube", "twitch"]
                },
                access_token: {
                    type: String,
                    default: ""
                },
                refresh_token: {
                    type: String,
                    default: ""
                },
                user_name: {
                    type: String,
                    default: ""
                },
                user_picture: {
                    type: String,
                    default: ""
                },
                user_id: {
                    type: String,
                    default: ""
                },
                is_connected: {
                    type: Boolean,
                    default: false
                }
            }
        ]

    }, { timestamps: true });

    const Accounts = mongoose.model("Accounts", schema);
    return Accounts;
};