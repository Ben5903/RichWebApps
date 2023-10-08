//array of images
let ct = [
    "https://www.pngkey.com/png/detail/227-2279373_counter-terrorist-from-the-game-cs-counter-strike.png",
    "https://www.pngarea.com/pngs/141/7986031_counter-strike-png-counter-strike-anti-terrorist-hd.png",
    "https://s.kaskus.id/images/2014/11/04/4897139_20141104023206.jpg",
    "https://cdn-images-1.medium.com/v2/resize:fit:1200/1*NfLZmsg2esqsTGQX0sGQ4w.png",
    "https://th.bing.com/th/id/OIP.GOvhgzCJ9_1uNEeNMT9GsAHaHa?pid=ImgDet&rs=1",
];



let phrases = [
    "Let's make this right as rain.",
    "Let's move out.",
    "Remove any doubts in your head; it's us, or them.",
    "Remember! This isn't the killing house anymore! This is real life.",
    "Bingo bango bongo",
    "Bish bash bosh",
    "Let's show them who we are!",
    "Are we rushing in? Or are we going sneaky-beaky like?",
    "Gear up! We're going in!",
    "Right lads, we're on.",
    "These fellas are gonna regret waking up this morning.",
    "They're gonna wish they were never born.",
    "Gear up; We aren't going on a windy walk here!"
]

function generatePhrase() {
    const ct_phrase = Math.floor(Math.random() * phrases.length);
    return ct_phrase;
}

const imgs = document.getElementsByTagName("img");
for(let i = 0; i < imgs.length; i++) {
    const ct_images = Math.floor(Math.random() * ct.length)
    imgs[i].src = ct[ct_images]
}


const headers = document.getElementsByTagName("h1");
for (let i = 0; i < headers.length; i++){
    headers[i].innerText = phrases[generatePhrase()];
}

const divs = document.querySelectorAll("div");

divs.forEach(div => {
    div.style.backgroundColor = 'blue';

});

const p = document.getElementsByTagName("p");
for (let i = 0; i < p.length; i++){
    p[i].innerText = phrases[generatePhrase()];
}

const span = document.getElementsByTagName("span");
for (let i = 0; i < span.length; i++) {
    span[i].innerText = phrases[generatePhrase()];
}


