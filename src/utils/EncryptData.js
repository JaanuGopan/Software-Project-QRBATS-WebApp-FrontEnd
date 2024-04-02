import CryptoJS from "crypto-js";

// Encryption function
export const encryptData = (data, key) => {
  // Convert data to string
  const dataString = JSON.stringify(data);

  // Encrypt data using AES encryption with a key
  const encryptedData = CryptoJS.AES.encrypt(dataString, key).toString();

  return encryptedData;
};

// Decryption function
export const decryptData = (encryptedData, key) => {
  // Decrypt data using AES decryption with the same key
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key);

  // Convert decrypted bytes to a readable JSON object
  const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

  return decryptedData;
};
