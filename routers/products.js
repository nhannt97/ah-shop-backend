const express = require('express');
const router = express.Router();
const { getAll, create, update, deletePro } = require('../database/products');
const auth = require('../auth');

router.get('/', async (req, res) => {
    const products = await getAll();
    if (!products) {
        return res.send({
            code: 400,
            error: 'Get all products failed'
        });
    }
    return res.send({
        code: 200,
        data: products
    });
});

router.post('/create', auth, async (req, res) => {
    const { name, type, typeWood, img, price = 0, description } = req.body;
    const product = await create({ name, type, typeWood, img, price, description });
    if (!product) {
        return res.send({
            code: 400,
            error: 'Create new product failed'
        });
    }
    return res.send({
        code: 200,
        data: product
    });
});

router.put('/update', auth, async (req, res) => {
    const { id, name, type, typeWood, img, price = 0, description } = req.body;
    const product = await update({ id, name, type, typeWood, img, price, description });
    if (!product) {
        return res.send({
            code: 400,
            error: 'Update product failed'
        });
    }
    return res.send({
        code: 200,
        data: product
    });
});

router.delete('/delete', auth, async (req, res) => {
    const { id } = req.body;
    const idPro = await deletePro({ id });
    if (!idPro) {
        return res.send({
            code: 400,
            error: 'Delete product failed'
        });
    }
    return res.send({
        code: 200,
        data: id
    });
});

module.exports = router;
