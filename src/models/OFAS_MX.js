const mongoose = require ('mongoose');

const PROGRAMACION_DEFAULT_OFAs_MXSchema = mongoose.Schema({
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
class:{
    type: String,
    require: true
}

});

mongoose.Magentta=mongoose.createConnection("mongodb://10.221.46.194:27017/Ternium?directConnection=true",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports= mongoose.Magentta.model('PROGRAMACION_DEFAULT_OFAs_MX', PROGRAMACION_DEFAULT_OFAs_MXSchema, 'PROGRAMACION_DEFAULT_OFAs_MX');