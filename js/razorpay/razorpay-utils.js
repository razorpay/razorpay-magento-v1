function RazorpayUtils(options) {
    this.options = options;

    this.getMerchantName = function() {
        return this.options.merchant_name;
    },

        this.placeOrder = function(onSuccess, onDismiss, formId, paymentIdField)
        {
            if (!formId) {
                formId = "razorpay";
            }

            if (!paymentIdField) {
                paymentIdField = "razorpay_payment_id";
            }

            var checkout;

            var options = {
                key: this.options.key_id,
                name: this.options.merchant_name,
                amount: this.options.quote_amount,
                currency: this.options.quote_currency,
                handler: onSuccess,
                order_id: this.options.razorpay_order_id,
                modal: {
                    ondismiss: onDismiss
                },
                notes: {
                    merchant_order_id: this.options.order_id
                },
                _: {
                          integration: 'magento',
                          integration_version: this.options.version,
                          integration_parent_version: this.options.maze_version
                },
                prefill: {
                    name: this.options.customer_name,
                    contact: this.options.customer_phone,
                    email: this.options.customer_email
                },
                callback_url: this.options.callback_url,
            };

            checkout = new Razorpay(options);

            checkout.open();
        }
}
