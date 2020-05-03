(function(){
    const MARGIN = 10
    const $target = $(".board.text a[href='/petitions/Step1']").parents("div")[0];

    const $header = $("#header")[0];
    const y = $target.getBoundingClientRect().y - MARGIN - $header.offsetHeight;
    window.scrollTo(0, y);
})();
