const express = require("express")
const { translateAliases } = require("../models/product")
const checkauth = require("../middleware/check-auth")

const router = express.Router()

const productModel = require('../models/product')

router.post('/',checkauth, (req, res) => {

    const newProduct = new productModel({
        name: req.body.productname,
        price: req.body.productprice
    })

    newProduct
        .save()
        .then(doc => {
            res.json({
                msg: "saved product",
                productInfo: {
                    doc,
                    request: {
                        type: "GET",
                        url: "http://localhost:1234/product/" + doc._id
                    }
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

router.get('/',checkauth, (req, res) => {
    
    productModel
        .find()
        .then(docs => {
            
            res.json({
                msg: "total get products",
                count: docs.length,
                products: docs.map(doc => {
                    return{
                        doc,
                        request: {
                            type: "GET",
                            url: "http://localhost:1234/product/" + doc._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

router.get('/:productID',checkauth, (req, res) => {

    const id = req.params.productID

    productModel
        .findById(id)
        .then(doc => {
            if(!doc) {
                return res.json({
                    msg: "no product ID"
                })
            }
            res.json({
                msg: "succssful get product by" +id,
                productInfo: {
                    doc,
                    request: {
                        type: "GET",
                        url: "http://localhost:1234/product/"
                    }
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

router.patch('/:productID',checkauth, (req, res) => {
    const id = req.params.productID

    //productModel에서 id찾고 업데이트내용을 실행
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    productModel
        .findByIdAndUpdate(id, {$set: updateOps})
        .then(result => {
            res.json({
                msg: "updated at" +id,
                productInfo: {
                    request: {
                        type: "GET",
                        url: "http://localhost:1234/product/" + id
                    }
                }
                
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

router.delete('/',checkauth, (req, res) => {
    
    productModel
        .deleteMany()
        .then(doc => {
            res.json({
                msg: "delete products",
                request: {
                    type: "GET",
                    url: "http://localhost:1234/product/"
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

router.delete('/:productID',checkauth, (req, res) => {
    const id = req.params.productID

    productModel
        .findByIdAndDelete(id)
        .then(doc => {
            res.json({
                msg: "delete product",
                request: {
                    type: "GET",
                    url: "http://localhost:1234/product/"
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
        
})

module.exports = router