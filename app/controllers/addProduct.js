const Category = require('../models/categories.model'); //category model path
const Product = require('../models/products.model'); //product model path

exports.addProduct = (req, res) => { //exports the api 
    var product_name = req.body.product_name;
    var product_price = req.body.product_price;
    var category_name = req.body.category_name;
    if (category_name == '' || category_name == null) {
        res.status(200).send({ code: 0, message: 'please enter valid category name' });
    } else {
        Category.find({ 'category_name': category_name })
            .then(db_category => {
                if (db_category.length != 0) {
                    Product.find({ product_name: product_name })
                        .then(data => {
                            if (data.length != 0) {
                                res.status(200).send({ code: 0, message: 'This product is already exist' });
                            } else {
                                const product = new Product({ //creates new record in category model 
                                    product_name: product_name || '',
                                    category_id: db_category[0]._id,
                                    product_price: product_price || 0
                                }, function(err, note) {
                                    if (err) return res.status(500).send({ //throws an error if there is any error while adding info in database
                                        code: 0,
                                        message: "There was a problem adding the information to the database.",
                                        errorMessage: err.message
                                    })
                                })
                                product.save()
                                    .then(data => {
                                        res.status(200).send({ code: 1, message: 'Product added successfully', data: data }); //prints response after adding data in databse
                                    }).catch(err => {
                                        res.status(500).send({ code: 0, message: "There is an exception", errorMessage: err.message }); //throws exception if there is any exception as response
                                    });
                            }
                        })

                }
            })
    }
}