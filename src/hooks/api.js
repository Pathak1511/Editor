const BackendAPI = "https://medical-stephanie-codeflow.koyeb.app";
// const BackendAPI = "https://codeflow-3ir4.onrender.com";
const BackendAPI2 = "http://localhost:5500";
export default BackendAPI;

export const decodeHtml = (html) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};
