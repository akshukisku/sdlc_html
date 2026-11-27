const track = document.getElementById('scanTrack');

if (track) {
    const cards = track.children;
    let index = 0;

    // index wale card tak scroll karo
    function slide() {
        const width = cards[0].offsetWidth + 16; // card + gap-4
        track.scrollTo({ left: index * width });
    }

    function next() {
        index++;
        if (index >= cards.length) {
            index = 0;
        }
        slide();
    }

    function prev() {
        index--;
        if (index < 0) {
            index = cards.length - 1;
        }
        slide();
    }

    document.getElementById('scanNext').addEventListener('click', next);
    document.getElementById('scanPrev').addEventListener('click', prev);

    
}

// testimonials slider
const testiTrack = document.getElementById("testiTrack");
const testiDots = document.getElementById("testiDots");

if (testiTrack && testiDots) {
    const slides = testiTrack.querySelectorAll(".testi-slide");
    let index = 0;
    let timer;

    // dots banao
    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        dot.className = "h-2 w-2 rounded-full border border-green-700 transition";
        dot.addEventListener("click", () => goTo(i));
        testiDots.appendChild(dot);
    });

    function updateDots() {
        testiDots.querySelectorAll("button").forEach((d, i) => {
            d.classList.toggle("bg-green-700", i === index);
        });
    }

    function goTo(i) {
        index = (i + slides.length) % slides.length;
        testiTrack.scrollTo({ left: slides[index].offsetLeft - slides[0].offsetLeft, behavior: "smooth" });
        updateDots();
    }

    // user swipe kare toh dot sync ho
    testiTrack.addEventListener("scroll", () => {
        const left = testiTrack.scrollLeft;
        let nearest = 0;
        slides.forEach((s, i) => {
            if (Math.abs(s.offsetLeft - slides[0].offsetLeft - left) <
                Math.abs(slides[nearest].offsetLeft - slides[0].offsetLeft - left)) nearest = i;
        });
        if (nearest !== index) { index = nearest; updateDots(); }
    });

    function start() { timer = setInterval(() => goTo(index + 1), 3000); }
    function stop() { clearInterval(timer); }

    testiTrack.addEventListener("mouseenter", stop);
    testiTrack.addEventListener("mouseleave", start);
    testiTrack.addEventListener("touchstart", stop, { passive: true });
    testiTrack.addEventListener("touchend", start);

    updateDots();
    start();
}