export const createPayment = async (amount, name, description) => {
    // This function would ideally call your backend to create an order
    // For now, we'll simulate the order creation or use client-side (less secure but faster for prototype)
    // REAL IMPLEMENTATION: Call Supabase Edge Function to create order

    // Placeholder options
    const options = {
        "key": "YOUR_RAZORPAY_KEY_ID", // Enter the Key ID generated from the Dashboard
        "amount": amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Master Calisthenics Elite",
        "description": description,
        "image": "assets/logo.png",
        // "order_id": "order_9A33XWu170g81s", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
            alert("Payment Successful: " + response.razorpay_payment_id);
            // Call Supabase to extend validity
            extendMembership(response.razorpay_payment_id);
        },
        "prefill": {
            "name": name,
            "contact": ""
        },
        "theme": {
            "color": "#F57C00"
        }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
};

async function extendMembership(paymentId) {
    // Call Edge Function
    // await supabase.functions.invoke('handle-payment', { body: { paymentId } })
    console.log("Extending membership for payment:", paymentId);
}
