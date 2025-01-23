const createError = require("../../utils/createError")
const Order = require("../models/order")

const createOrder=async(req,res,next)=>{
    try{
        const order=req.body
        const newOrder= new Order(order)
        const newOrderBD=await newOrder.save()
        res.status(201).json({success:true,data:newOrder})


    }
    catch(err){next (err)}

}
const getAllOrder=async(req,res,next)=>{
    try{

        const newOrder=await Order.find().populate(
             "orderItems.product" // Rellenar la referencia del producto
            
          )
          .populate( "user", // Rellenar la referencia del usuario
           );
        return res.status(201).json({success:true,data:newOrder})

    }
    catch(err){next (err)}

}


const getOrderById=()=>{

}
const getOrderByUser=()=>{

}


module.exports={createOrder,getAllOrder,getOrderById}