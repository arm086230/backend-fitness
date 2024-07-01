const db = require("../models/db");

exports.getcart = async (req, res, next) => {
  try {
    const getcarts = await db.cart.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        CartItems: {
          include: {
            product: true,
          },
        },
      },
    });
    // const carts = await db.cartItems.findMany({
    //     where:{
    //         cartId: getcarts.id,
    //     }
    // })
    res.json(getcarts);
  } catch (err) {
    next(err);
  }
};

exports.postcart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getcart = await db.cart.findFirst({
      where: {
        userId: req.user.id,
        cartStatus: "Pending",
      },
    });
    if (!getcart) {
      const newcart = await db.cart.create({
        data: {
          userId: req.user.id,
          cartStatus: "Pending",
        },
      });
      const cartitems = await db.cartItems.create({
        data: {
          productId: +id,
          cartId: newcart.id,
        },
      });
      res.json(cartitems);
    }
    const cartitems = await db.cartItems.create({
      data: {
        productId: +id,
        cartId: getcart.id,
      },
    });
    res.json(cartitems);
  } catch (err) {
    next(err);
  }
};

exports.deleteCartItems = async (req, res, next) => {
    try {
      const { id } = req.params;
      await db.cartItems.delete({
        where: { id: +id },
      });
      res.json({ message: "Deleted cart" });
    } catch (err) {
      next(err);
    }
}
