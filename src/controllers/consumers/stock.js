const { Kafka } = require('kafkajs')
const STOCK = require('../../models/STOCK')

const ConsumerStock = ()=>{
    const kafka = new Kafka({brokers:['10.221.46.223:9093']})

    const consumer = kafka.consumer({ groupId: 'robot pruebas' })
    
    const inicioKafka= async ()=>{
        console.log("cconsumer stock")
        await consumer.connect()
    
        await consumer.subscribe({ topic: 'tpc-nca-stock-test', fromBeginning: true })
    
        // await consumer.run({
        //     partitionsConsumedConcurrently: 3,
        //     eachMessage: async ({ topic, partition, message }) => {
        //     // console.log({
        //     //     value: (message.value!= null)?message.value.toString():"" ,
        //     // })
    
        //      const msgJSON =JSON.parse(message.value)
        //      console.log(msgJSON.data.C_MATERIAL, new Date())
        //     const oStock = new STOCK();
        //     oStock._id = `${msgJSON.data.C_MATERIAL}`;
        //     oStock.timestamp = `${new Date().getTime()}`;
        //     oStock.data={
        //         C_MATERIAL:msgJSON.data.C_MATERIAL, 
        //         C_ID_MATERIAL: msgJSON.data.C_ID_MATERIAL, 
        //         data_Inventario: msgJSON.data
        //     };
        //     oStock.version=0;
        //     oStock._class= "com.everis.industry.hyperaut_mvp.blackboard.model.Entidad";

        //     //console.log(oStock);
        //     oStock.save();
        //     },
        // })

        await consumer.run({
            eachBatchAutoResolve: true,
            eachBatch: async ({
                batch,
                resolveOffset,
                heartbeat,
                commitOffsetsIfNecessary,
                uncommittedOffsets,
                isRunning,
                isStale,
                pause,
            }) => {
                for (let message of batch.messages) {
                    const msgJSON =JSON.parse(message.value)
                    //console.log(msgJSON.data.C_MATERIAL, new Date())
                    const oStock = new STOCK();
                    oStock._id = `${msgJSON.data.C_MATERIAL}`;
                    oStock.timestamp = `${new Date().getTime()}`;
                    oStock.data={
                        C_MATERIAL:msgJSON.data.C_MATERIAL, 
                        C_ID_MATERIAL: msgJSON.data.C_ID_MATERIAL, 
                        data_Inventario: msgJSON.data
                    };
                    oStock.version=0;
                    oStock._class= "com.everis.industry.hyperaut_mvp.blackboard.model.Entidad";
                    try{
                    //console.log(oStock);
                    //oStock.save();
                    // const stockExist = await STOCK.findOne({_id:oStock._id});
                    // //console.log(stockExist)
                    // if(stockExist=== null || stockExist=== undefined){
                    //     oStock.save();
                    // }else{
                    //     await STOCK.findByIdAndUpdate(oStock._id, stockExist)
                    // }

                    STOCK.findOneAndUpdate({
                        _id: `${oStock._id}`
                    }, oStock, { upsert: true }, function(err, res) {
                        // Deal with the response data/error
                    });
                    }catch(error){
                        console.log(`------------------------------`)
                        console.log(`Error con el id ${oStock._id}`)
                        console.log(`${error}`)
                    }
        
                    resolveOffset(message.offset)
                    await heartbeat()
                }
            },
        })
    }

    inicioKafka();
}

module.exports={
    ConsumerStock
}