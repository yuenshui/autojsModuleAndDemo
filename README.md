> 收录平时写的或其他朋友的代码，封装整理，方便开发使用。也希望有同样想法的朋友提供代码模块

## 模块
### http模块
> `/modules/http.js`  
> demo: `/demo/http.js`      
> 此模块主要针对`auto.js`提供的`http`模块没有超时选项，可能导致进程卡死的问题      
> `auto.js`原有`http`模块文档：`http://docs.autojs.org/#/http`      

```js
/**
 * 对auto.js原有http模块简单封装
 * request、get、post、postJson、postMultipart方法的使用参考auto.js的http模块文档；options增加了timeout选项，缺省10000毫秒
 * put方法：
 * httpclient.put(url, options, callback)
 * url {string} 请求URL地址
 * options {Object} 请求选项，参考request方法的options说明
 * options.method设置无效，强制为PUT
 * options.timeout 超时时间，可选，单位毫秒缺省为10000
 * options.file PUT上传的文件，可选，由此选项，options.body选项将无效
 * options.fileName 文件名，可选，发送到接口的文件名，和options.file的文件名无关，也可以相同
 * 
 * 1、options增加timeout可选项，缺省10000（10秒）
 * 2、增加put方法
 * @author Mustang (yuenshui@126.com)
 * @license MIT
 */
```
