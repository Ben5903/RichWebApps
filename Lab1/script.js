alert('Welcome to Bens Website')

function showbox() {
    var x = document.getElementById("box");
    if (x.style.display === "none"){
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}