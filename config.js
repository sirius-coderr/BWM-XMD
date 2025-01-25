const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUEwWHZkT1Y3TTA3Q1d2aXZJOVFLMUhhb3NJd3RkVmRpdGVna1RYeWdsQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZFlhOW96QXNzeXYwaFZab0V3Nk5VYWlOTVVwSUYwM28vdHk0SlROMEczRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzSWFYKzVKMkZwbUJWZXJFakpmcVF3TS83NVpDeUhNTWwxRFQrdWVQRTI0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVQW9tbEZkN0hPdFRvVGJsSjdxaWdHSDFkZjlUSHNjZmRnemhHbXhiekhnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBERVpHZW03N3VJUTBLSkFEem5STXQ1WmhVckdWMFJVbyt4ZlBpckQ2Rm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlQ1dlFPVC9SUEJHOWd4RVNyYU1PNGQ5OXk0R2o4d293SjM5cnE4SGQ3MEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUl5NFRDL3dVWTh6cGNGOWoxaVpYNHcrT1ViRHlXRWtIcGhxZWtrRTBWYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUEJ0T0pzSEJvQjhZTFdrdUxSREJ6R0ZYV3hEWjNXQ3lZc0VVTFF3SndWND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVBdFJUUjNmQVZpRHk0aUV1SlNtcVg2NmdGZEttL2NPNjFjSnI0Q2tkdGJ5MVZyVWtrMW9wQ0VhVkFoZ1dVb2hyMVdZQndlWFcyaGNHZlJLcEFVY0N3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM2LCJhZHZTZWNyZXRLZXkiOiI0TWZmSGV1eWdQVUhLZFR2VVJBT0ppeWgvakdxSjYzYUdyZUlrOERYTkVjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJZbnZVUFJXR1E4bWI4bXR2bzVoc2hRIiwicGhvbmVJZCI6IjUxZDA1MDAwLTA4ZWMtNGUyNy04MzFjLTMwN2IzZGQ1NWUyMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkQjlwMGdjbDhrZU1wdUtrSzN4N3Vxb3M2NXM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUtJZ29CcTZXVkpyTGNXYnhUOWFpdWlGMytNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjNHUzhCVk1OIiwibWUiOnsiaWQiOiI1MDk0MDUyNTgzMjo0NUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUGZYOXhzUXY1SFV2QVlZQlNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMVh5bGtHUVV1NmxDOUZDMlZWWWZ5d2IxYlhRQlc1N3Rld1hOVXN6dmFHRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWHRSdVFUWXZhOGg5L1o2bllrUVFNVWtFVUJPWTAzSmFSY09xUnZMMVh6bjdFaHFSVkdRVDJyMzlwbGpyN0NrdlNRdnBKTURhazAzVDNRTFpwTlVPQmc9PSIsImRldmljZVNpZ25hdHVyZSI6InlaMDdQZGk0NFlCR3FadERXVk5NZHJXckwrY2hvUzZhRHN2ZDZGSmJVVTBrSXVjUHRzZnVjN0N2SC8rZ0U4OXA3V2FtYlF0ZUpzMy9YcWxwWDZMM0RRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTA5NDA1MjU4MzI6NDVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZFY4cFpCa0ZMdXBRdlJRdGxWV0g4c0c5VzEwQVZ1ZTdYc0Z6VkxNNzJoaCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNzgyMDM2NH0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/h2ydge.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
    ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
    MENUTYPE : process.env.MENUTYPE || '',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

