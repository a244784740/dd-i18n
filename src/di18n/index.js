
var that;
var DI18n = function(options) {
    this.local = options.local;
    this.defaultLang = options.defaultLang;
    this.messages = options.messages;
    that = this;
};

var findKey = function(obj, chars, keyChains, findCallBack) {
    var haveFind = false;
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {

            const element = obj[key];
            if (typeof element !== 'string') {
                keyChains.push(key);
                if (!findKey(element, chars, keyChains, findCallBack)) {
                    keyChains.shift();
                } else {
                    return true;
                }
            }
            if (element === chars) {
                haveFind = true;
                keyChains.push(key);
                findCallBack(keyChains);
                return true;
            }
            
        }
    }
    
    if (!haveFind) {
        return false;
    }
};

var DEvent = (function() {
    var clientList = {},
    listen,
    trigger,
    remove;
    listen = function(key, fn) {
        if (!clientList[key]) {
            clientList[key] = [];
        }
        clientList[key].push(fn);
    };
    trigger = function() {
        var key = Array.prototype.shift.call(arguments),
        fns = clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (let index = 0; index < fns.length; index++) {
            const fn = fns[index];
            fn.apply(this, arguments);
        }
    };
    remove = function(key, fn) {
        var fns = clientList[key];
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (var l = fn.length - 1; l > 0 ; l--) {
                var _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1);
                }
            }
        }
    };
    return {
        listen,
        trigger,
        remove
    };
})();

DI18n.prototype.dEvent = DEvent;

var caches = {};

DI18n.prototype.dl = function(chars) {
    let defaultLang = that.defaultLang || 'zh-CN';
    let messages = that.messages;
    var langPackeage = messages;
    let curLang = that.local || defaultLang;
    if (defaultLang === curLang) {      // 当前语言与默认语言相同，不用翻译
        return chars;
    }
    var keyChains = [];
    if (caches.hasOwnProperty(chars)) {     // 缓存里有keyChains
        keyChains = caches[chars];
    } else {
        var defaultPageage = langPackeage[defaultLang];
        findKey(defaultPageage, chars, [], (kChains => {
            if (!caches.hasOwnProperty(chars)) {
                caches[chars] = keyChains = kChains;
            }
        }));
    }    
    var trans = langPackeage[curLang];
    var findTrans = true;
    keyChains.forEach(key => {
        if (trans.hasOwnProperty(key)) {
            trans = trans[key];
        } else {
            findTrans = false;
        }
    });
    trans = findTrans ? trans : chars;

    return trans;
};



export default DI18n;