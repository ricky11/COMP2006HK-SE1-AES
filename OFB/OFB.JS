const crypto = require('crypto');

// 128-bit key (K)
const key128 = "u8x/A?D(G+KaPdSg"
// Alice's Message to BOB (M)
const M = 'The company website has not limited the number of transactions a single user or device can perform in a given period of time. The transactions/time should be above the actual business requirement, but low enough to deter automated attacks.'
const nonce = crypto.randomBytes(16);
// Encrypt the message with AES-128-OFB
const cipher = crypto.createCipheriv('aes-128-ofb', key128, nonce);
//Set auto padding, incase the last block is not a multiple of 16 bytes 
cipher.setAutoPadding(true);

//Set the input as UTF-8 Plaintext encoding and the output as HEX
let encrypted = cipher.update(M, 'utf8', 'hex');
// Concatenate
encrypted += cipher.final('hex');

// Using Regex to match every 32 chars (16 bytes of hex, each substring returned is one block of 16 bytes - 128 bit of AES-ECN cipher text)

const encrypted16Bytes = encrypted.match(/.{1,32}/g).join('\n');


// Output encrypted text
console.log('Plaintext Message:\n', M + '\n');

// Output encrypted text
console.log('Encrypted message blocks:\n', encrypted16Bytes + '\n');

const decipherFn = ((mode, key, nonce, encrypted) => {
    const decipher = crypto.createDecipheriv(mode, key, nonce);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted
})

// Output encrypted text
const decrypted = decipherFn('aes-128-ofb', key128, nonce, encrypted);
console.log('Decrypted message:\n', decrypted + '\n');

// Compare plaintext message with decrypted message
console.log(M == decrypted ? 'Message is intact \n' : 'Message is NOT intact \n')

//Demonstrate transmission loss of entire blocks of ciphertext

const encrypted16BytesArray = encrypted16Bytes.split('\n')
const droppedBlock = encrypted16BytesArray.splice(1, 1);
const droppedCipher = encrypted16BytesArray.join('');

// //Output ciphertext after simulated dropped blocks
const decryptAfterDropping = decipherFn('aes-128-ofb', key128, nonce, droppedCipher);
console.log('CipherText after simulated dropped block (Total', encrypted16BytesArray.length + ' blocks, 1 dropped):\n', droppedCipher.match(/.{1,32}/g).join('\n'))
console.log('\n Decrypted PlainText after dropped blocks: \n', decryptAfterDropping)

// Compare plaintext message with dropped ciphertext 
console.log(M == decryptAfterDropping ? '\n Message is intact \n' : '\n Message is NOT intact \n')