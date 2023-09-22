import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    products: { type: Array },
    paymentInfo: {
        razorpay_payment_id: {
            type: String,

        },
        razorpay_order_id: {
            type: String,

        },
        razorpay_signature: {
            type: String,

        }
    },
    address: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String },
    checkoutAmount: { type: Number, required: true },
    status: { type: String, default: "Pending", required: true },
    deliveryStatus: { type: String, default: "Pending" },
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("Order", orderSchema);