const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", function () {

    mobileMenu.classList.toggle("hidden");

});

(function () {
    var quote = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever.';
    var data = [];
    for (var i = 0; i < 9; i++) {
        data.push({ name: 'Aisha Daniels', role: 'Farmer', img: './images/aisha-daniels.png', text: quote });
    }

    var track = document.getElementById('fbTrack');
    var dotsBox = document.getElementById('fbDots');
    var tpl = document.getElementById('fbCard');
    var slider = document.getElementById('fbSlider');

    data.forEach(function (d) {
        var node = tpl.content.cloneNode(true);
        var img = node.querySelector('[data-img]');
        img.src = d.img; img.alt = d.name;
        node.querySelector('[data-name]').textContent = d.name;
        node.querySelector('[data-role]').textContent = d.role;
        node.querySelector('[data-text]').textContent = d.text;
        track.appendChild(node);
    });

    var cards = Array.prototype.slice.call(track.children);
    var page = 0, timer;

    function gap() { return parseFloat(getComputedStyle(track).columnGap) || 0; }
    function perView() {
        return Math.max(1, Math.round((track.clientWidth + gap()) / (cards[0].offsetWidth + gap())));
    }
    function pages() { return Math.ceil(cards.length / perView()); }

    function setActive(p) {
        page = p;
        Array.prototype.forEach.call(dotsBox.children, function (b, i) {
            var on = i === p;
            b.classList.toggle('bg-[#358A2F]', on);
            b.setAttribute('aria-current', on ? 'true' : 'false');
        });
    }

    function goTo(p) {
        var idx = Math.min(p * perView(), cards.length - perView());
        track.scrollTo({ left: cards[idx].offsetLeft - cards[0].offsetLeft, behavior: 'smooth' });
        setActive(p);
    }

    function buildDots() {
        dotsBox.innerHTML = '';
        for (var i = 0; i < pages(); i++) {
            (function (n) {
                var b = document.createElement('button');
                b.type = 'button';
                b.setAttribute('aria-label', 'Go to slide ' + (n + 1));
                b.className = 'h-[9px] w-[9px] rounded-full border border-[#358A2F] transition-colors';
                b.addEventListener('click', function () { goTo(n); restart(); });
                dotsBox.appendChild(b);
            })(i);
        }
        setActive(Math.min(page, pages() - 1));
    }

    // swipe / scroll hone par active dot update
    track.addEventListener('scroll', function () {
        var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
        var unit = (cards[0].offsetWidth + gap()) * perView();
        var p = atEnd ? pages() - 1 : Math.round(track.scrollLeft / unit);
        if (p !== page) setActive(Math.max(0, Math.min(p, pages() - 1)));
    }, { passive: true });

    // autoplay (hover / focus pe pause)
    function restart() {
        clearInterval(timer);
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        timer = setInterval(function () { goTo((page + 1) % pages()); }, 4500);
    }
    slider.addEventListener('mouseenter', function () { clearInterval(timer); });
    slider.addEventListener('mouseleave', restart);
    slider.addEventListener('focusin', function () { clearInterval(timer); });
    slider.addEventListener('focusout', restart);

    var rt;
    window.addEventListener('resize', function () {
        clearTimeout(rt);
        rt = setTimeout(function () { buildDots(); goTo(Math.min(page, pages() - 1)); }, 150);
    });

    buildDots();
    restart();
})();