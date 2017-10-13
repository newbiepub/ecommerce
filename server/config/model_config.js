export const model_config = {
    Category: {
        name: "Category",
        schema: {
            categoryName: {type: String, required: true},
            description: {type: String},
            name: "category"
        },
        collection: "category"
    },
    Product: {
        name: "Product",
        schema: {

        },
        collection: "product"
    },
    Order: {
        name: "Order",
        schema: {

        },
        collection: "order"
    },
    OrderDetail: {
        name: "Order Detail",
        schema: {

        },
        collection: "order_detail"
    },
    PaymentGateway: {
        name: "Payment Gateway",
        schema: {

        },
        collection: "payment_gateway"
    }
};