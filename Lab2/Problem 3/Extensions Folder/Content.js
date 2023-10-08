//array of images
let Banjo = [
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Fbanjo&psig=AOvVaw2B1HvuPx7f_Y-znlcpkoIB&ust=1696607392019000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCICJhpeh34EDFQAAAAAdAAAAABAE",
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fclassroomclipart.com%2Fimage%2Fvector-clipart%2Fbanjo-musical-instrument-clipart-34717.htm&psig=AOvVaw2B1HvuPx7f_Y-znlcpkoIB&ust=1696607392019000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCICJhpeh34EDFQAAAAAdAAAAABAJ",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVwbAXYhGeimn3Jn3zMiVOHo4gBvZP6HEHdg&usqp=CAU",
];

//reverse through array of images
//getting random image from the array we created before (we use math.floor and math.random to grab a random index in the array)
const imgs = document.getElementsByTagName("img");
for(let i = 0; i < imgs.length; i++) {
    const randomImg = Math.floor(Math.random() * Banjo.length)
    imgs[i].src = Banjo[randomImg]
}
//do the same for h1 elements
const headers = document.getElementsByTagName("h1");
for (let i = 0; i < headers.length; i++){
    headers[i].innerText = "Banjo banjo banjo";
}

const headers2 = document.getElementsByTagName("h2");
for (let i = 0; i < headers.length; i++){
    headers[i].innerText = "Banjo banjo banjo";
}

const headers3 = document.getElementsByTagName("body");
for (let i = 0; i < headers.length; i++){
    headers[i].innerText = "Banjo banjo banjo";
}


//do the same for p elements
const p = document.getElementsByTagName("p");
for (let i = 0; i < p.length; i++){
    p[i].innerText = "banjo";
}
