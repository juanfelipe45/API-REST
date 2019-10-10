function verifyString(text) {
  if( text == null || text == undefined || text == "" ) return false;
  return true;
}


module.exports = {
  verifyString
}