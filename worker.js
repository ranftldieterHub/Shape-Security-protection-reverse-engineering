var delay = require('delay');
var crypto = require('crypto');
const { workerData, parentPort } = require('worker_threads');
var mysql = require('mysql2/promise');
var util = require('util');

getShapeData(workerData).catch((e)=>{
  console.log(e);
  parentPort.postMessage([{status: 'error'}])
})

async function getShapeData(data) {
  var info = data[0];
  var toEval = data[1];

  var initTime = Date.now()

  var [toEval, encData] = toEval.split('\n');
  encData = encData.match(/initCustomEvent\(\"(.+?)\",false,false,(.+?)\);/);
  var eventType = encData[1];
  var encData = JSON.parse(encData[2].split(',typeof')[0] + ']');

  var eventsFuncs = {};
  var window = {};
  window.window = window;
  window.addEventListener = function(name, func) {
    eventsFuncs[name] = func;
    window.initEvent = function() {
      func({
        detail: [...encData, undefined],
        isTrusted: false,
        type: eventType,
        target: window,
        currentTarget: window,
        eventPhase: 2,
        bubbles: false,
        cancelable: false,
        defaultPrevented: false,
        composed: false,
        timeStamp: 2692.9699999745935,
        srcElement: window,
        returnValue: true,
        cancelBubble: false,
        path: [window]
      });
    }
  };
  window.removeEventListener = function() {};
  window.screen = {
    availWidth: info.screen.width,
    availHeight: info.screen.height,
    width: info.screen.width,
    height: info.screen.height,
    colorDepth: 24,
    pixelDepth: 24,
    availLeft: 0,
    availTop: 0
  }
  window.Object = Object;
  window.Date = Date;
  window.Function = Function;
  window.Math = Math;
  window.String = String;
  window.Array = Array;
  window.parseInt = parseInt;
  window.undefined = undefined;
  window.isFinite = isFinite;
  window.Infinity = Infinity;
  window.unescape = unescape;
  window.JSON = JSON;
  window.setTimeout = setTimeout;
  window.console = console;
  // window.console.log = function log(){};
  window.Error = Error;
  window.TypeError = TypeError;
  window.HTMLFormElement = function HTMLFormElement() {};
  window.Event = function Event() {};
  window.encodeURIComponent = encodeURIComponent;
  window.fetch = function() {};
  window.navigator = {
    "appCodeName": "Mozilla",
    "appName": "Netscape",
    "appVersion": `5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${info.useragent} Iron Safari/537.36`,
    "buildID": null,
    "cpuClass": null,
    "hardwareConcurrency": 2,
    "maxTouchPoints": 0,
    "platform": "Win32",
    "product": "Gecko",
    "productSub": "20030107",
    "oscpu": null,
    "userAgent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${info.useragent} Iron Safari/537.36`,
    "vendor": "Google Inc.",
    "vendorSub": "",
    "doNotTrack": "1",
    "webdriver": false,
  }
  window.navigator.plugins = {
    0: {
      name: "Chrome PDF Plugin",
      filename: "internal-pdf-viewer",
      description: "Portable Document Format",
    }
  }
  window.navigator.mimeTypes = {
    0: {
      type: "application/x-google-chrome-pdf",
      suffixes: "pdf",
      description: "Portable Document Format",
    }
  }
  window.navigator.plugins[0][0] = window.navigator.mimeTypes[0];
  window.navigator.mimeTypes[0].enabledPlugin = window.navigator.plugins[0];
  window.navigator.mediaDevices = {
    enumerateDevices() {
      return new Promise((resolve, reject) => {
        resolve([{
          "deviceId": "default",
          "kind": "audioinput",
          "label": "",
          "groupId": "a3c9effd32ef010ee883643981bafa3fc78a8e9fc7c841fad03808449db04b31"
        }, {
          "deviceId": "communications",
          "kind": "audioinput",
          "label": "",
          "groupId": "a3c9effd32ef010ee883643981bafa3fc78a8e9fc7c841fad03808449db04b31"
        }, {
          "deviceId": "b4234cf3bf849ee664238a18b05db928a71380ed43524e250bf3eafeef844fa9",
          "kind": "audioinput",
          "label": "",
          "groupId": "a3c9effd32ef010ee883643981bafa3fc78a8e9fc7c841fad03808449db04b31"
        }, {
          "deviceId": "8b786868a7f22969d5c5ac047f9efe65d10b49a5162424187cc1a15778bdb986",
          "kind": "audioinput",
          "label": "",
          "groupId": "a3c9effd32ef010ee883643981bafa3fc78a8e9fc7c841fad03808449db04b31"
        }])
      })
    }
  }
  window.Image = function() {};
  window.indexedDB = {
    open: function open() {}
  }
  window.history = {
    length: randInt(4, 10)
  }
  window.localStorage = {
    key() {},
    setItem(name, value) {
      window.localStorage[name] = value;
    },
    getItem(name) {
      return window.localStorage[name];
    },
    removeItem(name) {
      window.localStorage[name] = undefined;
    },
    clear(){
      console.log('clear',arguments);
    }
  }
  window.document = {};
  window.document.visibilityState = "visible";
  window.document.querySelectorAll = function querySelectorAll() {
    return []
  };
  window.document.addEventListener = window.addEventListener;
  window.document.createEvent = function(name) {
    return {
      initCustomEvent: function(type, canBubble, cancelable, detail) {
        this.type = type;
        this.canBubble = canBubble;
        this.detail = detail;
        this.isTrusted = false;
        this.target = null;
        this.currentTarget = null;
        this.eventPhase = 0;
        this.bubbles = canBubble;
        this.cancelable = cancelable;
        this.defaultPrevented = false;
        this.composed = false;
        this.timeStamp = 2692.9699999745935;
        this.srcElement = null;
        this.returnValue = true;
        this.cancelBubble = false;
      }
    }
  };
  window.dispatchEvent = function() {
    return true;
  };
  window.document.createElement = function() {
    if (arguments[0] == 'a') {
      return {
        host: "",
        protocol: "https:",
        hostname: "",
        port: "",
        pathname: "/bff/account/signin",
        search: ""
      }
    }
    if (arguments[0] == 'canvas') {
      return {
        toDataURL(text) {
          if (text == 'image/png') {
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwA  asdasdsad'
          }
        },
        getContext() {
          if (arguments[0] == 'webgl') {
            return {
              getParameter() {
                return {}
              },
              getExtension() {
                return 1
              },
              getContextAttributes() {
                return {}
              },
              getSupportedExtensions() {
                return []
              }
            }
          } else {
            return {
              measureText(font) {
                switch (font) {
                  case '50px sans-serif':
                    return {
                      width: 136.2060546875
                    }
                    case '50px serif':
                      return {
                        width: 136.0107421875
                      }
                      default:
                        return {
                          width: 136.0107421875
                        }
                }
              },
              fillText() {}
            }
          }
        }
      }
    }
    return {
      type: arguments[0]
    }
  };
  var document = window.document;
  window.XMLHttpRequest = class XMLHttpRequest {
    constructor() {}
    setRequestHeader() {}
    open() {}
    send() {}
    addEventListener() {}
  }
  var addit = randInt(1500, 10000)
  window.requestAnimationFrame = function requestAnimationFrame(cb) {
    addit += randInt(20, 100);
    cb(Date.now() - initTime + addit + parseFloat(Math.random().toFixed(2)))
  }
  window.cancelAnimationFrame = function cancelAnimationFrame() {}
  window.setTimeout = function(fn, d) {
    fn()
  };
  var body = {
    id: ""
  };
  window.document.body = body;

  var funcStMatch = toEval.substring(toEval.indexOf('{'), toEval.lastIndexOf('}'));
  var funcStats = {
    length: funcStMatch.length + 38,
    whitespace: (funcStMatch.match(/\s/g) || []).length,
    punctuators: (funcStMatch.match(/[.{([,;=/]/g) || []).length - 2
  }

  var psHandlerMatch = toEval.match(/return function\(\w\w\){/);
  var headersHandlerMatch = toEval.match(/(return function\(\w\w,\w\w,\w\w\){)return (\w\(\w\w,this,arguments\))/);

  toEval = toEval.replace(psHandlerMatch[0], psHandlerMatch[0] + `if(arguments[0]&&arguments[0].positionalSignals!=undefined){if(!generated){[generated,timeDelay]=generatePayload(info,funcStats,initTime,arguments[0],donor,dataFromBase)}arguments[0]=generated;}`);
  toEval = toEval.replace(headersHandlerMatch[0], headersHandlerMatch[1] + `var ret=${headersHandlerMatch[2]};if(typeof ret=='object'&&ret['X-DQ7Hy5L1-a']!=undefined){headers=ret}return ret`);

  toEval += ';window.initEvent()';

  var generated, headers;
  eval(toEval);
  eventsFuncs.DOMContentLoaded({
    type: "DOMContentLoaded"
  });
  eventsFuncs.deviceorientation.call(window, {
    type: "deviceorientation",
    absolute: false,
    alpha: null,
    beta: null,
    gamma: null,
  });
  eventsFuncs.keyup({
    type: "keyup",
    key: "Tab",
    code: "Tab",
    location: 0,
    ctrlKey: false,
    shiftKey: true,
    altKey: false,
    metaKey: false,
    repeat: false,
    charCode: 0,
    keyCode: 9,
    target: body,
  });
  await delay(20)

  var base = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'worker',
    password: 'toor',
    database: 'shape',
  });
  var donor = (await base.execute('SELECT `idrawdata`,`9`,`10`,`14`,`25`,`27` FROM `shape`.`sorted` ORDER BY RAND() LIMIT 1;'))[0][0];
  var dataFromBase = {};
  var dataNumbers = [11, 4, 34, 30, 3, 33, 28, 0, 6, 8, 16];
  for (let i in dataNumbers) {
    dataFromBase = {
      ...dataFromBase,
      ...(await base.execute('SELECT `' + dataNumbers[i] + '` FROM `shape`.`sorted` ORDER BY RAND() LIMIT 1;'))[0][0]
    }
  }
  base.close();

  var login = new window.XMLHttpRequest();
  login.open('POST', '/bff/account/signin', false);
  login.send('');

  console.log(util.inspect(generated, {showHidden: false, depth: null}) + '\n'.repeat(5));
  parentPort.postMessage([{status: 'success', ...headers}, timeDelay]);
}

function generatePayload(info, funcStats, initTime, original, donor, dataFromBase) {
  var timeCoeff = 1 + (Math.random() * (0.25 - (-0.25)) + (-0.25));
  var timestamps = deserialize(donor[25]);
  for (var i = 1; i < timestamps.length; i++) {
    timestamps[i] = Math.round(timestamps[i] * timeCoeff)
  }
  timestamps[0] = initTime + randInt(5, 100);
  var timeDelay = initTime + timestamps[3] - Date.now();

  var generated = {
    signals: original.signals,
    positionalSignals: [],
    errors: [],
  };
  for (var i = 0; i < generated.signals.length; i++) {
    if (generated.signals[i][0] == "custom_ChromeConsole") {
      generated.signals[i][1] = false;
    } else if (generated.signals[i][0] == 'custom_webRTC') {
      generated.signals[i][1] = [];
    }
  }
  var ps = (new Array(35)).fill({});
  for (var i = 0; i < 35; i++) {
    switch (typeof original.positionalSignals[i]) {
      case 'object':
          if (Array.isArray(original.positionalSignals[i])) {
             if (original.positionalSignals[i].length == 20) {
               ps[i] = deserialize(dataFromBase[11]);
             } else if (original.positionalSignals[i].length == 4) {
               ps[i] = timestamps;
             } else if (original.positionalSignals[i].length == 3) {
               var deviceCount = randInt(1,6);
               ps[i] = [];
               for (var j = 0; j < deviceCount; j++) {
                 ps[i].push(crypto.randomBytes(32).readInt32BE());
               }
             } else if (original.positionalSignals[i].length == 1) {
               let keyevents = deserialize(donor[9]);
               for (var j = 0; j < keyevents.length; j++) {
                 keyevents[j].timestamp = Math.round(keyevents[j].timestamp * timeCoeff)
               }
               ps[i] = keyevents;
             } else {
               ps[i] = original.positionalSignals[i];
             }
             break;
          } else if (Object.keys(original.positionalSignals[i]).length == 0) {
            ps[i] = original.positionalSignals[i];
            break;
          } else if (original.positionalSignals[i].hasOwnProperty('screen')) {
            ps[i] = deserialize(donor[27]);
          } else if (original.positionalSignals[i].hasOwnProperty('mathProperties')) {
            ps[i] = deserialize(dataFromBase[4]);
          } else if (original.positionalSignals[i].hasOwnProperty('stack')) {
            ps[i] = deserialize(dataFromBase[34]);
          } else if (original.positionalSignals[i].hasOwnProperty('bodyAttribute')) {
            ps[i] = {
              bodyAttribute: false,
              scriptPresent: false
            };
          } else if (original.positionalSignals[i].hasOwnProperty('hasGlobal')) {
            ps[i] = {
              hasGlobal: false,
              hasProcess: false,
              hasArguments: true,
              argumentsValue: "{\"0\":{\"isTrusted\":false}}",
              argumentsHasCycle: false
            };
          } else if (original.positionalSignals[i].hasOwnProperty('immediately')) {
            ps[i] = deserialize(dataFromBase[30]);
          } else if (original.positionalSignals[i].hasOwnProperty('whitespace')) {
            ps[i] = funcStats;
          } else if (original.positionalSignals[i].hasOwnProperty('exists')) {
            ps[i] = {
              "exists": true,
              "falsy": true,
              "nullish": true,
              "callable": true,
              "documentElement": true,
              "type": "undefined"
            };
          } else if (original.positionalSignals[i].hasOwnProperty('historyLength')) {
            ps[i] = {
              "historyLength": randInt(1, 15),
              "emptyReferrer": Boolean(randInt(0, 1))
            };
          } else if (original.positionalSignals[i].hasOwnProperty('timestamp')) {
            ps[i] = {
              timestamp: initTime
            };
          } else if (original.positionalSignals[i].hasOwnProperty('mouseButtonEvents')) {
            ps[i] = deserialize(donor[10]);
            for (var j = 0; j < ps[i].mouseButtonEvents.length; j++) {
              ps[i].mouseButtonEvents[j].timestamp = Math.round(ps[i].mouseButtonEvents[j].timestamp * timeCoeff);
            }
            for (var j = 0; j < ps[i].mouseMoveEvents.recent.length; j++) {
              ps[i].mouseMoveEvents.recent[j].timestamp = Math.round(ps[i].mouseMoveEvents.recent[j].timestamp * timeCoeff);
            }
            for (var j = 0; j < ps[i].mouseMoveEvents.throttled.length; j++) {
              ps[i].mouseMoveEvents.throttled[j].timestamp = Math.round(ps[i].mouseMoveEvents.throttled[j].timestamp * timeCoeff);
            }
          } else if (original.positionalSignals[i].hasOwnProperty('initialState')) {
            ps[i] = deserialize(donor[14]);
            for (var j = 0; j < ps[i].events.length; j++) {
              ps[i].events[j].timestamp = Math.round(ps[i].events[j].timestamp * timeCoeff)
            }
          } else if (original.positionalSignals[i].hasOwnProperty('crypto')) {
            ps[i] = deserialize(dataFromBase[3]);
          } else if (original.positionalSignals[i].hasOwnProperty('mpeg')) {
            ps[i] = deserialize(dataFromBase[33]);
          } else if (original.positionalSignals[i].hasOwnProperty('fonts')) {
            ps[i] = deserialize(dataFromBase[28]);
          } else if (original.positionalSignals[i].hasOwnProperty('shaderPrecisions')) {
            ps[i] = deserialize(dataFromBase[0]);
          } else if (original.positionalSignals[i].hasOwnProperty('dataFragment')) {
            ps[i] = deserialize(dataFromBase[6]);
          } else if (original.positionalSignals[i].hasOwnProperty('numOrientationEvents')) {
            ps[i] = {
              "numOrientationEvents": 1,
              "avgInterval": 0,
              "avgAlpha": null,
              "avgBeta": null,
              "avgGamma": null,
              "stdDevInterval": 0,
              "stdDevAlpha": 0,
              "stdDevBeta": 0,
              "stdDevGamma": 0
            };
          } else if (original.positionalSignals[i].hasOwnProperty('plugins')) {
            ps[i] = {
              "plugins": info.plugins,
              "hasDefaultBrowserHelper": false,
              "numberOfPlugins": info.plugins.length,
              "hasWidevinePlugin": false
            };
          } else if (original.positionalSignals[i].hasOwnProperty('hasToSource')) {
            ps[i] = deserialize(dataFromBase[8]);
          } else {
            ps[i] = original.positionalSignals[i];
          }
        break;
      case 'number':
        if (original.positionalSignals[i] != 18446744073709550000) {
          ps[i] = deserialize(dataFromBase[16]);
        } else if (original.positionalSignals[i] == 18446744073709550000) {
          ps[i] = 18446744073709550000
        }
        break;
      case 'string':
        ps[i] = info.timezone;
        break;
      case 'boolean':
        ps[i] = original.positionalSignals[i];
        break;
      default:
        ps[i] = original.positionalSignals[i];
    }
  }
  generated.positionalSignals = ps;
  return [generated, timeDelay];
}

function randInt(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function deserialize(string) {
  return eval(`(${string})`);
}
