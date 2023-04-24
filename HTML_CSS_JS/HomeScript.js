const easterEgg = document.getElementById("easter-egg");
const image = document.getElementById("center-picture");
var imageSelectors = document.querySelectorAll(".img-selector");
var images = ["images/The_better_ship.jpg", "images/cruise ship.png", "images/party ship.png"]

for(i = 0; i < imageSelectors.length; i++){
    imageSelectors[i].style.transform = `translate(${-30 + (i * 30)}px, -50px)`;
};
imageSelectors[0].style.transform = "translate(-32.5px, -52.5px)";

var currentImage = 0;
var lastImageSelector = 0;
// change images every n time
setInterval(() =>{
    image.src = images[currentImage];
    imageSelectors[lastImageSelector].style.width = "10px";
    imageSelectors[lastImageSelector].style.height = "10px";
    imageSelectors[lastImageSelector].style.transform = `translate(${-30 + (lastImageSelector * 30)}px, -50px)`

    imageSelectors[currentImage].style.width = "15px";
    imageSelectors[currentImage].style.height = "15px";
    imageSelectors[currentImage].style.transform = `translate(${-30 + (currentImage * 30) -2.5}px, -52.5px)`
    lastImageSelector = currentImage;

    currentImage += 1;
    if(currentImage >= images.length){
        currentImage = 0;
    }
}, 4000);

// change images with buttons (white circles)
for(i = 0; i < images.length; i++){
    console.log("start of for loop " + i);
    let j = i;
    imageSelectors[i].addEventListener("click", () =>{
        image.src = images[j];
        console.log(j);
        currentImage = j;
        imageSelectors[lastImageSelector].style.width = "10px";
        imageSelectors[lastImageSelector].style.height = "10px";
        imageSelectors[lastImageSelector].style.transform = `translate(${-30 + (lastImageSelector * 30)}px, -50px)`

        imageSelectors[j].style.width = "15px";
        imageSelectors[j].style.height = "15px";
        imageSelectors[j].style.transform = `translate(${-30 + (j * 30) -2.5}px, -52.5px)`
        lastImageSelector = j;
    });
}

// easterEgg.addEventListener("click", () => {
//     easterEgg.style.height = "auto";
//     easterEgg.style.width = "auto";
//     easterEgg.style.fontSize = "7rem";
//     easterEgg.style.backdropFilter = "blur(20px)";
//     easterEgg.innerText = "susipaha go tova momche na ime ico (Hristomir Minchev).";
// })

window.onclick = (e) =>{
    if(e.clientX > 20 && e.clientX < 50 && e.clientY > 250 && e.clientY < 280){
        easterEgg.style.height = "auto";
        easterEgg.style.width = "auto";
        easterEgg.style.fontSize = "7rem";
        easterEgg.style.backdropFilter = "blur(20px)";
        easterEgg.innerText = "susipaha go tova momche na ime ico (Hristomir Minchev). Hris:\"verno si e\"";
    }
};