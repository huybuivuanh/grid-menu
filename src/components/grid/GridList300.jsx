import {fetchFonts, loadGoogleFont} from "../FontLoading.js";
import TextBox from "../TextArea.jsx";

const fonts = await fetchFonts(300); // Use fetchFonts to get the 300 font


//let fontText = [] // an array containing the names of all the fonts

let selected = 0; // start the selected icon at 0 for the font
let prev = "";


export default function GridList300(){
    // load the fonts
    for (let i = 0; i < 300; i++) {
        loadGoogleFont(fonts[i].family);
    }
    return(
    <div>
        <table align={"center"}>
            <tbody align={"center"}>
            <tr>
                <td id={"row1"} align={"center"}>
                    <button id="1" style={{fontFamily: fonts[0].family, background: "lightgrey", fontSize: 25, padding: "10px 10px" }} onClick={ () => clicked("1")} > Font 1</button>
                    <button id="2" style={{fontFamily: fonts[1].family, background: "lightgrey", fontSize: 25, padding: "10px 10px"   }} onClick={ () => clicked("2")}   > Font 2</button>
                    <button id="3" style={{fontFamily: fonts[2].family, background: "lightgrey", fontSize: 25, padding: "10px 10px"   }} onClick={ () => clicked("3")} > Font 3</button>
                    <button id="4" style={{fontFamily: fonts[3].family, background: "lightgrey", fontSize: 25, padding: "10px 10px"   }} onClick={ () => clicked("4")} > Font 4</button>
                    <button id="5" style={{fontFamily: fonts[4].family, background: "lightgrey", fontSize: 25, padding: "10px 10px"   }} onClick={ () => clicked("5")} > Font 5</button>
                </td>
            </tr>
            <tr>
                <td id="testID2">
                    test 1
                </td>
            </tr>
            </tbody>

        </table>
    <TextBox id ="tb" selectedFont={fonts[selected].family}></TextBox>
    </div>
    )
}

function clicked(id){
    if (prev === ""){ // if no previous selected font
        prev = id; // set the new prev to the current font
    }
    else{ // else reset the prev button color
        document.getElementById(prev).style.background = "lightgrey";
        prev = id;
    }

    selected = id;
    document.getElementById(id).style.background = "royalblue";
    document.getElementById(id).style.color = "white";
}
