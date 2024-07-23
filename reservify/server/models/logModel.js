const mongoose = require("mongoose")

const logSchema = mongoose.Schema(
    {
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        reference_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        // user_address: {
        //     type: String,
        // },
        address: {
            type: String,
        },
        user_email: {
            type: String,
        },
        text: {type: String},
        type: {
            type: String,
            enum: ["booking", "refund", "topup", "deletion", "registration", "edit", 'check-in'],
          },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Log", logSchema)