function showOrHide(){
    let details = document.getElementById("details1");
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

const detailsbtn = document.getElementById("details")
detailsbtn.addEventListener("click", showOrHide);

// const observer = new MutationObserver(entries => {
//     changeBoxSize();
// })

// const testObj = document.getElementById("testid");
// observer.observe(testObj, { attributes: true});

// testObj.addEventListener("resize", changeBoxSize)