/**
 * JS HELPER FILE
 */


/**
 * To know if something is not null and not undefined
 * @param {Object} something
 */
function notNull (something)
{
    return (something !== undefined && something !== null && something !== 'undefined' && something !== 'null');
}

function mergeObject(o1,o2){
    var o3 = {}, attrname;
    for (attrname in o1) { o3[attrname] = o1[attrname]; }
    for (attrname in o2) { o3[attrname] = o2[attrname]; }
    return o3;
}

// Override array prototype
Array.prototype.shuffle = function() {
    this.sort(function() { return 0.5 - Math.random() })
};

if (!Array.prototype.map){
  Array.prototype.map = function (fun /*, thisp*/)
  {
    var len = this.length, i, res, thisp;
    if (typeof fun != "function") throw new TypeError();

    res = new Array(len);
    thisp = arguments[1];
    for (i = 0; i < len; i++) {
        if (i in this) res[i] = fun.call(thisp, this[i], i, this);
    }
    return res;
  };
}
if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp*/) {
        var len = this.length >>> 0, res, thisp, i, val;
        if (typeof fun != "function") throw new TypeError();

        res = [];
        thisp = arguments[1];
        for (i = 0; i < len; i++) {
            if (i in this) {
                val = this[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, this)) res.push(val);
            }
        }
        return res;
    };
}

function unwrapStringOrNumber(obj) {
    return (obj instanceof Number || obj instanceof String ? obj.valueOf() : obj);
}
function egale(a, b) {
    a = unwrapStringOrNumber(a);
    b = unwrapStringOrNumber(b);
    if (a === b) return true; //e.g. a and b both null
    if (a === null || b === null || typeof (a) !== typeof (b)) return false;
    if (a instanceof Date) 
        return b instanceof Date && a.valueOf() === b.valueOf();
    if (typeof (a) !== "object") 
        return a == b; //for boolean, number, string, xml

    var newA = (a.areEquivalent_Eq_91_2_34 === undefined),
        newB = (b.areEquivalent_Eq_91_2_34 === undefined);
    try {
        if (newA) a.areEquivalent_Eq_91_2_34 = [];
        else if (a.areEquivalent_Eq_91_2_34.some(
            function (other) { return other === b; })) return true;
        if (newB) b.areEquivalent_Eq_91_2_34 = [];
        else if (b.areEquivalent_Eq_91_2_34.some(
            function (other) { return other === a; })) return true;
        a.areEquivalent_Eq_91_2_34.push(b);
        b.areEquivalent_Eq_91_2_34.push(a);

        var tmp = {};
        for (var prop in a) 
            if(prop != "areEquivalent_Eq_91_2_34") 
                tmp[prop] = null;
        for (var prop in b) 
            if (prop != "areEquivalent_Eq_91_2_34") 
                tmp[prop] = null;

        for (var prop in tmp) 
            if (!egale(a[prop], b[prop]))
                return false;
        return true;
    } finally {
        if (newA) delete a.areEquivalent_Eq_91_2_34;
        if (newB) delete b.areEquivalent_Eq_91_2_34;
    }
}
