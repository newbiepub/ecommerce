import mongoose from "mongoose";
const
    mongoURI = `mongodb://testapp:testapp@cluster0-shard-00-00-w7mk0.mongodb.net:27017,cluster0-shard-00-01-w7mk0.mongodb.net:27017,cluster0-shard-00-02-w7mk0.mongodb.net:27017/ecommerce?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`,
    options = {
    server: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}},
    replset: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}}
};

mongoose.connect(mongoURI, options);

const conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function () {
    console.log("Database Connect Successfully");
});
export {conn};
export default mongoose;