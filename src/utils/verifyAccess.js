const firestore = require("../services/firebase/firestore");

const verifyAccess = (type) => async (req, res, next) => {
  try {
    const { email, collection } = req.params;
    const schema = await firestore.getOne(email, "_collections", collection);
    if (!schema)
      return res.send({
        error: `Route "${email}/${collection} does not exist"`,
        success: false,
      });
    const { public } = schema;
    if (!public?.[type])
      return res.send({ error: "Access Denied!", success: false });
    next();
  } catch ({ message: error }) {
    console.log({ error, success: false });
    res.send({ error, success: false });
  }
};

module.exports = verifyAccess;
