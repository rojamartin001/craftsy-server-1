const express = require('express')
const userController = require('../controllers/userController')
const craftController = require("../controllers/craftController")
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')

const router = new express.Router()


// register: http://localhost:3000/register
router.post('/register',userController.registerController)

// login: http://localhost:3000/login
router.post('/login',userController.loginController)

// add-craft: http://localhost:3000/add-Craft
router.post('/add-craft',jwtMiddleware,multerMiddleware.single('image'),craftController.addCraftController)

// home-craft: http://localhost:3000/home-craft
router.get('/home-craft',craftController.homePageCraftController)

// all-craft: http://localhost:3000/all-craft
router.get('/all-craft',jwtMiddleware,craftController.allCraftController)

// all-user: http://localhost:3000/user-craft
router.get('/user-craft',jwtMiddleware,craftController.userCraftController)

// crafts/10/edit: http://localhost:3000/crafts/id/edit
router.put('/crafts/:id/edit',jwtMiddleware,multerMiddleware.single('image'),craftController.editCraftController)

// crafts/id/remove: http://localhost:3000/crafts/id/remove
router.delete('/crafts/:id/remove',jwtMiddleware,craftController.removeCraftController)

// edit-user: http://localhost:3000/edit-user
router.put('/edit-user',jwtMiddleware,multerMiddleware.single('profilePic'),userController.editUserController)




module.exports = router