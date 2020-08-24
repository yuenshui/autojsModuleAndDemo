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
function httpClass() {
  var httpObj = {};
  httpObj.timeout = 10000;
  httpObj.request = function(url, options, callback) {
    if(!options) options = {};
    if(options.timeout) httpObj.timeout = options.timeout;
    else options.timeout = httpObj.timeout;

    if(typeof httpObj.timeout === 'number') httpObj.timeout = parseInt(httpObj.timeout);

    if("function" == typeof callback) {
      return requestAsyn(url, options, callback);
    } else {
      return requestSync(url, options);
    }
  }

  function requestSync(url, options) {
    var response;
    var thread = threads.start(function() {
      try {
        response = http.request(url, options);
      } catch (e) {
        // 拦截错误：[JavaException: java.lang.RuntimeException: java.lang.InterruptedException]
        // 线程被杀死时会产生这个错误
      }
    });
    thread.join(options.timeout);
    if(response) {
      return response;
    } else {
      thread.interrupt();
      return {
        statusCode: 408,
        statusMessage: "Request Timeout"
      };
    }
  }

  function requestAsyn(url, options, callback) {
    var timeId = setTimeout(() => {
      try {
        thread.interrupt();
        callback({
          statusCode: 408,
          statusMessage: "Request Timeout"
        });
      } catch(e) {
        console.error(e);
      }
    }, options.timeout);
    var thread = threads.start(function() {
      http.request(url, options, response => {
        clearTimeout(timeId);
        callback(response);
      });
    });
  }

  httpObj.get = function(url, options, callback) {
    if(!options) options = {};
    options.method = "GET";
    return httpObj.request(url, options, callback);
  }

  httpObj.post = function(url, options, callback) {
    if(!options) options = {};
    options.method = "POST";
    return httpObj.request(url, options, callback);
  }

  httpObj.postJson = function(url, data, options, callback) {
    if(!options) options = {};
    options.method = "POST";
    options.body = JSON.stringify(data);
    if(!options.headers) options.headers = {};
    options.headers["Content-Type"] = "application/json";

    return httpObj.request(url, options, callback);
  }

  httpObj.postMultipart = function(url, files, options, callback) {
    if(!options) options = {};
    if(options.timeout) httpObj.timeout = options.timeout;
    else options.timeout = httpObj.timeout;

    if(typeof httpObj.timeout === 'number') httpObj.timeout = parseInt(httpObj.timeout);

    if("function" == typeof callback) {
      return postMultipartAsyn(url, files, options, callback);
    } else {
      return postMultipartSync(url, files, options);
    }
  }

  function postMultipartSync(url, files, options) {
    var response;
    var thread = threads.start(function() {
      try {
        response = http.postMultipart(url, files, options);
      } catch (e) {
        console.error(e)
        // 拦截错误：[JavaException: java.lang.RuntimeException: java.lang.InterruptedException]
        // 线程被杀死时会产生这个错误
      }
    });
    thread.join(options.timeout);
    if(response) {
      return response;
    } else {
      thread.interrupt();
      return {
        statusCode: 408,
        statusMessage: "Request Timeout"
      };
    }
  }

  function postMultipartAsyn(url, files, options, callback) {
    var timeId = setTimeout(() => {
      try {
        thread.interrupt();
        callback({
          statusCode: 408,
          statusMessage: "Request Timeout"
        });
      } catch(e) {
        console.error(e);
      }
    }, options.timeout);
    var thread = threads.start(function() {
      http.postMultipart(url, files, options, response => {
        clearTimeout(timeId);
        callback(response);
      });
    });
  }

  httpObj.put = function(url, options, callback) {
    if(!options) options = {};
    if(!options.headers) options.headers = {};
    options.method = "PUT";
    if(options.file) {
      try {
        options.body = files.read(options.file);
        if(options.fileName) options.headers["File-Name"] = options.fileName
      } catch(e) {
        console.error("read file error:", e);
      }
    }
    return httpObj.request(url, options, callback);
  }
  
  return httpObj;
}

module.exports = function() {
  return new httpClass();
}
