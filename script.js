let BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for(select of dropdowns){
    for(currCode in countryList ){
        let newOptn = document.createElement("option");
        newOptn.innerText = currCode;
        newOptn.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOptn.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOptn.selected = "selected";
        }
        select.append(newOptn);
    }
    select.addEventListener("change", (event)=>{
        updateFlag(event.target);
    })
}

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}

btn.addEventListener("click",async(event)=>{
    event.preventDefault();
    let amount = document.querySelector("input");
    let amtVal = amount.value;
    if(amtVal == "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1"
    }


    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
    // console.log(rate);
    // console.log(data[fromC][toC]);
})