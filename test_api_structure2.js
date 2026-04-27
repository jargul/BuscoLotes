const fs = require('fs');
const axios = require("axios");

async function main() {
    const out = {};
    try {
        const cs = await axios.get("https://subastascastells.com/rest/API/Remate/lotes?Remateid=314220&RemateTipo=1&Cerrado=false", {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const lots = cs.data.data || (Array.isArray(cs.data) ? cs.data : []);
        out.csLotKeys = lots[0] ? Object.keys(lots[0]) : [];
        if (lots[0]) {
            out.csLotNumber = lots[0].LoteNumero || lots[0].LoteId;
            out.csEndDate = lots[0].Fecha || lots[0].RemateFecha || "Not found";
        }
        fs.writeFileSync('test_out2.json', JSON.stringify(out, null, 2));
    } catch (e) {
        console.error("Error:", e.message);
    }
}
main();
