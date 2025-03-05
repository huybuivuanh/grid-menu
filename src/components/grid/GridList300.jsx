import {fetchFonts} from "../FontLoading.js";

let x = fetchFonts(300); // Use fetchFonts to get the 300 fonts

for (let i = 0; i < x.size(); i++){
    alert(x.get(i));

}