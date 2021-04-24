const express = require("express");
const router = express.Router();
const app = express();
require("dotenv/config");
const firestore = require("./services/firebase/firestore");
const cors = require("cors");
const canUse = require("./utils/canUse");

const bodyParser = require("body-parser");
const verifyAccess = require("./utils/verifyAccess");

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

const { PORT = 9000 } = process.env;

router.get("/:email", (req, res) => {
  res.send(`Welcome to Flamebond database of ${req.params.email}`);
});

//GET COLLECTION
router.get("/:email/:collection", verifyAccess("get"), async (req, res) => {
  try {
    const { email, collection } = req.params;
    const data = await firestore.get(email, collection);
    res.send(data);
  } catch ({ message: error }) {
    console.log({ error });
    res.send({ error, success: false });
  }
});

//GET ENTRY
router.get(
  "/:email/:collection/:doc",
  verifyAccess("getOne"),
  async (req, res) => {
    try {
      const { email, collection, doc } = req.params;
      if (!canUse([email, collection, doc]))
        return res.send({
          error: `First character cannot be "_"`,
          success: false,
        });
      const data = await firestore.getOne(email, collection, doc);
      res.send(data);
    } catch ({ message: error }) {
      console.log({ error, success: false });
      res.send({ error, success: false });
    }
  }
);

//POST ENTRY
router.post("/:email/:collection", verifyAccess("post"), async (req, res) => {
  try {
    const { email, collection } = req.params;
    if (!canUse([email, collection]))
      return res.send({
        error: `First character cannot be "_"`,
        success: false,
      });
    const { _master, fields } = await firestore.getOne(
      email,
      "_collections",
      collection
    );
    const masterField = req.body?.[_master];
    if (!masterField)
      return res.send({
        error: `Field: "${_master}" is required!`,
        success: false,
      });
    const upload = {};
    fields.forEach(({ key }) => {
      upload[key] = req.body?.[key] || null;
    });

    const id = await firestore.add(email, collection, upload);
    res.send({ id, ...upload, success: !!id });
  } catch ({ message: error }) {
    console.log({ error, success: false });
    res.send({ error, success: false });
  }
});

//PATCH ENTRY
router.patch(
  "/:email/:collection/:doc",
  verifyAccess("patch"),
  async (req, res) => {
    try {
      const { email, collection, doc } = req.params;
      if (!canUse([email, collection, doc]))
        return res.send({
          error: `First character cannot be "_"`,
          success: false,
        });
      const { _master, fields } = await firestore.getOne(
        email,
        "_collections",
        collection
      );
      const masterField = req.body?.[_master];
      if (!masterField)
        return res.send({
          error: `Field: "${_master}" is required!`,
          success: false,
        });
      const upload = {};
      fields.forEach(({ key }) => {
        if (req.body?.[key] != undefined) upload[key] = req.body?.[key] || null;
      });

      const obj = await firestore.set(email, collection, doc, upload);
      res.send({ ...obj, success: !!obj });
    } catch ({ message: error }) {
      console.log({ error, success: false });
      res.send({ error, success: false });
    }
  }
);

//DELETE ENTRY
router.delete(
  "/:email/:collection/:doc",
  verifyAccess("delete"),
  async (req, res) => {
    try {
      const { email, collection, doc } = req.params;
      if (!canUse([email, collection, doc]))
        return res.send({
          error: `First character cannot be "_"`,
          success: false,
        });
      const deleted = await firestore.remove(email, collection, doc);
      console.log(deleted);
      res.send({ success: !!deleted });
    } catch ({ message: error }) {
      console.log({ error, success: false });
      res.send({ error, success: false });
    }
  }
);

app.listen(PORT, () => console.log(`Server live at ${PORT}`));

app.use("/api", router);
