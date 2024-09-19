import mongoose from 'mongoose'



const connectdb = async (DATABASE_URL) => {


    try {


        const db_options = {

            dbName: 'Freind_Finder'

        }
        await mongoose.connect(DATABASE_URL, db_options)

        console.log("Connected Succesfully")
    }
    catch (err) {
        console.log(err)
    }

}
export default connectdb;