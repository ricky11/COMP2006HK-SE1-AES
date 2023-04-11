const crypto = require('crypto');

// 256-bit key (K)
const key = "gUkXp2s5v8x/A?D(G+KbPeShVmYq3t6w"

// Alices Mesage to BOB (M)
const M = 'The company website has not limited the number of transactions a single user or device can perform in a given period of time. The transactions/time should be above the actual business requirement, but low enough to deter automated attacks.';
// const P = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAABBBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBBAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBBAAAAAAAAAAABBB'
const P = "The company website "
// Encrypt the message with AES-256-ECB
const cipher = crypto.createCipheriv('aes-256-ecb', key, null);
//Set auto padding, incase the last block is not a multiple of 16 bytes 
cipher.setAutoPadding(true);

//Set the input as UTF-8 Plaintext encoding and the output as HEX
let encrypted = cipher.update(P, 'utf8', 'hex');
// Concatate
encrypted += cipher.final('hex');

// Decrypt the message with AES-256-ECB
// const decipher = crypto.createDecipheriv('aes-256-ecb', key, null);
// let decrypted = decipher.update(encrypted, 'base64', 'utf8');
// decrypted += decipher.final('utf8');

encrypted = encrypted.match(/.{1,32}/g).join('\n');
console.log('Encrypted message:\n', encrypted);
