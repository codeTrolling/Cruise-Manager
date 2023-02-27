var cruiseWindows = document.querySelectorAll(".details-container");

function showOrHide(){
    var details = document.getElementById("details1");
    if(details.style.display == "block"){
        details.style.display = "none";
    }
    else{
        details.style.display = "block";
    }
}

// function changeBoxSize(){
//     if(document.getElementsByClassName("details-container")[0].getAttribute(innerHeight) != document.getElementsByClassName("general-cruise-info")[0].getAttribute(innerHeight) && document.getElementById("details1").style.display == "none"){
//         document.getElementsByClassName("details-container")[0].style.height = document.getElementsByClassName("general-cruise-info")[0].getAttribute(innerHeight);
//         console.log("works");
//     }
//     console.log("in function");
// }

const detailsbtn = document.getElementById("show-details")
detailsbtn.addEventListener("click", showOrHide);

// const observer = new MutationObserver(entries => {
//     changeBoxSize();
// })

// const testObj = document.getElementById("testid");
// observer.observe(testObj, { attributes: true});

// testObj.addEventListener("resize", changeBoxSize)

// console.log(cruiseWindows[0].offsetHeight);
// cruiseWindows[0].style.height = "500px";
// console.log(cruiseWindows[0].offsetHeight);
// cruiseWindows[0].style.height = cruiseWindows[0].offsetHeight;
 
// cruiseWindows[0].addEventListener("resize", () => {
//     console.log("resizes");
// })
 
// window.onresize = () => {
//     console.log(window.getComputedStyle(cruiseWindows[0]).getPropertyValue("height"), "before none")
//     cruiseWindows[0].style.height = "";
//     console.log(window.getComputedStyle(cruiseWindows[0]).getPropertyValue("height"), "on none")
//     cruiseWindows[0].style.height = window.getComputedStyle(cruiseWindows[0]).getPropertyValue("height");
//     console.log(window.getComputedStyle(cruiseWindows[0]).getPropertyValue("height"), "after first")
//     cruiseWindows[0].style.transition = "all 0.5 linear";
//     console.log(window.getComputedStyle(cruiseWindows[0]).getPropertyValue("height"))
//     console.log(details);
//     if(details.style.display == "block"){
//         //cruiseWindows[0].style.height += details.offsetHeight;
//         //cruiseWindows[0].style.height = "400px";
//         cruiseWindows[0].style.height = window.getComputedStyle(cruiseWindows[0].getPropertyValue("height"));
//         console.log(window.getComputedStyle(cruiseWindows[0]).getPropertyValue("height"), "in if statement");
//     }
// }