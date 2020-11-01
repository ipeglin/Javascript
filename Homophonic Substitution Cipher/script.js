let isFirstLoad = true;
let cipherCharacters = [];
let usableReplacements = [];
let usablePlainText = [];
let inputText = [];
let encryptedText = [];
let stringConfirmation = "";
let encryptionString = "";
let splittingString = "\n\n\n ##################################################\n\n\n\n\n\n";


let submitButton = document.getElementById("submitButton");
let plainDiv = document.getElementById("plaindiv");
let encryptedDiv = document.getElementById("encypteddiv");


function resetArrays() {
    usableReplacements = [];
    usablePlainText = [];
    inputText = [];
    encryptedText = [];
    stringConfirmation = "";
    encryptionString = "";
}

function defineUsableReplacements() {
    for (let i = 33; i <= 126; i++) {
        if (i != 92 && i != 34 && i != 39 && i != 96) {
            usableReplacements.push(String.fromCharCode(i));
        }
    }
    console.log(" ########## Usable replacements ##########");
    console.log(usableReplacements)
    console.log(splittingString);
    
}


function defineUsablePlainText() {
    for (let i = 65; i <= 90; i++) {
        usablePlainText.push(String.fromCharCode(i));
    }
    console.log(" ########## Usable plain text characters ##########")
    console.log(usablePlainText);
    console.log(splittingString);
}


function createRespectiveReplacements() {
    for (let character of usablePlainText) {
        createNewObject(character,createEncryptReplacements(character));
    }
    console.log(" ########## Character replacement ruleset ##########");
    console.log(cipherCharacters);
    console.log(splittingString);
}


function createNewObject(character, replacements) {
    let characterObject = {
        plainText: character,
        replacementText: replacements
    }
    cipherCharacters.push(characterObject);
}


function createEncryptReplacements(character) {
    percentage = 0;
    let replacementsArray = [];
    switch (character) {
            case "A":
                percentage = 0.082;
                break;
            case "B":
                percentage = 0.015;
                break;
            case "C":
                percentage = 0.028;
                break;
            case "D":
                percentage = 0.043;
                break;
            case "E":
                percentage = 0.13;
                break;
            case "F":
                percentage = 0.022;
                break;
            case "G":
                percentage = 0.02;
                break;
            case "H":
                percentage = 0.061;
                break;
            case "I":
                percentage = 0.07;
                break;
            case "J":
                percentage = 0.0015;
                break;
            case "K":
                percentage = 0.0077;
                break;
            case "L":
                percentage = 0.04;
                break;
            case "M":
                percentage = 0.024;
                break;
            case "N":
                percentage = 0.067;
                break;
            case "O":
                percentage = 0.075;
                break;
            case "P":
                percentage = 0.019;
                break;
            case "Q":
                percentage = 0.00095;
                break;
            case "R":
                percentage = 0.06;
                break;
            case "S":
                percentage = 0.063;
                break;
            case "T":
                percentage = 0.091;
                break;
            case "U":
                percentage = 0.028;
                break;
            case "V":
                percentage = 0.0098;
                break;
            case "W":
                percentage = 0.024;
                break;
            case "X":
                percentage = 0.0015;
                break;
            case "Y":
                percentage = 0.02;
                break;
            case "Z":
                percentage = 0.00074;
                break;
    }
    percentage = percentage * 100;
    amountOfReplacements = ((usableReplacements.length * percentage) / 100);
    amountOfReplacements = Math.ceil(amountOfReplacements);
    if(amountOfReplacements < 1) {
        amountOfReplacements = 1;
    }
    for (let i = 0; i < amountOfReplacements; i++) {
        replacement = usableReplacements[Math.floor(Math.random() * usableReplacements.length)];
        replacementsArray.push(replacement);
        usableReplacements.splice(usableReplacements.indexOf(replacement), 1);
    }
    return replacementsArray;
}

function encryptPlainText() {
    for (let character of inputText) {
        for (let i = 0; i < cipherCharacters.length; i++) {
            if (character == cipherCharacters[i].plainText) {
                encryptedText.push(cipherCharacters[i].replacementText[Math.floor(Math.random() * cipherCharacters[i].replacementText.length)]);
            }
        }
    }
    plainDiv.innerHTML = "<h2>" + stringConfirmation + "</h2>";
    for (let character of encryptedText) {
        encryptionString += character;
    }
    if (encryptionString.length != stringConfirmation.length) {
        encryptPlainText();
    }
    encrypteddiv.innerHTML = "<h1>" + encryptionString + "</h1><br><h3>Length of string: " + encryptionString.length + "</h3>";
    
}

function loadEncryptionRuleset() {
    defineUsableReplacements();
    defineUsablePlainText();
    createRespectiveReplacements();
    let visited = localStorage.getItem('visited');
    if (!visited) {
        alert("You can view the encryption rules in the console.\nThis site does not support punctuation marks or commas as well as any other special characters.\nPlease limit your message to letters from A-Z and whitespaces.");
        localStorage.setItem('visited', true);
    }
}


submitButton.onclick = () => {
    inputText = [];
    stringConfirmation = "";
    let isInvalid = false;
    let text = document.getElementById("textInput").value;
    for (let character of text) {
        if (character != " ") {
            inputText.push(character.toUpperCase());
        }
    }
    for (let element of inputText) {
        stringConfirmation += element;
    }
    if (stringConfirmation.length > 0) {
        encryptPlainText();
        resetArrays();
    }
}

