// for available mongoose in this module
const mongoose= require('mongoose');

// define the various fields that I want th data that will be 
// inserted inside the mongered the database
// so inside this schema method I will pass in an object where this 
// schema will be defined so this basically that is going to be the data that we will be
// sending to our sever

const shoppingItemSchema = mongoose.Schema({
    itemName:{
        type: String,
        required: true
    
    },
    itemQuantity:{
        type: Number,
        required: true
    
    },
    itemBought:{
        type: Boolean,
        required: true
    
    },
});

// we also ned to export this to class schema
const Item = module.exports = mongoose.model('Item', shoppingItemSchema);

