let N = {};

/** Interpolation Lineaire */
N.Lerp = function (xi, xf, t) {
    return (1 - t) * xi + t * xf
};

N.Ease = {
    linear: t => t,
    i1: t => 1 - Math.cos(t * (.5 * Math.PI)),
    o1: t => Math.sin(t * (.5 * Math.PI)),
    io1: t => -.5 * (Math.cos(Math.PI * t) - 1),
    i2: t => t * t,
    o2: t => t * (2 - t),
    io2: t => t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1,
    i3: t => t * t * t,
    o3: t => --t * t * t + 1,
    io3: t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    i4: t => t * t * t * t,
    o4: t => 1 - --t * t * t * t,
    io4: t => t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
    i5: t => t * t * t * t * t,
    o5: t => 1 + --t * t * t * t * t,
    io5: t => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
    i6: t => 0 === t ? 0 : 2 ** (10 * (t - 1)),
    o6: t => 1 === t ? 1 : 1 - 2 ** (-10 * t),
    io6: t => 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * 2 ** (10 * (t - 1)) : .5 * (2 - 2 ** (-10 * --t))
}

/** Fonction inverse de Lerp */
N.iLerp = function (x, xi, xf) {
    return (x - xi) / (xf - xi)
}

N.Clamp = function (x, min, max) {
    return Math.max(Math.min(x, max), min)
}

/** Remaps a number from one range to another */
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
    class: (el, tag, context) => N.index(el, N.Get.class(tag, context))
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


N.O = (el, valeur) => {
    el.style.opacity = valeur
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

