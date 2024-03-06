import Razorpay from "razorpay"

const razorpayInstance = new Razorpay({ 
  key_id: process.env.RAZORPAY_API_KEY, 
  key_secret: process.env.RAZORPAY_API_SECRET 
});


export const createOrder = async (req, res, next) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount , 
      currency: 'INR',
      receipt: 'receipt_order_74394', 
    };
    const order = await razorpayInstance.orders.create(options);
    req.order = order; 
    next();
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};


export const capturePayment = async (req, res, next) => {
  const { payment_id } = req.body;

  try {
    const payment = await razorpayInstance.payments.capture(payment_id);
    req.payment = payment; 
    next();
  } catch (error) {
    console.error("Error capturing payment:", error);
    res.status(500).json({ error: "Payment failed" });
  }
};
