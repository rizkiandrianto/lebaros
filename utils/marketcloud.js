// import Marketcloud from 'marketcloud-node';
let MarketCloud = null;

if (typeof window !== 'undefined') {
  const Marketcloud = require('marketcloud-js')
  MarketCloud = new Marketcloud.Client({
    "public_key" : "bea139b1-aa33-4b7b-ba5b-dbb44fe01fbf",
    "secret_key" : "qS8KXAmINqDb90/KhjAHYpWYh99vn4UvW14ao2sRFV8="
  });
}

module.exports = MarketCloud;
