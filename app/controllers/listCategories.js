const Category = require('../models/categories.model'); //category model path
const Product = require('../models/products.model'); //product model path
exports.listCategories = (req, res) => { //exports the api 

    Category.find()
        .then(db_cat => {
            if (db_cat.length != 0) {
                var category_list = [];
                db_cat.forEach(element => {
                    // console.log("element-", element._id, "element name -", element.category_name)
                    Product.find({ 'category_id': element._id })
                        .then(db_prd => {
                            var category_json = {};
                            category_json['category_id'] = element._id
                            category_json['category_name'] = element.category_name
                            category_json['no_of_products'] = db_prd.length
                            category_list.push(category_json) //adds the details of category and product cound in category list
                            if (category_list.length == db_cat.length) {
                                console.log('category_list = ', category_list);
                                res.status(200).send({ code: 1, message: 'List of categories', data: category_list })
                            }
                        })
                })
            } else {
                res.status(200).send({ code: 0, message: 'No categories exits' });
            }
        })
}