
const httpClient = require("../modules/http")();

const APIHOST = "http://192.168.3.68:3000/";
const loginAPI = APIHOST + "sign/login";
const infoAPI = APIHOST + "sign/info";
const testAPI = APIHOST + "sign/test";
const putAPI = APIHOST + "report/log";



// let httpClient = new HTTP();
/*
console.log("start:", new Date().getTime());
let rs = httpClient.get(infoAPI, {
  timeout: 5000
});
console.log("end:", new Date().getTime());
console.log(rs);

console.log("start:", new Date().getTime());
httpClient.get(infoAPI, {
  timeout: 5000
}, response => {
  console.log("end:", new Date().getTime());
  console.log(response);
});
*/
///////////////////
// let rs = httpClient.post(testAPI, {
//   body: "a=b&c=d",
//   timeout: 5000
// });
// console.log("rs:", rs);

/////////////////////////////
// let rs = httpClient.postMultipart(testAPI, {
//   file1: ["theme_3.zip", "/storage/emulated/0/theme/theme_3.zip"],
//   file2: ["Alvin2.xml", "/storage/emulated/0/.UTSystemConfig/Global/Alvin2.xml"]
// });
// console.log("rs:", rs);

let rs = httpClient.put(putAPI, {
  file: "/storage/emulated/0/theme/theme_3.zip",
  fileName: "xxxxxtheme_3.zip"
});

console.log("rs:", rs);
