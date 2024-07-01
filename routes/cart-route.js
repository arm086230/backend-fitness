const express =  require("express")
const authenticate = require("../middlewares/authenticate")
const cartcontroller = require("../controllers/cart-controller")
const router = express.Router()

router.get("/getcart", authenticate,cartcontroller.getcart)
router.post("/postcart/:id" , authenticate,cartcontroller.postcart)
router.delete("/deletecart/:id" , authenticate,cartcontroller.deleteCartItems)
module.exports = router