import { app } from './app.js'

import { connectDb } from './data/database.js'

connectDb()

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`server running on port:${process.env.PORT} in ${process.env.NODE_ENV} MODE`)
})
