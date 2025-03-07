import {fetchFonts, loadGoogleFont} from "../FontLoading.js";
import TextBox from "../TextArea.jsx";
import {useState} from "react";

const fonts = await fetchFonts(300); // Use fetchFonts to get the 300 font
let selected = 0; // start the selected icon at 0 for the font
let prev = ""; // store the prev coloured buttons id to change its colour back
const buttonArray = []; // create an array to store all the buttons created

export default function GridList300(){
    for (let i = 0; i < 300; i++) {
        loadGoogleFont(fonts[i].family); // load the fonts
        buttonArray[i] = createButton(i); // create 300 buttons for the table
    }

    // create a use state to update the text box each button press
    const[currID, setCurrID] = useState(0);

    // create a new button with the next font
    function createButton(buttonNum){
        console.log(buttonNum);
        return  <button
            id={buttonNum + ""}
            style={{fontFamily: fonts[buttonNum].family, background: "lightgrey", fontSize: 10, padding: "10px 10px", margin: "5px 5px", width: "15%"}}
            onClick={ () => clicked(buttonNum)} >
            {fonts[buttonNum].family}
        </button>;
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

        selected = id; // set the selected button as the id
        document.getElementById(id).style.background = "royalblue";
        document.getElementById(id).style.color = "white";
        setCurrID(selected);
    }
    return(
    <div id="d1" align="center">
        {buttonArray}
        <TextBox id="tb" selectedFont={fonts[currID].family}></TextBox>
    </div>
    )
}


