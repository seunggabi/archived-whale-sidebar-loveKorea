const POINTER_BUTTON_STYLE = 'background-color: white; width: 25px; height: 45px;'

const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const scroll = (selector) => {
    selector = selector || ".board.text a[href='/petitions/Step1']";

    try {
        const MARGIN = 10
        const $target = $(selector).parents("div")[0];

        const $header = $("#header")[0];
        const top = document.documentElement.scrollTop;

        const y = $target.getBoundingClientRect().y - MARGIN - $header.offsetHeight + top;
        (y !== top) && window.scrollTo(0, y);

    } catch(e) {}
}

const navigate = () => {
    const $d = $('<div>')
    $d.prop('style', 'position: fixed; z-index:9999; bottom: 18px; right: 45px;')

    const $b = $('<button>진행중인 청원목록</button>')
    $b.prop('style', 'background-color: white; width: 100px; height: 45px;')
    $b.click((e) => {
        e.stopPropagation();
        e.preventDefault();

        setTimeout(scroll, 1);
    })

    $d.append($b);
    $('body').append($d);
}

const next = () => {
    const $d = $('<div>')
    $d.prop('style', 'position: fixed; z-index:9999; bottom: 18px; right: 15px;')

    const $b = $('<button> > </button>')
    $b.prop('style', POINTER_BUTTON_STYLE)
    $b.click((e) => {
        e.stopPropagation();
        e.preventDefault();

        let page = +getParameterByName('page');
        if(!page) {
            page = 1;
        }
        location.href = location.pathname+'?page='+(page+1);
    })

    $d.append($b);
    $('body').append($d);
}


const prev = () => {
    const $d = $('<div>')
    $d.prop('style', 'position: fixed; z-index:9999; bottom: 18px; right: 150px;')

    const $b = $('<button> < </button>')
    $b.prop('style', POINTER_BUTTON_STYLE)
    $b.click((e) => {
        e.stopPropagation();
        e.preventDefault();

        const page = +getParameterByName('page');
        (page >= 1) && (location.href = location.pathname+'?page='+(page-1));
    })

    $d.append($b);
    $('body').append($d);
}

const agree = () => {
    const $d = $('<div>')
    $d.prop('style', 'position: fixed; z-index:9999; bottom: 18px; right: 45px;')

    const $b = $('<button>동의하기</button>')
    $b.prop('style', 'background-color: white; width: 100px; height: 45px;')
    $b.click((e) => {
        e.stopPropagation();
        e.preventDefault();

        setTimeout(() => scroll('.Reply_area_write'), 1);
        const btn = $('.Reply_area_write button');
        btn && btn.click();
    })

    $d.append($b);
    $('body').append($d);
}

const isMobile = (userAgent) => {
    userAgent = userAgent || window.navigator.userAgent;
    const device = ['iPhone', 'iPod', 'Android', 'Windows CE', 'BlackBerry', 'Symbian', 'Windows Phone', 'webOS', 'Opera Mini', 'Opera Mobi', 'POLARIS', 'IEMobile', 'lgtelecom', 'nokia', 'SonyEricsson', 'LG', 'SAMSUNG'].join('|');
    const regexp = new RegExp(device, 'i');

    return regexp.test(userAgent);
};

(function(){
    if(!isMobile()) {
        return;
    }

    if(location.href.includes("/petitions/best")) {
        prev();
        navigate();
        next();
    } else if(location.href.match(/petitions\/\d+\?/)) {
        agree();
    }

    setTimeout(scroll, 1);
})();
