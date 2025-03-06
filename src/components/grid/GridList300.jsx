import {fetchFonts} from "../FontLoading.js";
import TextBox from "../TextArea.jsx";

const fonts = await fetchFonts(300); // Use fetchFonts to get the 300 font
//loadGoogleFont(fonts[0]);

//let fontText = [] // an array containing the names of all the fonts
export default function GridList300(){

    console.log(fonts);
    return(
    <div>
        <table>
            <tbody>
            <tr>
                <td id={"testID"}>
                    <button id="1" style={{fontFamily: fonts[0].family }} > Font 1</button>
                    <button id="2" style={{fontFamily: fonts[1].family }} > Font 2</button>
                    <button id="3" style={{fontFamily: fonts[2].family }} > Font 3</button>
                    <button id="4" style={{fontFamily: fonts[3].family }} > Font 4</button>
                    <button id="5" style={{fontFamily: fonts[4].family }} > Font 5</button>
                    <button id="6" style={{fontFamily: fonts[5].family }} > Font 6</button>
                    <button id="7" style={{fontFamily: fonts[6].family }} > Font 7</button>
                    <button id="8" style={{fontFamily: fonts[7].family }} > Font 8</button>
                    <button id="9" style={{fontFamily: fonts[8].family }} > Font 9</button>
                    <button id="10" style={{fontFamily: fonts[9].family }} > Font 10</button>
                    <button id="11" style={{fontFamily: fonts[10].family }} > Font 11</button>
                    <button id="12" style={{fontFamily: fonts[11].family }} > Font 12</button>
                    <button id="13" style={{fontFamily: fonts[12].family }} > Font 13</button>
                    <button id="14" style={{fontFamily: fonts[13].family }} > Font 14</button>
                    <button id="15" style={{fontFamily: fonts[14].family }} > Font 15</button>
                    <button id="16" style={{fontFamily: fonts[15].family }} > Font 16</button>
                    <button id="17" style={{fontFamily: fonts[16].family }} > Font 17</button>
                    <button id="18" style={{fontFamily: fonts[17].family }} > Font 18</button>
                    <button id="19" style={{fontFamily: fonts[18].family }} > Font 19</button>
                    <button id="20" style={{fontFamily: fonts[19].family }} > Font 20</button>
                </td>
            </tr>
            <tr>
                <td id="testID2">
                    test 1
                    test 2
                    test new row
                </td>
            </tr>
            </tbody>

        </table>
    <TextBox selectedFont={fonts[5]}></TextBox>
    </div>
    )
}