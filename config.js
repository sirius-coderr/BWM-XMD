const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUlLejN4RGovUDdMSFBYZXVQZ29SZ254MHNHUmJEd2htVmZJMjgxMUwwaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRmloYTNiNTQyN1dweFBRS0E0N3FXendCRTRZaC9Kdis5V0NQTHp0S0RHYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrQ2ZLRlM4TGJiSmRHU1VQbUxrRmphcHFxYnRRTU1Qb2xMN2dlV1o3VzBvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrdGlYcTFyQjJpak5UcnV2RWNlQ1dPbm40MjdxbFZVVGhzT2ZaRmc0N2owPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1JTExTdkRaV2NRUkNLeUtLdmFLV3VjaVUvNXJ3elMrN09JQXVibHdMM2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlB0ZXdKTmd2UHJ1b0lFRjlmejB5RHFTT2ZjN1NlT3g5SDdHZi85bTd6Rkk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUJHTCtpcUd4dDRZY1BUQ1RnNkhYQlkwSU9sS0Q5QnNJRUp5YW9QTUpFUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0xVbmVaOFl6M29uUUViYUh6R1dzaTBHQm8xczJ4dzFIUEJPdVZ6a3Zobz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9RUzBJaStVNThIUXFUR3VGam1aTno4V1VZbWxQYklKV3hkMWpKS3Y0aXVseks4ZlhVSzVSdVduNktHUDNXbkF4eVpickRnbm1mZzBUbWxJTk9IZ2hnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTYsImFkdlNlY3JldEtleSI6IlZQQnhJeTdoVjA1RWRLM2g4TkJrQUN0M0YxQUdxcVE3TzN1UGNJRmdhalU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImRWQUtNenFwVDVxTk9yYmdBTlNja1EiLCJwaG9uZUlkIjoiNjNmMmQ4MWYtNGRhYy00OTE3LTkyZjAtNDU0OWJiYmVjOTU0IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZIS3hyQTBnR2tzYnZFZXJlSWxqa3RMYmlSTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwazBNVFVObnc1SHMrT0t4TlJKR013K2ZyTUE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiU0RIS1I5RTIiLCJtZSI6eyJpZCI6IjUwOTQwNTI1ODMyOjQzQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQZlg5eHNRa0ovQ3ZBWVlBeUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIxWHlsa0dRVXU2bEM5RkMyVlZZZnl3YjFiWFFCVzU3dGV3WE5Vc3p2YUdFPSIsImFjY291bnRTaWduYXR1cmUiOiJDUzdPbERoNDFVUXBQM1BFVjVlVTVFT3RzYkZtU1FRYU0wWTFYM0VWem4reGxQSTRkcHhuRitDSzBqQkJ1SUNDTElQZXo4MHdVMDFuaGRzYWdzVDlDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVnZFTmdheTk4Y0VJVFRDVFJSdFJJeTVHcEtHRU1vNzZLYlhFM1RNdU1OWUI1amZIbGtDRXp6Q1VodWJJU2c1bStRbE1UQWp6eTZ5SzRDT3VobTNLakE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI1MDk0MDUyNTgzMjo0M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkVjhwWkJrRkx1cFF2UlF0bFZXSDhzRzlXMTBBVnVlN1hzRnpWTE03MmhoIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM3NTI3MTk5fQ==',
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

