const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const SITEMAP_API_URL = process.env.SITEMAP_API_URL || 'https://development.mediadazz.com/api/sitemap';
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');

/**
 * Fetches sitemap from the API and saves it to public/sitemap.xml
 */
async function generateSitemap() {
  console.log('🔄 Fetching sitemap from API...');
  console.log(`📍 API URL: ${SITEMAP_API_URL}`);

  return new Promise((resolve, reject) => {
    const url = new URL(SITEMAP_API_URL);
    const client = url.protocol === 'https:' ? https : http;

    const request = client.get(url, (response) => {
      // Check if request was successful
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to fetch sitemap: HTTP ${response.statusCode}`));
        return;
      }

      let data = '';

      // Collect the response data
      response.on('data', (chunk) => {
        data += chunk;
      });

      // When all data is received
      response.on('end', () => {
        try {
          // Ensure the public directory exists
          const publicDir = path.dirname(OUTPUT_PATH);
          if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
          }

          // Write the sitemap to file
          fs.writeFileSync(OUTPUT_PATH, data, 'utf8');
          
          console.log('✅ Sitemap generated successfully!');
          console.log(`📁 Saved to: ${OUTPUT_PATH}`);
          console.log(`📊 Size: ${(data.length / 1024).toFixed(2)} KB`);
          
          resolve();
        } catch (error) {
          reject(new Error(`Failed to write sitemap file: ${error.message}`));
        }
      });
    });

    // Handle request errors
    request.on('error', (error) => {
      reject(new Error(`Failed to fetch sitemap: ${error.message}`));
    });

    // Set timeout
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Request timeout: Failed to fetch sitemap within 30 seconds'));
    });
  });
}

// Run the script
if (require.main === module) {
  generateSitemap()
    .then(() => {
      console.log('✨ Sitemap generation completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error generating sitemap:', error.message);
      process.exit(1);
    });
}

module.exports = { generateSitemap };
