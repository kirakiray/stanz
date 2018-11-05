((glo) => {
    // public function
    // 获取随机id
    const getRandomId = () => Math.random().toString(32).substr(2);
    let objectToString = Object.prototype.toString;
    const getType = value => objectToString.call(value).toLowerCase().replace(/(\[object )|(])/g, '');
    const isUndefined = val => val === undefined;

    let {
        defineProperty,
        defineProperties,
        assign
    } = Object;

    // 设置不可枚举的方法
    const setNotEnumer = (tar, obj) => {
        for (let k in obj) {
            defineProperty(tar, k, {
                // enumerable: false,
                writable: true,
                value: obj[k]
            });
        }
    }

    //改良异步方法
    const nextTick = (() => {
        let isTick = false;
        let nextTickArr = [];
        return (fun) => {
            if (!isTick) {
                isTick = true;
                setTimeout(() => {
                    for (let i = 0; i < nextTickArr.length; i++) {
                        nextTickArr[i]();
                    }
                    nextTickArr = [];
                    isTick = false;
                }, 0);
            }
            nextTickArr.push(fun);
        };
    })();

    // common
    const EVES = "_eves_" + getRandomId();

    // business function
    const createXData = (obj, options) => {
        let redata = obj;
        switch (getType(obj)) {
            case "object":
            case "array":
                redata = new XData(obj, options);
                break;
        }

        return redata;
    };

    // main class
    function XDataEvent(type, target) {
        assign(this, {
            type,
            keys: [],
        });
        setNotEnumer(this, {
            target,
            stopPropagated: false
        });
    }

    function XData(obj, options = {}) {
        // 生成代理对象
        let proxyThis = new Proxy(this, XDataHandler);

        // 数组的长度
        let length = 0;

        // 非数组数据合并
        Object.keys(obj).forEach(k => {
            // 值
            let value = obj[k];

            if (!/\D/.test(k)) {
                // 数字key
                k = parseInt(k);

                if (k >= length) {
                    length = k + 1;
                }
            }

            // 设置值
            this[k] = createXData(value, {
                parent: proxyThis,
                hostkey: k
            });
        });

        let opt = {
            status: "root",
            // 设置数组长度
            length,
            // 事件寄宿对象
            [EVES]: {}
        };

        if (options.parent) {
            opt.status = "binding";
            opt.parent = options.parent;
            opt.hostkey = options.hostkey;
        }

        // 设置不可枚举数据
        setNotEnumer(this, opt);

        // 返回Proxy对象
        return proxyThis;
    }
    let XDataFn = XData.prototype = {};

    // 数组通用方法
    // 可运行的方法
    ['concat', 'every', 'filter', 'find', 'findIndex', 'forEach', 'map', 'slice', 'some'].forEach(methodName => {
        let arrayFnFunc = Array.prototype[methodName];
        if (arrayFnFunc) {
            defineProperty(XDataFn, methodName, {
                writable: true,
                value(...args) {
                    return arrayFnFunc.apply(this, args);
                }
            });
        }
    });

    // 会影响数组结构的方法
    ['pop', 'push', 'reverse', 'sort', 'splice', 'shift', 'unshift'].forEach(methodName => {
        let arrayFnFunc = Array.prototype[methodName];
        if (arrayFnFunc) {
            defineProperty(XDataFn, methodName, {
                writable: true,
                value(...args) {
                    return arrayFnFunc.apply(this, args);
                }
            });
        }
    });

    // 获取事件数组
    const getEvesArr = (tar, eventName) => tar[EVES][eventName] || (tar[EVES][eventName] = []);

    // 设置数组上的方法
    setNotEnumer(XDataFn, {
        // 事件注册
        on(eventName, callback, options = {}) {
            let eves = getEvesArr(this, eventName);

            // 判断是否相应id的事件绑定
            let oid = options.id;
            if (!isUndefined(oid)) {
                let tarId = eves.findIndex(e => e.eventId == oid);
                (tarId > -1) && eves.splice(tarId, 1);
            }

            // 事件数据记录
            callback && eves.push({
                callback,
                eventId: options.id,
                onData: options.data,
                one: options.one
            });

            return this;
        },
        one(eventName, callback, options = {}) {
            options.one = 1;
            return this.on(eventName, callback, options);
        },
        off(eventName, callback, options = {}) {
            let eves = getEvesArr(this, eventName);
            eves.forEach((opt, index) => {
                // 想等值得删除
                if (opt.callback === callback && opt.eventId === options.id && opt.onData === options.data) {
                    eves.splice(index, 1);
                }
            });
            return this;
        },
        emit(eventName, emitData) {
            let eves, eventObj;

            if (eventName instanceof XDataEvent) {
                eves = getEvesArr(this, eventName.type);

                eventObj = eventName;
            } else {
                eves = getEvesArr(this, eventName);

                // 生成emitEvent对象
                eventObj = new XDataEvent(eventName, this);
            }

            // 事件数组触发
            eves.forEach((opt, index) => {
                // 触发callback
                nextTick(() => {
                    // 添加数据
                    let args = [eventObj];
                    !isUndefined(opt.onData) && (eventObj.data = opt.onData);
                    !isUndefined(opt.eventId) && (eventObj.eventId = opt.eventId);
                    !isUndefined(opt.one) && (eventObj.one = opt.one);
                    !isUndefined(emitData) && (args.push(emitData));

                    opt.callback.apply(this, args);

                    // 删除多余数据
                    delete eventObj.data;
                    delete eventObj.eventId;
                    delete eventObj.one;
                });

                // 判断one
                if (opt.one) {
                    eves.splice(index, 1);
                }
            });

            // 冒泡触发
            let {
                parent
            } = this;
            if (parent) {
                nextTick(() => {
                    eventObj.keys.unshift(this.hostkey);
                });
                parent.emit(eventObj, emitData);
            }

            return this;
        },
        // 设置值
        set(key, value) {

        },
        // 删除值
        remove(key) {
            if (isUndefined(key)) {

            } else {

            }
        },
        // 插入trend数据
        entrend(options) {

        },
        // 同步数据
        sync(xdataObj) {

        },
        watch() {

        },
        unwatch() {

        }
    });

    // 私有属性正则
    const PRIREG = /^_.+|^parent$|^hostkey$|^status$/;

    // handler
    let XDataHandler = {
        set(xdata, key, value, receiver) {
            // if (!PRIREG.test(key)) {
            //     // 设置数据
            //     debugger
            //     return true;
            // }
            return Reflect.set(xdata, key, value, receiver);
        },
        deleteProperty(xdata, key) {
            // if (!PRIREG.test(key)) {
            //     // 删除数据
            //     debugger
            //     return true;
            // }
            return Reflect.deleteProperty(xdata, key);
        }
    };

    // main 

    // init
    glo.stanz = (obj = {}) => createXData(obj);
})(window);