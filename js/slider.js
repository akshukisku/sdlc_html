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