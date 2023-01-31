const mongoose = require ('mongoose')

const dbConnection = async () =>{
    
    await mongoose.connect(
            "mongodb://10.221.41.10:27017/Ternium?directConnection=true",{
            useNewUrlParser : true,
            useUnifiedTopology: true
        });

    console.log('database online')

}

module.exports={
    dbConnection
}