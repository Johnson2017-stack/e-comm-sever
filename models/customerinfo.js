import { Schema, model } from 'mongoose'

const customerSchema = new Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    cardNumber: {
        type: String,
        require: true,
    },
    expirationDate: {
        type: String,
        require: true,
    },
    cv: {
        type: String,
        require: true,
    },
})
const customerinfo = model("customerinfo", customerSchema)

export default customerinfo