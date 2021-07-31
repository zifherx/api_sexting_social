import { connect } from 'mongoose'
import config from './config'


export async function startConnection() {
    const db = await connect(config.mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    console.log(`Database ${db.connection.name} is connected`);
}