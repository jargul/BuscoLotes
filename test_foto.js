const fs = require('fs');
const cheerio = require('cheerio');
try {
    const data = fs.readFileSync('remotes_feed.xml', 'utf8');
    const $ = cheerio.load(data, {xmlMode: true});
    console.log("channel>item count:", $('channel > item').length);
    const first = $('channel > item').first();
    const lotes = [];
    first.find('lotes > lote').each((i, el) => {
        lotes.push({
            link: $(el).children('link').text(),
            foto: $(el).children('foto').text()
        });
    });
    console.log(lotes[0]);
} catch (e) {
    console.error(e);
}
