import '@testing-library/jest-dom';

// Mock TextEncoder/TextDecoder if not available
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
  global.TextDecoder = require('util').TextDecoder;
}
