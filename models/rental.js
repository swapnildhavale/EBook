const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                maxlength: 30
            },
            phone: {
                type: Number,
                minlength: 10,
                maxlength: 12,
                required: true
            }
        }),
        required: true
    },
    book: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
            },
            cost: {
                type: Number
            }
        }),
        required: true
    },
    datePurchased: {
        type: Date,
        default: Date.now
    },
    Fees: {
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const schema = {
        customerId: Joi.objectId().required(),
        bookId: Joi.objectId().required(),
    };
    return Joi.validate(rental, schema);
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;