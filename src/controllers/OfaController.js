
const express = require('express');
const ofas= require('../models/OFAS_MX');


const GetAllOfas = async (req, res = express.response) =>{
    console.log("get all ofas")
    try{
    //const data = await ofas.find({"data.c_necesidad_id":"002001290172"});
    const data = await ofas.aggregate([
        //{ $limit : 10 }
        {$project:
            {
                startTime: { $min: ["$timestamp"]},
                endTime: { $min: ["$timestamp"]}
            }
        }
    ]);

    console.log(data)

    //const data = await ofas.find({});
    //console.log(data);
    // let i=0;
    // for(var element of data){
    //     console.log(`-------------------------  ${i}    --------------------------------` )
    //     console.log("el elemento es: " )
    //     //console.log(element)
    //     console.log(element.timestamp)
    //     console.log(new Date(Number(element.timestamp)))
    //     i++;
    // }
    res.json({
        ok:true,
        msg:'Get all ofas',
        data: data
    })
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    GetAllOfas
}