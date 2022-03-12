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
    const cont = N.Get.class('container', main[0])[0];
    const imgH = 450;
    let imgCount = 0;

    // N.TopReload(), but offseted by imgH;
    window.scroll(0, imgH);
    N.T(cont, 0, -imgH, 'px')


    console.log(window.scrollY);
    let Y = imgH;
    let curY = imgH;
    let bodyHeight = 0;
    const screenH = body.clientHeight;
    imgCount = screenH / imgH + 1; // there is a '-1' img on top

    let imgPileTop = [1, 2];
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
    }


    setInterval(() => {
        Y = window.scrollY;

        bodyHeight = body.offsetHeight;

        //scroll vers le bas
        if (curY + screenH >= imgCount * imgH) {
            imgCount++;
            body.style.height = bodyHeight + 450 + 'px';


            cont.appendChild(GetImgBot());
        }


        if (curY <= 440) {
            body.style.height = bodyHeight + 450 + 'px';
            imgCount++;

            let firstImg = N.Get.tag('img')[0];

            cont.insertBefore(GetImgTop(), firstImg);

            curY += 450;
            Y += 450;
            window.scroll(0, Y);
        }

        if (Math.abs(curY - Y) < 0.01) {
            curY = Y;
        } else curY = N.Lerp(curY, Y, 0.08);

        N.T(cont, 0, -curY, 'px')
    }, 1000 / 60);
}()
