// import express
var express = require('express');

// variable for add all our routes
var router = express.Router();
// go back
const Item = require('../model/shoppingItem')

// connect with mongo db pit data to database
router.get('/items',(req,res, next)=>{
    // res.send('Testing Route');
    Item.find(function(err, item){
        if(err){
            // express provide res.json
            res.json(err);
        }
        else{
            res.json(item);
        }
    });

});

// insert new data to database
router.post('/item',(req,res, next)=>{
    let newShoppingItem = new Item({
        itemName:req.body.itemName,
        itemQuantity:req.body.itemQuantity,
        itemBought:req.body.itemBought
    });

    newShoppingItem.save((err, item) =>{
        if(err){
            res.json(err);
        }
        else{
            // provide msg data was inserted successfully
            // msg is object therefore it should be in {}
            res.json({msg: 'Item has been added to db'});
        }
    });
});
// update data on database
// :id is a parameter
router.put('/item/:id',(req,res, next)=>{
    // access id (findOneAndUpdate is a mongodb API)
    Item.findOneAndUpdate({_id:req.params.id},{
        // we use "set" to set the values to a new value recieved inside
        // how I request body so to do that to set 
        $set:{
            itemName:req.body.itemName,
            itemQuantity:req.body.itemQuantity,
            itemBought:req.body.itemBought
        }
    
    },
        
        function(err, result){
            if(err){
                res.json(err);
            }
            else{
                
                res.json(result);
            }

    });

});

// remove data from database
router.delete('/item/:id',(req,res, next)=>{
    // access id (remove is a mongodb API)
    Item.remove({_id:req.params.id},function(err, result){
            if(err){
                res.json(err);
            }
            else{
                
                res.json(result);
            }

    });

});

// second argument of the function (item, result) can be any name
module.exports = router;