const firestore = require("../services/firebase/firestore");

const verifyAccess = (type) => async (req, res, next) => {
  try {
    const { email, collection } = req.params;
    const { public } = await firestore.getOne(
      email,
      "_collections",
      collection
    );
    if (!public?.[type])
      return res.send({ error: "Access Denied!", success: false });
    next();
  } catch ({ message: error }) {
    console.log({ error, success: false });
    res.send({ error, success: false });
  }
};

module.exports = verifyAccess;
