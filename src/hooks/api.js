const BackendAPI2 = "https://confused-pink-chimpanzee.cyclic.app";
// const BackendAPI = "https://codeflow-3ir4.onrender.com";
const BackendAPI = "http://localhost:5500";
export default BackendAPI;

export const decodeHtml = (html) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};
