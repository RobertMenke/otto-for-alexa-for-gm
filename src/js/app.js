// Your code goes here


const vinElem = document.getElementById('vin');
gm.info.getVehicleConfiguration(function(data) {
  vinElem.innerHTML = gm.info.getVIN();
});


//Watches for data sent from another app (I think this is only for apps within GM though?)
// gm.comm.watchForData((sender_id, type, data, length) => {
//
// });

//gm.comm.sendToApp(appID, length, data);