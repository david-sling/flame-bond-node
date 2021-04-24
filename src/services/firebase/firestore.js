const admin = require("./init");

db = admin.firestore();

const get = async (email, collection) => {
  var ref = db.collection("_users").doc(email).collection(collection);
  const snapshot = await ref.get();
  const data = snapshot.docs.map((doc, idx) => {
    return { ...doc.data(), id: doc.id, idx };
  });
  return data;
};

const getOne = async (email, collection, doc) => {
  var ref = db.collection("_users").doc(email).collection(collection).doc(doc);
  const snapshot = await ref.get();
  const data = snapshot.data();
  return data;
};

const add = async (email, collection, object) => {
  const res = await db
    .collection("_users")
    .doc(email)
    .collection(collection)
    .add({
      ...object,
      _dateCreated: admin.firestore.FieldValue.serverTimestamp(),
      _dateUpdated: admin.firestore.FieldValue.serverTimestamp(),
    });
  return res.id;
};

const set = async (email, collection, doc, object, create = false) => {
  var obj = {
    ...object,
    _dateUpdated: admin.firestore.FieldValue.serverTimestamp(),
  };
  if (create)
    obj = {
      ...obj,
      _dateCreated: admin.firestore.FieldValue.serverTimestamp(),
    };
  await db
    .collection("_users")
    .doc(email)
    .collection(collection)
    .doc(doc)
    .set(obj, { merge: true });
  return obj;
};

const remove = async (email, collection, doc) => {
  const res = await db
    .collection("_users")
    .doc(email)
    .collection(collection)
    .doc(doc)
    .delete();
  return res;
};

module.exports = { get, getOne, add, set, remove };
