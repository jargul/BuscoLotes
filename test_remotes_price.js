const axios = require('axios');
const cheerio = require('cheerio');

async function testLotPage() {
    // Usamos la URL del feed para obtener un lote real
    try {
        const feedRes = await axios.get('https://www.remotes.com.uy/feed/publicados/', { timeout: 15000 });
        const $ = cheerio.load(feedRes.data, { xmlMode: true });
        let sampleUrl = '';
        $('channel > item').each((i, el) => {
            if (sampleUrl) return;
            $(el).find('lotes > lote').each((j, lotEl) => {
                if (!sampleUrl) sampleUrl = $(lotEl).children('link').text();
            });
        });
        console.log('URL del lote a analizar:', sampleUrl);
        if (!sampleUrl) { console.log('No se encontró URL'); return; }

        const lotRes = await axios.get(sampleUrl, {
            timeout: 12000,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        const p = cheerio.load(lotRes.data);
        console.log('\n--- TITLE ---');
        console.log(p('title').text());

        console.log('\n--- Clases con "precio" o "price" o "monto" o "oferta" ---');
        p('*').each((i, el) => {
            const cls = p(el).attr('class') || '';
            const id = p(el).attr('id') || '';
            const txt = p(el).text().trim().replace(/\s+/g, ' ').substring(0, 100);
            if ((cls + id).match(/precio|price|monto|oferta|valor|bid|puja/i) && txt) {
                console.log(`  [${el.name}.${cls}#${id}] -> "${txt}"`);
            }
        });

        console.log('\n--- Inputs con precio/monto ---');
        p('input').each((i, el) => {
            const name = p(el).attr('name') || '';
            const val = p(el).attr('value') || '';
            if (name.match(/precio|monto|price|bid/i)) {
                console.log(`  input[name="${name}"] = "${val}"`);
            }
        });

        console.log('\n--- Texto con $ o USD seguido de número ---');
        const bodyText = p('body').text();
        const priceMatches = bodyText.match(/[\$\u20ac]?\s*\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?/g) || [];
        priceMatches.slice(0, 10).forEach(m => console.log(' ', m.trim()));

        // Buscar el precio con regex en el HTML crudo
        console.log('\n--- Regex en HTML crudo (SalidaMinima, MejorOferta, PrecioBase) ---');
        const rawHtml = lotRes.data;
        const patterns = [
            /salida[_\s]?minima[^\d]*(\d[\d.,]*)/i,
            /mejor[_\s]?oferta[^\d]*(\d[\d.,]*)/i,
            /precio[_\s]?base[^\d]*(\d[\d.,]*)/i,
            /base[^:]*:\s*\$?\s*(\d[\d.,]+)/i,
            /"precio"\s*:\s*"?(\d[\d.,]+)"?/i,
            /"oferta"\s*:\s*"?(\d[\d.,]+)"?/i,
            /"price"\s*:\s*"?(\d[\d.,]+)"?/i,
        ];
        patterns.forEach(p => {
            const m = rawHtml.match(p);
            if (m) console.log(`  ${p}: ${m[0].substring(0,100)}`);
        });

    } catch (e) {
        console.error('Error:', e.message);
    }
}
testLotPage();
