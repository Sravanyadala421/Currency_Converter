const BASE_URL = "https://v6.exchangerate-api.com/v6/8887059f87a9d8dd624be511/pair";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption=document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name ===  "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name ===  "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

};


const updateExchangeRate =  async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value}/${toCurr.value}`;
    let response = await fetch(URL);
    
    let data = await response.json();
    if (data.conversion_rate) {
        const formattedResponse = { [toCurr.value]: data.conversion_rate };
        let rate = formattedResponse[toCurr.value];
        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
    }
};



btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
window.addEventListener("load", () => {
    updateExchangeRate();
});