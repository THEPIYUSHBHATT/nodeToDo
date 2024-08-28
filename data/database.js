import mongoose from 'mongoose'
// Connecting to Database
 export const connectDb= () => { mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'backendapi',
  })
  .then(() => console.log('database connected'))
  .catch((e) => console.log(e))}
