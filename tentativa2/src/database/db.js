import mongoose from 'mongoose'

async function connectDatabase() {
  await mongoose
    .connect("mongodb+srv://abf:ieCYuOhfECpme5Rp@blog-gen.pfmlrr7.mongodb.net/?retryWrites=true&w=majority")
}

export default connectDatabase