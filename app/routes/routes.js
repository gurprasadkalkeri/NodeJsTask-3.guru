module.exports = (app) => {

    //api to add category
    const addCategory = require('../controllers/addCategory')
    app.post('/addCategory', addCategory.addCategory)

    //api to add Product
    const addProduct = require('../controllers/addProduct')
    app.post('/addProduct', addProduct.addProduct)

    //list categories
    const listCategories = require('../controllers/listCategories')
    app.get('/listCategories', listCategories.listCategories)
}