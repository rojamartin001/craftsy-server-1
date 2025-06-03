const users = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')



// register

exports.registerController = async (req, res) => {
    console.log("inside register controller");
    console.log(req.body);
    const { username, email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("already existing user please login")
        } else {
            // const newUser = new users({
            //     username, email, password, profilePic: ''
            // })


            //
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new users({
                username,
                email,
                password: hashedPassword,
                profilePic: ''
            });

            //

            await newUser.save()

            //
             console.log("User registered:", newUser);
             //
            res.status(200).json(newUser)
        }


    } catch (err) {
        console.error("Register Error:", err)
        res.status(401).json(err)
    }



}
// login

exports.loginController = async (req, res) => {
    console.log("inside login controller");
    const { email, password } = req.body
    console.log(email, password);
    try {
        const existingUser = await users.findOne({ email });

        if (existingUser) {

            // Compare entered password with hashed password
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            ///
            // console.log("Is Password Valid:", isPasswordValid);


            if (isPasswordValid) {
                // token genration
                const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD)

                res.status(200).json({
                    user: existingUser, token
                });
            } else {
                res.status(401).json("Incorrect password");
            }




        } else {
            res.status(404).json("User not found. Please register first.");
        }
    } catch (err) {
        res.status(401).json(err)
    }


}


// profile updation

exports.editUserController = async (req, res) => {
    console.log("editUserController");
    const { username, email, password, profilePic } = req.body
    const uploadProfilePic = req.file ? req.file.filename : profilePic
    

    const userId = req.userId

    try {
        const updatedUser = await users.findByIdAndUpdate({ _id: userId }, { username, email, password, profilePic: uploadProfilePic }, { new: true })
        await updatedUser.save()
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(401).json(err)
    }
    //  try {
    //     // Prepare fields to update
    //     const updatedFields = {
    //         username,
    //         email,
    //         profilePic: uploadProfilePic,
    //     };

    //     // Hash password if provided
    //     if (password) {
    //         const salt = await bcrypt.genSalt(10);
    //         const hashedPassword = await bcrypt.hash(password, salt);
    //         updatedFields.password = hashedPassword;
    //     }

    //     // Update user with new fields
    //     const updatedUser = await users.findByIdAndUpdate(
    //         { _id: userId },
    //         updatedFields,
    //         { new: true }
    //     );
    //     //   await updatedUser.save()
    //     res.status(200).json(updatedUser);
    // } catch (err) {
    //     res.status(401).json(err);
    // }

}






  //  try {
    //     const userToUpdate = await users.findById(userId);
    //     if (!userToUpdate) {
    //         return res.status(404).json("User not found");
    //     }

    //     // Update fields
    //     userToUpdate.username = username || userToUpdate.username;
    //     userToUpdate.email = email || userToUpdate.email;
    //     userToUpdate.profilePic = uploadProfilePic || userToUpdate.profilePic;

    //     // If password is provided, it'll be hashed in pre("save")
    //     if (password) {
    //         userToUpdate.password = password;
    //     }

    //     await userToUpdate.save(); // triggers pre-save for hashing password

    //     // Remove hashed password before sending response
    //     const { password: pwd, ...userWithoutPassword } = userToUpdate._doc;

    //     res.status(200).json(userWithoutPassword);
    // } catch (err) {
    //     res.status(401).json(err);
    // }


    //      try {
    //     const updatedFields = {
    //       username,
    //       email,
    //       profilePic: uploadProfilePic,
    //     };

    //     // If new password is given, hash it before saving
    //     if (password) {
    //       const salt = await bcrypt.genSalt(10);
    //       const hashedPassword = await bcrypt.hash(password, salt);
    //       updatedFields.password = hashedPassword;
    //     }

    //     const updatedUser = await users.findByIdAndUpdate(
    //       { _id: userId },
    //       updatedFields,
    //       { new: true }
    //     );

    //     res.status(200).json(updatedUser);
    //   } catch (err) {
    //     res.status(401).json(err);
    //   }

    // try {
    //     const updatedFields = {
    //         username,
    //         email,
    //         profilePic: uploadProfilePic,
    //     };

    //     // If new password is given, hash it before saving
    //     if (password) {
    //         const salt = await bcrypt.genSalt(10);
    //         const hashedPassword = await bcrypt.hash(password, salt);
    //         updatedFields.password = hashedPassword;
    //     }

    //     const updatedUser = await users.findByIdAndUpdate(
    //         { _id: userId },
    //         updatedFields,
    //         { new: true }
    //     );
    //     console.log("Updated Password:", updatedUser.password);

    //     // Remove hashed password from the response
    //     const { password: pwd, ...userWithoutPassword } = updatedUser._doc;

    //     res.status(200).json(userWithoutPassword);
    // } catch (err) {
    //     res.status(401).json(err);
    // }



