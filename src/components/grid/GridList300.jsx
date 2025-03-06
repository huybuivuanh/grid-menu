import {fetchFonts, loadGoogleFont} from "../FontLoading.js";
import TextBox from "../TextArea.jsx";

const fonts = await fetchFonts(300); // Use fetchFonts to get the 300 font
let selected = 0; // start the selected icon at 0 for the font
let prev = "";
let buttonArray = [];

// create a new button with the next font
function createButton(buttonNum){
    console.log(buttonNum);
    return  <button id={buttonNum + ""} style={{fontFamily: fonts[buttonNum].family, background: "lightgrey", fontSize: 10, padding: "10px 10px", margin: "5px 5px", width: "10%"}} onClick={ () => clicked(buttonNum)} > {fonts[buttonNum].family}</button>;
}

export default function GridList300(){
    // load the fonts
    for (let i = 0; i < 300; i++) {
        loadGoogleFont(fonts[i].family);
        buttonArray[i] = createButton(i); // create 300 buttons for the table
    }
    return(
    <div id="d1" align="center">
        {buttonArray}
    <TextBox selectedFont={fonts[selected]}></TextBox>
    </div>
    )
}

function clicked(id){
    if (prev === ""){ // if no previous selected font
        prev = id; // set the new prev to the current font
    }
    else{ // else reset the prev button color
        document.getElementById(prev).style.background = "lightgrey";
        document.getElementById(prev).style.color = "black";
        prev = id;
    }

    selected = id;
    document.getElementById(id).style.background = "royalblue";
    document.getElementById(id).style.color = "white";
}
