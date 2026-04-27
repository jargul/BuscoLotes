const fs = require('fs');
const axios = require("axios");

async function main() {
    const out = {};
    try {
        const homeRes = await axios.get('https://subastascastells.com/frontend.home.aspx', {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const match = homeRes.data.match(/"vSUBASTASENPROGRESO":(\[.+?\])/);
        if (match && match[1]) {
            const activeAuctions = JSON.parse(match[1]);
            const a = activeAuctions.filter(a => a.RemateId)[0];
            out.auctionKeys = Object.keys(a);
            out.auctionDate = a.RemateFecha; // guess

            const lotsRes = await axios.get(`https://subastascastells.com/rest/API/Remate/lotes?Remateid=${a.RemateId}&RemateTipo=1&Cerrado=false`, {
                headers: { 'User-Agent': 'Mozilla/5.0' }
            });
            const lots = (lotsRes.data && lotsRes.data.data) ? lotsRes.data.data : (Array.isArray(lotsRes.data) ? lotsRes.data : []);
            if (lots[0]) {
                out.lotKeys = Object.keys(lots[0]);
                out.lotNumber = lots[0].LoteNumero || lots[0].LoteId;
                out.lotDate = lots[0].Fecha || lots[0].FechaCierre || lots[0].LoteFechaVencimientoWF || lots[0].RemateFechaVencimiento;
            }
        }
        fs.writeFileSync('test_out_castells.json', JSON.stringify(out, null, 2));
    } catch(e) {
        console.error(e);
    }
}
main();
