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
    }
})
const customerinfo = model("customerinfo", customerSchema)

export default customerinfo