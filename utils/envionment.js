const envionment = process.env.ENVIRONMENT

let NameCollections = {
    products: 'products',
    carts: 'carts',
    users: 'users',
}


if (envionment === 'PROD') {
    NameCollections.products = 'products';
    NameCollections.carts = 'carts';
    NameCollections.users = 'users';
}
if (envionment === 'TEST') {
    NameCollections.products = 'productsTest';
    NameCollections.carts = 'cartsTest';
    NameCollections.users = 'usersTest';
}


export default NameCollections;