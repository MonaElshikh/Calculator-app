//#region Declaration
const rootElement = document.documentElement;
const themeOptions = Array.from(document.querySelectorAll(".theme-option > input"));
const themeLabels = Array.from(document.querySelectorAll(".theme-option > label"));
const numbers = Array.from(document.querySelectorAll(".digit:not(:last-child)"));
const calcScreen = document.querySelector(".calc-screen");
const resultBtn = document.querySelector(".digit:last-child");
const operatorsKeys = ["+", "-", "/", "x"];
const zeroDigit = ["0", "."]
let formulaValue = "";
let inputValue = "";
let lastChar = "";
let values = [];
const themes =
    [
        {
            themeone:
            {
                "--main-font": "hsl(180,100%,100%)",
                "--nums-font": "hsl(222, 26%, 31%)",
                "--main-bg-color": "hsl(222, 26%, 31%)",
                "--screen-bg-color": "hsl(224, 35%, 15%)",
                "--keybad-bg-color": "hsl(223, 31%, 20%)",
                "--num-bg-color": "hsl(35,29%,88%)",
                "--num-hover-color": "hsl(100,100%,100%)",
                "--num-shadow-bg-color": "hsl(24,15%,65%)",
                "--key-bg-color": "hsl(225, 21%, 49%)",
                "--key-hover-color": "hsl(244,51%,76%)",
                "--key-shadow-bg-color": "hsl(224, 28%, 35%)",
                "--red-key-bg-color": "hsl(6, 63%, 50%)",
                "--red-key-hover-color": "hsl(6,93%,67%)",
                "--red-key-shadow-bg-color": "hsl(6, 70%, 34%)"
            }
        },
        {
            themetwo:
            {
                "--main-font": "hsl(72,12%,16%)",
                "--nums-font": "(72,12%,16%)",
                "--main-bg-color": "hsl(0, 0%, 90%)",
                "--screen-bg-color": "hsl(0, 0%, 93%)",
                "--keybad-bg-color": "hsl(0,6%,82%)",
                "--num-bg-color": "hsl(48,9%,89%)",
                "--num-hover-color": "hsl(100,100%,100%)",
                "--num-shadow-bg-color": "hsl(29,12%,62%)",
                "--key-bg-color": "hsl(184, 40%, 38%)",
                "--key-hover-color": "hsl(185,40%,55%)",
                "--key-shadow-bg-color": "hsl(168,59%,25%)",
                "--red-key-bg-color": "hsl(25, 99%, 39%)",
                "--red-key-hover-color": "hsl(6,93%,67%)",
                "--red-key-shadow-bg-color": "hsl(6, 70%, 34%)"
            }
        },
        {
            themethree: {
                "--main-font": "hsl(52,97%,59%)",
                "--nums-font": "(52,97%,59%)",
                "--main-bg-color": "hsl(268, 74%, 9%)",
                "--screen-bg-color": "hsl(268, 74%, 12%)",
                "--keybad-bg-color": "hsl(268, 75%, 12%)",
                "--num-bg-color": "hsl(269,48%,20%)",
                "--num-hover-color": "hsl(267,54%,44%)",
                "--num-shadow-bg-color": "hsl(286,57%,36%)",
                "--key-bg-color": "hsl(281, 89%, 26%)",
                "--key-hover-color": "hsl(280,56%,44%)",
                "--key-shadow-bg-color": "hsl(286,89%,52%)",
                "--red-key-bg-color": "hsl(176, 100%, 44%)",
                "--red-key-hover-color": "hsl(177,100%,79%)",
                "--red-key-shadow-bg-color": "hsl(179, 81%, 71%)"
            }
        }];
//#endregion
//#region  Functions
//#region Design Functions
// function to load default status 
function loadDefaults() {
    let preferedTheme = JSON.parse(localStorage.getItem("prefers-color-scheme"));
    if (preferedTheme) {
        setPreferedTheme(preferedTheme.index, preferedTheme.name);
        resetActiveStyle(themeLabels, preferedTheme.index);
    }
    else {
        setPreferedTheme(0, "themeone");
        resetActiveStyle(themeLabels, 0);
    }
}
// function to clear active style from all theme options and set the chosen theme.
function resetActiveStyle(list, index) {
    list.forEach((lbl) => lbl.classList.remove("active"));
    list[index].classList.add("active");
}
// function takes theme index and name and change the app theme.
function setPreferedTheme(index, name) {
    rootElement.style.setProperty("--main-font", themes[index][name]["--main-font"]);
    rootElement.style.setProperty("--nums-font", themes[index][name]["--nums-font"]);
    rootElement.style.setProperty("--main-bg-color", themes[index][name]["--main-bg-color"]);
    rootElement.style.setProperty("--screen-bg-color", themes[index][name]["--screen-bg-color"]);

    rootElement.style.setProperty("--keybad-bg-color", themes[index][name]["--keybad-bg-color"]);
    rootElement.style.setProperty("--num-bg-color", themes[index][name]["--num-bg-color"]);
    rootElement.style.setProperty("--num-hover-color", themes[index][name]["--num-hover-color"]);
    rootElement.style.setProperty("--num-shadow-bg-color", themes[index][name]["--num-shadow-bg-color"]);

    rootElement.style.setProperty("--key-bg-color", themes[index][name]["--key-bg-color"]);
    rootElement.style.setProperty("--key-hover-color", themes[index][name]["--key-hover-color"]);
    rootElement.style.setProperty("--key-shadow-bg-color", themes[index][name]["--key-shadow-bg-color"]);
    rootElement.style.setProperty("--red-key-bg-color", themes[index][name]["--red-key-bg-color"]);

    rootElement.style.setProperty("--red-key-hover-color", themes[index][name]["--red-key-hover-color"]);
    rootElement.style.setProperty("--red-key-shadow-bg-color", themes[index][name]["--red-key-shadow-bg-color"]);
}
// function to toggle between themes
function toggleThemes() {
    themeOptions.forEach((option, index) => {
        option.addEventListener("click", (e) => {
            if (option.checked) {
                // reset active style and set it for current option.
                resetActiveStyle(themeLabels, index);
                // save theme to local storage
                localStorage.setItem("prefers-color-scheme", JSON.stringify({ index: index, name: option.id.replace("-", "") }));
                // set current theme
                setPreferedTheme(index, option.id.replace("-", ""));
            }
        });
    });
}
//#endregion
// *****************************************************//
//#region Functionality Functions
// function to delete last char from inputvalue.
function dellInputValues(value) {
    console.log(value);
    inputValue = value.substring(0, value.length - 1);
    calcScreen.innerHTML = inputValue.length > 0 ? inputValue : "0";
}
// function to clear all input values.
function clearInputValues() {
    inputValue = "";
    formulaValue = "";
    values = [];
    calcScreen.innerHTML = "0";
    resultBtn.classList.remove("disabled");
}
// function to check Input Values 
function checkInputValues() {
    numbers.forEach((num) => {
        num.addEventListener("click", () => {
            // case reset
            if (num.innerHTML.toLowerCase() == "reset") {
                clearInputValues();
                return false;
            }
            // case del button
            else if (num.innerHTML.toLowerCase() === "del") {
                dellInputValues(inputValue);
            }
            // case user clicks any operator key and  no input value >  return false.
            else if (operatorsKeys.indexOf(num.innerHTML) != -1 && inputValue.length == 0) {
                return false;
            }
            else {
                //if input value more than 20 char return false.
                if (inputValue.toString().length == 20) {
                    return false;
                }
                // after user clicks result button if he/she clicks any operator will compelete the calculation 
                // else will erase the input value
                if (resultBtn.classList.contains("disabled")) {
                    resultBtn.classList.remove("disabled");
                    if (operatorsKeys.indexOf(num.innerHTML) == -1) {
                        inputValue = "";
                        calcScreen.innerHTML = inputValue;
                    } else {
                        values.push(inputValue.toString());
                    }
                }
                if (inputValue.length > 0) {
                    lastChar = inputValue.substring(inputValue.length - 1);
                    // if last cahr is an operator and clicked button is an operator return false.
                    if ((operatorsKeys.indexOf(lastChar) !== -1 && operatorsKeys.indexOf(num.innerHTML) !== -1) ||
                        (zeroDigit[1] == lastChar && num.innerHTML == zeroDigit[1])) {
                        return false;
                    }
                    // if clicked button is an operator and last char is . , remove last char
                    if (operatorsKeys.indexOf(num.innerHTML) !== -1 && lastChar == zeroDigit[1]) {
                        dellInputValues(inputValue);
                        return false;
                    }
                }
                // if num is clicked store it
                if (operatorsKeys.indexOf(num.innerHTML) == -1) {
                    formulaValue += num.innerHTML;
                }
                // if operator is clicked add the formulavalue and the operator to values array
                if (operatorsKeys.indexOf(num.innerHTML) !== -1) {
                    formulaValue ? values.push(formulaValue) : "";
                    values.push(num.innerHTML == "x" ? "*" : num.innerHTML);
                    formulaValue = "";
                }
                inputValue += num.innerHTML;
                calcScreen.innerHTML = inputValue;
            }
        });
    });
}
// function to calculate Input Values the input values
function calculateInputValues(values) {
    console.log(values);
    // if the last item in values array is an operator , remove it.
    if (operatorsKeys.indexOf(values[values.length - 1]) !== -1) {
        values.pop();
    }
    // if the input values is 3 (at least one operation)
    while (values.length > 1) {
        let result = "";
        for (let j = 0; j < 3; j++) {
            result += values[j];
        }
        result = eval(result);
        console.log(result);
        values.splice(0, 3);
        values.unshift(result.toString());
        console.log("values after adding the calc result", values);
    }
    return values[0].toString();
    // console.log("valuse after finishing calc", values);
}
// function to show calculation result.
function showCalculationResult() {
    resultBtn.addEventListener("click", () => {
        if (inputValue.length == 0) {
            return false;
        }
        // disable result button after click to prevent user from clicking many times.
        resultBtn.classList.add("disabled");
        // if the input valus is . remove it .
        inputValue === "." ? inputValue = "0" : inputValue = inputValue;
        // if last cahr is an operator remove it.
        if (operatorsKeys.indexOf(inputValue.substring(inputValue.length - 1)) !== -1) {
            inputValue = inputValue.substring(0, inputValue.length - 1);
        }
        // add last formulavalue to values array
        if (formulaValue) {
            values.push(formulaValue);
            formulaValue = "";
        }
        if (values.length >= 3) {
            inputValue = calculateInputValues(values);
        }
        values.length = 0;
        calcScreen.innerHTML = inputValue;
    });
}
//#endregion
//#endregion

//#region Calls
loadDefaults();
toggleThemes();
checkInputValues();
showCalculationResult();
//#endregion