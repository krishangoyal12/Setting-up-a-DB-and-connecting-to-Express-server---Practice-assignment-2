const {connect} = require('mongoose')

const connectToDb = async(url) =>{
    try{
       await connect(url)
       console.log('Connected to database')

    }
    catch(error){
        console.log('Error connecting to database')
    }
}

module.exports = connectToDb