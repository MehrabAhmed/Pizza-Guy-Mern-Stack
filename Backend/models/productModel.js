const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please Enter product Name"]
    },
    description :{
        type: String,
        required: [true, "Please Enter product Description"]
    },
    price:{
        type:Number,
        required: [true, "Please Enter product Price"],
        maxLenght:[8, "Price cannot exceed 8 characters"]
    },
     ratings:{
       type:Number,
        default:0
    },
    images:[{
        public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }}]
    ,
    category:{
        type:String,
    //    required: [true, "Please Enter product category"],
    
    },

    size:{
        type:String,
    //    required: [true, "Please Enter product category"],
    
    },
    available:{
        type: Boolean,
        required: [true, "Please Enter product avaliblity"],
        default: true
    },
    numofReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required: true,
            },
            rating:{
                type:Number,
                required: true
            },
            comment:{
                type: String,
                required: true
            }
        }
    ],
    createdAT:{
        type:Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Product", productSchema);