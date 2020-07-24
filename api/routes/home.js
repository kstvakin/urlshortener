const express = require('express');
const router = express.Router();
const db = require('../../Helper/db');

router.post('/', (req, res, next) => {

    const address = req.body.address;

    const cols = [address, slug(5), Date.now()];

    db.createRow("conversion", cols).then(result => {
        res.send({ status: true, msg: result })
    })

});

router.get('/:slug', (req, res, next) => {

    const id = req.params.slug;

    db.readTable("conversion", [id])
        .then(result => {
            res.redirect(result.Address)
        }).catch(err => console.log(err))

});

function slug(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = router;