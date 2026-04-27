const axios = require("axios");
async function main() {
    try {
        const homeRes = await axios.get('https://subastascastells.com/frontend.home.aspx', {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const match = homeRes.data.match(/"vSUBASTASENPROGRESO":(\[.+?\])/);
        if (match && match[1]) {
            const activeAuctions = JSON.parse(match[1]);
            const a = activeAuctions.filter(a => a.RemateId)[0];
            console.log("Castells Auction Keys:", Object.keys(a));
            console.log("Castells Auction sample:", JSON.stringify(a, null, 2));

            const lotsRes = await axios.get(`https://subastascastells.com/rest/API/Remate/lotes?Remateid=${a.RemateId}&RemateTipo=1&Cerrado=false`, {
                headers: { 'User-Agent': 'Mozilla/5.0' }
            });
            const lots = (lotsRes.data && lotsRes.data.data) ? lotsRes.data.data : (Array.isArray(lotsRes.data) ? lotsRes.data : []);
            if (lots[0]) {
                console.log("Castells Lot Keys:", Object.keys(lots[0]));
                console.log("Castells Lot sample:", JSON.stringify(lots[0], null, 2));
            }
        }
    } catch(e) {
        console.error(e);
    }
}
main();
