import mongoose from "mongoose"

const contactSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        organisation: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: false,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

const Contact = mongoose.model("Contact", contactSchema)

export default Contact
