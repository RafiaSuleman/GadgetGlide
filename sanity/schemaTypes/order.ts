const orderSchema = {
    name: 'order',
    type: 'document',
    title: 'Orders',
    fields: [
        { name: 'fullName', type: 'string', title: 'Full Name' },
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Phone Number' },
        { name: 'address', type: 'text', title: 'Shipping Address' },
        {
            name: 'items',
            type: 'array',
            title: 'Order Items',
            of: [{
                type: 'object',
                fields: [
                    { name: 'productName', type: 'string', title: 'Product Name' },
                    { name: 'quantity', type: 'number', title: 'Quantity' },
                    { name: 'price', type: 'number', title: 'Price' }
                ]
            }]
        },
        { name: 'totalAmount', type: 'number', title: 'Total Amount' },
        {
            name: 'status',
            type: 'string',
            title: 'Order Status',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Shipped', value: 'shipped' },
                    { title: 'Delivered', value: 'delivered' },
                ]
            },
            initialValue: 'pending'
        }
    ]
}

export default orderSchema