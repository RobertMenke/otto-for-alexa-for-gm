const AdmZip = require("adm-zip");

const zip = new AdmZip();
zip.addLocalFolder("src");
zip.writeZip("./alexa.app.zip");