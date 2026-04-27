const axios = require('axios');

async function test() {
    try {
        console.log("Querying API for 'madera'...");
        const res = await axios.get('http://localhost:3000/api/search?keywords=madera&minPrice=100');
        const results = res.data.results || [];
        
        console.log(`Total results: ${results.length}`);
        
        const remotesResults = results.filter(r => r.source && r.source.startsWith('Remotes'));
        console.log(`Of which from Remotes: ${remotesResults.length}`);
        
        if (remotesResults.length > 0) {
            console.log("\nSample 3 Remotes items:");
            console.log(JSON.stringify(remotesResults.slice(0, 3), null, 2));
        } else {
            console.log("No Remotes items found!");
        }
    } catch (e) {
        console.error(e.message);
    }
}
test();
