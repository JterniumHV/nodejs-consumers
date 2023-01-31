//const {Schema , model} = require ('mongoose');
const mongoose = require ('mongoose');

const STOCK_DEFAULT_infoStock_MXSchema = mongoose.Schema({
_id:{
    type: String,
    require: true
},
timestamp:{
    type: String,
    require: true
},
data:{
    type: Object,
    require: true
},
version:{
    type: Number,
    require: true
},
_class:{
    type: String,
    require: true
}

});

mongoose.Magentta=mongoose.createConnection("mongodb://10.221.46.194:27017/Ternium?directConnection=true",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports= mongoose.Magentta.model('STOCK_DEFAULT_infoStock_MX', STOCK_DEFAULT_infoStock_MXSchema, 'STOCK_DEFAULT_infoStock_MX');