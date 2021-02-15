const { v4 } = require('uuid');
const db = require('./index');
const productsCollection = db.collection('products');

const create = async ({ name = '', type = 'all', typeWood = '', price = 0, img = '', description = '' }) => {
    try{
        const id = v4();
        const newProduct = {
            id,
            name,
            type,
            typeWood,
            price,
            img,
            description
        };
        await productsCollection.doc(id).set(newProduct);
        return newProduct;
    } catch(e) {
        console.log(e);
        return null;
    }
}

const update = async ({ id, name = '', type = 'all', typeWood = '', price = 0, img = '', description = '' }) => {
    try{
        if (!id) return null;
        const updateProduct = {
            id,
            name,
            type,
            typeWood,
            price,
            img,
            description
        }
        await productsCollection.doc(id).set(updateProduct);
        return updateProduct;
    } catch(e) {
        console.log(e);
        return null;
    }
}

const deletePro = async ({ id }) => {
    try{
        if (!id) return null;
        await productsCollection.doc(id).delete();
        return id;
    } catch(e) {
        console.log(e);
        return null;
    }
}

const getAll = async () => {
    try {
        let products = await productsCollection.get();
        let result = [];
        products.forEach((product) => {
            result.push(product.data());
        });
        return result;
    } catch(e) {
        console.log(e);
        return null;
    }
}

module.exports = {
    getAll,
    create,
    update,
    deletePro
}
