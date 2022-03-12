const imgUrl = [
    {
        url: "assets/scroll-child/1.jpg",
        alt: "vert"
    },
    {
        url: "assets/scroll-child/2.jpg",
        alt: "death"
    },
    {
        url: "assets/scroll-child/3.jpg",
        alt: "joji"
    },
    {
        url: "assets/scroll-child/4.jfif",
        alt: "red"
    },
    {
        url: "assets/scroll-child/5.jfif",
        alt: "blue"
    },
    {
        url: "assets/scroll-child/6.jpg",
        alt: "post malone"
    },
    {
        url: "assets/scroll-child/7.jfif",
        alt: "black"
    },
    {
        url: "assets/scroll-child/8.jfif",
        alt: "reborn"
    },
    {
        url: "assets/scroll-child/9.jfif",
        alt: "?"
    },
    {
        url: "assets/scroll-child/10.jfif",
        alt: "love"
    },
    {
        url: "assets/scroll-child/11.jfif",
        alt: "Trippie red"
    },
    {
        url: "assets/scroll-child/12.jfif",
        alt: "na"
    },
    {
        url: "assets/scroll-child/13.jfif",
        alt: "Youv Dee"
    },
    {
        url: "assets/scroll-child/14.jfif",
        alt: "X"
    },
]

! function () {
    const main = N.Get.tag('main', document);
    const body = document.body;
    const cont = N.Get.class('container-center', main[0])[0];
    const wrap = N.Get.class('wrapper-normal', main[0])[0];
    const wrapInv = N.Get.class('wrapper-inv', main[0]);

    const invCont = N.Get.class('container-inv');

    const imgH = 450;
    const gap = 30;
    const imgOffset = imgH + gap;
    let imgCount = 0;

    window.scroll(0, imgOffset * 2);
    N.T(cont, 0, -imgOffset, 'px')

    let Y = imgOffset * 2;
    let curY = imgOffset * 2;
    let oldY = Y;
    let deltaY = 0;

    let bodyHeight = 0;
    const screenH = body.clientHeight;
    imgCount = screenH / imgH + 1; // there is a '-1' img on top

    let imgPileTop = [8, 5];
    let imgPileBot = [2, 3];
    function updatePile(pile, el) {
        pile[1] = pile[0];
        pile[0] = el;
    }

    function GetImgTop() {
        let n = N.Rand.range(0, 13, 0);
        while (n === imgPileTop[1] || n === imgPileTop[0]) {
            n = N.Rand.range(0, 13, 0);
        }
        updatePile(imgPileTop, n)

        const newImg = N.Cr('img');
        newImg.src = imgUrl[n].url;
        newImg.alt = imgUrl[n].alt;

        return newImg;
    }
    function GetImgBot() {
        let n = N.Rand.range(0, 13, 0);
        while (n === imgPileBot[0] || n === imgPileBot[1]) {
            n = N.Rand.range(0, 13, 0);
        }
        updatePile(imgPileBot, n);

        const newImg = N.Cr('img');
        newImg.src = imgUrl[n].url;
        newImg.alt = imgUrl[n].alt;
        return newImg;
    };

    setInterval(() => {
        oldY = Y;
        Y = window.scrollY;

        bodyHeight = body.offsetHeight;

        //scroll vers le bas
        if (curY + screenH >= imgCount * imgOffset) {
            imgCount++;
            body.style.height = bodyHeight + imgOffset + 'px';

            let newImg = GetImgBot()
            cont.appendChild(newImg);

            for (let c of invCont) {
                c.appendChild(newImg.cloneNode(true));
            }
        }

        // scroll vers le haut
        if (curY <= imgOffset * 2 - 60) {
            body.style.height = bodyHeight + imgOffset + 'px';
            imgCount++;

            let newImg = GetImgTop()
            let firstImg = N.Get.tag('img', cont)[0];
            cont.insertBefore(newImg, firstImg);

            for (let c of invCont) {
                firstImg = N.Get.tag('img', c)[0]
                c.insertBefore(newImg.cloneNode(true), firstImg);
            }

            curY += imgOffset;
            Y += 450;
            window.scroll(0, Y);
        }

        if (Math.abs(curY - Y) < 0.01) {
            curY = Y;
        } else curY = N.Lerp(curY, Y, 0.1);

        N.T(cont, 0, -curY, 'px')
        for (let c of invCont) {
            N.T(c, 0, -curY, 'px')
        }

        deltaY = N.Lerp(deltaY, Y - curY, 0.1);
        let a = N.map(deltaY, -400, 400, 0.6, 1.4);
        let b = (a - 1) - 1

        wrap.style.transform = 'scale(' + a + ')';
        for (const w of wrapInv) {
            w.style.transform = 'scale(' + b + ')';
            N.O(w, N.iLerp(Math.abs(deltaY), -100, 400))
        }


    }, 1000 / 60);
}()
