const Category = require('../models/categories.model'); //category model path

exports.addCategory = (req, res) => { //exports the api 

    var category_name = req.body.category_name;
    Category.find({ category_name: category_name }) //checks the category already exists or not
        .then(data => {
            if (data.length != 0) {
                res.status(200).send({ code: 0, message: 'This category is already exists' });
            } else {
                const category = new Category({ //creates new record in category model 
                    category_name: category_name || ''
                }, function(err, note) {
                    if (err) return //throws an error if there is any error while adding info in database
                    res.status(500).send({
                        code: 0,
                        message: "There was a problem adding the information to the database.",
                        errorMessage: err.message
                    })
                })
                category.save()
                    .then(data => {
                        res.status(200).send({ code: 1, message: 'Category added successfully', data: data }); //prints response after adding data in databse
                    }).catch(err => {
                        res.status(500).send({ code: 0, message: "There is an exception", errorMessage: err.message }); //throws exception if there is any exception as response
                    });
            }
        })
}