var can = require("socketcan");

var channel = can.createRawChannel('can0',true);

dec2bcd = dec => parseInt(dec.toString(10),16);
bcd2dec = bcd => parseInt(bcd.toString(16),10);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function buf2bin (buffer) {
    return BigInt('0x' + buffer.toString('hex')).toString(2).padStart(buffer.length * 8, '0')
  }

var msg = {
    'id': 1731,
    data: [0,0,0,0,0,0,0,0]
}

setInterval(() => {
    var out = {}
    var buff = Buffer.alloc(8)

    IstantaneousFuelConsumption1 = dec2bcd(getRandomInt(10)) << 4;
    IstantaneousFuelConsumption2 = dec2bcd(getRandomInt(10));
    
    
    IstantaneousFuelConsumption3 = dec2bcd(getRandomInt(10)) << 4;	
    AverageFuelConsumption1 = dec2bcd(getRandomInt(10));
    
    AverageFuelConsumption2 = dec2bcd(getRandomInt(10)) << 4;
    AverageFuelConsumption3 = dec2bcd(getRandomInt(10));
    
    AverageSpeed_1 = getRandomInt(251);		  
      
    TravelingTime1_Hour1 = dec2bcd(getRandomInt(10)) << 4;			
    TravelingTime1_Hour2 = dec2bcd(getRandomInt(10));			
    TravelingTime1_Minute1 = dec2bcd(getRandomInt(10)) << 4;					
    TravelingTime1_Minute2 = dec2bcd(getRandomInt(10));			
      
    combinedValue0 = IstantaneousFuelConsumption1 | IstantaneousFuelConsumption2;  
    combinedValue1 = IstantaneousFuelConsumption3 | AverageFuelConsumption1;
    combinedValue2 = AverageFuelConsumption2 | AverageFuelConsumption3;
    
    combinedValue5 = AverageSpeed_1
    
    combinedValue6 = TravelingTime1_Hour1 | TravelingTime1_Hour2;
    
    combinedValue7 = TravelingTime1_Minute1 | TravelingTime1_Minute2;  
    
    buff.writeUInt8(combinedValue0, 0);
    buff.writeUInt8(combinedValue1, 1);
    buff.writeUInt8(combinedValue2, 2);
      
    buff.writeUInt8(combinedValue5, 5);  
    buff.writeUInt8(combinedValue6, 6); 
    buff.writeUInt8(combinedValue6, 6);  
    buff.writeUInt8(combinedValue7, 7);  
    console.log(buf2bin(buff));
    out.id = msg.id
    out.data = buff

    channel.send(out)
}, 2500)

channel.start()
