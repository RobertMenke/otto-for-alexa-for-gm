const AdmZip = require("adm-zip");

const zip = new AdmZip();
zip.addLocalFolder("alexa");
zip.writeZip("./alexa.app.zip");