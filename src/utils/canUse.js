const canUse = (strArr) => {
  var can = true;
  strArr.forEach((str) => {
    if (str[0] == "_") {
      can = false;
      return;
    }
  });
  return can;
};
module.exports = canUse;
