let N = {};

/** Interpolation Lineaire */
N.Lerp = function (xi, xf, t) {
    return (1 - t) * xi + t * xf
};

/** Fonction inverse de Lerp */
N.iLerp = function (x, xi, xf) {
    return (x - xi) / (xf - xi)
}

N.Clamp = function (x, min, max) {
    return Math.max(Math.min(x, max), min)
}

/** R-maps a number from one range to another */
N.map = function (x, start1, end1, start2, end2) {
    return N.Lerp(start2, end2, N.iLerp(x, start1, end1))
}

N.get = function (context, by, tag) {
    const e = context || document;
    return e["getElement" + by](tag)
}
N.Get = {
    id: (tag, context) => N.get(context, "ById", tag),
    class: (tag, context) => N.get(context, "sByClassName", tag),
    tag: (tag, context) => N.get(context, 'sByTagName', tag)
};

N.Cr = t => document.createElement(t);

// Est un querySelector in built
N.Select = {
    /** querySelector dans un context absolue */
    el: t => {
        let r = [];
        var s;
        return N.Is.str(t) ? (s = t.substring(1), "#" === t.charAt(0) ? r[0] = N.Get.id(s) : r = N.Get.class(s)) : r[0] = t, r
    },
    type: t => "#" === t.charAt(0) ? "id" : "class",
    name: t => t.substring(1)
}

/** Return l'index de l'element */
N.index = function (el, list) {
    let n = list.length;
    for (let i = 0; i < N; i++)
        if (list[i] === el) return i
    return -1
}


N.Index = {
    /** L'indice de l'element par rapport a son parent */
    list: (el) => N.index(el, el.parentNode.childer),

    /** L'indice de l'element par rapport au element de la meme classe, relatif au contexte */
    // class: (el, nameClass, context)
}

/** Arrondie à la decimal pres, au centieme de base */
N.Round = (x, decimal) => {
    decimal = N.Is.und(decimal) ? 100 : 10 ** decimal;
    return Math.round(x * decimal) / decimal
}

N.Rand = {
    range: (min, max, step) => N.Round(Math.random() * (max - min) + min, step),
    uniq: r => {
        const s = [];
        for (let t = 0; t < r; t++) s[t] = t;
        let t = r;
        for (var e, i; t--;) e = ~~(Math.random() * (t + 1)), i = s[t], s[t] = s[e], s[e] = i;
        return s
    }
}

/** shorthand for hasOwnProperty method */
N.Has = (el, p) => el.hasOwnProperty(p)

N.Is = {
    str: t => 'string' == typeof t,
    obj: t => t === Object(t),
    arr: t => t.constructor === Array,
    def: t => void 0 !== t,
    und: t => void 0 === t
}


N.O = (t, r) => {
    t.style.opacity = r
}
N.pe = (t, r) => {
    t.style.pointerEvents = r
};
N.PE = {
    all: t => {
        R.pe(t, "all")
    },
    none: t => {
        R.pe(t, "none")
    }
};
N.TopReload = () => {
    "scrollRestoration" in history ? history.scrollRestoration = "manual" : window.onbeforeunload = () => {

    }
};

N.T = (el, x, y, unite) => {
    unite = N.Is.und(unite) ? "%" : unite;
    el.style.transform = "translate3d(" + x + unite + "," + y + unite + ",0)"
};

// N.Event(elSelector, addRemove, e, f){
//     let d = document;
//     const newEvent = e;
//     const a = N.Select.el(elSelector);
//     const n = a.length;
//     let v = addRemove ? "add" : "remove";
//     const l = ["wheel", "mousemove", "touchmove", "touchstart"];
//     let p = -1 !== l.indexOf(s) && {
//         passive: !1
//     },
//     for (let i = 0; i < N; i++) {
//         a[t][v + "EventListener"](newEvent, f, p)
//     }
// }

// fonction a reecrire, "mousewheel" et "DOMMouseScroll" est deprecated, use "wheel" istead
// N.L = (elSelector, addRemove, evnt, fonction) => {
//     let i = document;
//     const a = N.Select.el(elSelector);
//     let n = a.length;
//     let newEvent = evnt;
//     let t = "wheel",
//         h = "mouse";
//     const l = [h + "Wheel", h + "move", "touchmove", "touchstart"];
//     let d = -1 !== l.indexOf(s) && {
//         passive: !1
//     },
//         v = (evnt === l[0] ? newEvent = "on" + t in i ? t : N.Is.def(i.onmousewheel) ? h + t : "DOMMouseScroll" : "focusOut" === evnt && (newEvent = N.Snif.isFirefox ? "blur" : "focusout"), "a" === addRemove ? "add" : "remove");
//     for (let t = 0; t < n; t++) a[t][v + "EventListener"](newEvent, fonction, d)
// };

// N.Snif = {
//     uA: navigator.userAgent.toLowerCase(),
//     get iPadIOS13() {
//         return "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints
//     },
//     get isMobile() {
//         return /mobi|android|tablet|ipad|iphone/.test(this.uA) || this.iPadIOS13
//     },
//     get isFirefox() {
//         return -1 < this.uA.indexOf("firefox")
//     }
// }