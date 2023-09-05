import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
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
    checkoutAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending', required: true },
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model('Order', orderSchema)