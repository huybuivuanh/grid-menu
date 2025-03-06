import {fetchFonts} from "../FontLoading.js";
import TextBox from "../TextArea.jsx";

let fonts = fetchFonts(300); // Use fetchFonts to get the 300 fonts
//let fontText = [] // an array containing the names of all the fonts


export default function GridList300(){
    return(
    <div>
        <table>
            <tbody>
            <tr>
                <td id={"testID"}>
                    test 1
                    test 2
                    test 3
                    test 4
                    test 5
                    test 6
                    test 7
                    test 8
                    test 9
                    test 10
                    test 11
                    test 12
                    test 13
                    test 14
                    test 15
                    test 16
                    test 17
                    test 18
                    test 19
                    test 20
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
    <TextBox></TextBox>
    </div>
    )
}