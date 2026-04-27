const fs = require('fs');
const axios = require("axios");

async function main() {
    const out = {};
    try {
        // Bavastro
        const bv = await axios.get("https://api-parseo.bavastronline.com/published_auctions/?limit=1");
        out.bvAuctionKeys = Object.keys(bv.data.results[0] || {});
        if (bv.data.results[0]) {
            const bvL = await axios.get(`https://api-parseo.bavastronline.com/auctions/${bv.data.results[0].id}/lots/published/?page=1&sort=lot_number&page_size=1`);
            out.bvLotKeys = Object.keys(bvL.data.results[0] || {});
            out.bvLot_lotKeys = Object.keys(bvL.data.results[0].lot || {});
            out.bvLotNumber = bvL.data.results[0].lot.number || bvL.data.results[0].lot_number || bvL.data.results[0].number;
            out.bvEndDate = bv.data.results[0].end_date || bv.data.results[0].endDate;
        }

        // Arechaga
        const ar = await axios.get("https://api.arechaga.com.uy/public/auctions/");
        out.arAuctionKeys = Object.keys(ar.data.data.inProgress[0] || {});
        if (ar.data.data.inProgress[0]) {
            const arL = await axios.get(`https://api.arechaga.com.uy/public/auctions/${ar.data.data.inProgress[0].id}`);
            out.arLotKeys = Object.keys(arL.data.data.lots[0] || {});
            out.arEndDate = ar.data.data.inProgress[0].date_end || ar.data.data.inProgress[0].endDate;
            out.arLotNumber = arL.data.data.lots[0].lot || arL.data.data.lots[0].number || arL.data.data.lots[0].id;
        }

        // ReySubastas
        const rs = await axios.get("https://api.reysubastas.com/public/auctions/");
        out.rsAuctionKeys = Object.keys(rs.data.data.inProgress[0] || {});
        if (rs.data.data.inProgress[0]) {
            const rsL = await axios.get(`https://api.reysubastas.com/public/auctions/${rs.data.data.inProgress[0].id}`);
            out.rsLotKeys = Object.keys(rsL.data.data.lots[0] || {});
            out.rsEndDate = rs.data.data.inProgress[0].date_end || rs.data.data.inProgress[0].endDate;
            out.rsLotNumber = rsL.data.data.lots[0].lot || rsL.data.data.lots[0].number || rsL.data.data.lots[0].id;
        }

        fs.writeFileSync('test_out.json', JSON.stringify(out, null, 2));
    } catch (e) {
        console.error("Error:", e.message);
    }
}
main();
