import mongoose from "mongoose"

const linkSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    title : String,
    url : String,
    clicks : {
        type : Number,
        default : 0
    }
},{
    timestamps : true
})

const linkModel = mongoose.model("link", linkSchema)

export default linkModel