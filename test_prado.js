const axios = require('axios');

(async () => {
  console.log('=== Category page products ===');
  const catUrl = 'https://pradorematesenlinea.uy/categoria-producto/sin-categorizar/';
  try {
    const r = await axios.get(catUrl, {
      timeout: 15000, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36' }
    });
    const html = r.data;

    // Try matching product items
    const items = Array.from(html.matchAll(/<li[^>]*class="[^"]*product[^"]*"[^>]*>([\s\S]+?)<\/li>/g));
    console.log('Total product li items:', items.length);

    // Filter out category items (they have woocommerce-loop-category__title)
    const productItems = items.filter(m => !m[0].includes('woocommerce-loop-category__title'));
    console.log('Actual product items (no categories):', productItems.length);

    if (productItems.length > 0) {
      console.log('\n--- First product item ---');
      console.log(productItems[0][0].substring(0, 1000));
    }

    // Check for pagination
    console.log('\nHas next page:', html.includes('class="next page-numbers"'));
    const countMatch = html.match(/woocommerce-result-count[^>]*>([^<]+)/);
    console.log('Result count:', countMatch ? countMatch[0] : 'N/A');

    // Check for "termometro" in the page
    console.log('Has termometro:', html.toLowerCase().includes('termometro') || html.toLowerCase().includes('termómetro'));
  } catch(e) { console.log('Error:', e.message); }

  // Try multirubro category (most likely to have termometro)
  console.log('\n=== Multirubro category ===');
  try {
    const r = await axios.get('https://pradorematesenlinea.uy/categoria-producto/multirubro/', {
      timeout: 15000, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36' }
    });
    const html = r.data;
    const items = Array.from(html.matchAll(/<li[^>]*class="[^"]*product[^"]*"[^>]*>([\s\S]+?)<\/li>/g));
    const productItems = items.filter(m => !m[0].includes('woocommerce-loop-category__title'));
    console.log('Product items:', productItems.length);
    console.log('Has termometro:', html.toLowerCase().includes('termometro') || html.toLowerCase().includes('termómetro'));
    
    if (productItems.length > 0) {
      console.log('\nFirst product:');
      console.log(productItems[0][0].substring(0, 800));
    }
    // Next page?
    console.log('Has next page:', html.includes('class="next page-numbers"'));
  } catch(e) { console.log('Error:', e.message); }

  // Try vintage-coleccionables-2 category
  console.log('\n=== Vintage-coleccionables-2 category ===');
  try {
    const r = await axios.get('https://pradorematesenlinea.uy/categoria-producto/vintage-coleccionables-2/', {
      timeout: 15000, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36' }
    });
    const html = r.data;
    const items = Array.from(html.matchAll(/<li[^>]*class="[^"]*product[^"]*"[^>]*>([\s\S]+?)<\/li>/g));
    const productItems = items.filter(m => !m[0].includes('woocommerce-loop-category__title'));
    console.log('Product items:', productItems.length);
    console.log('Has termometro:', html.toLowerCase().includes('termometro') || html.toLowerCase().includes('termómetro'));
    console.log('Has next page:', html.includes('class="next page-numbers"'));
    if (productItems.length > 0) {
      console.log('\nFirst product:');
      console.log(productItems[0][0].substring(0, 800));
    }
  } catch(e) { console.log('Error:', e.message); }

})().catch(e => console.error('FATAL:', e.message));
