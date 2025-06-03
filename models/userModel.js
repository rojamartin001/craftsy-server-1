const  mongoose  = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        profilePic:{
            type:String
        }
       

        
    }
)

// // Hash password before saving to database
// userSchema.pre("save", async function (next) {
    
//     // console.log("Hashing password..."); // This should appear in the console


//     // Only hash if the password is modified (avoid rehashing on update)
//     if (!this.isModified("password")) return next();

//     try {
//         const saltRounds = 10; // Number of times hashing is applied
//         this.password = await bcrypt.hash(this.password, saltRounds); // Hash the password

//         // console.log("Hashed password:", this.password); // Check if password is hashed

//         next();
//     } catch (error) {
//         next(error);
//     }
// });


const users = mongoose.model("users",userSchema)

module.exports = users