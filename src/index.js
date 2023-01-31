const app= require ('./app');
const { ConsumerStock } = require('./controllers/consumers/stock');
const { dbConnection } = require('./database/config');


async function main(){
    dbConnection();
    ConsumerStock();
    await app.listen(5000,"0.0.0.0")
    console.log('server on port 5000')
}
main();

