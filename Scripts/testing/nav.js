var can = require("socketcan");

var channel = can.createRawChannel('can0',true);

var msg = {
    'id': 0x507,
    data: [0,0,0,0,0,0,0,0]
}



var interval2 = setInterval(() => {
    counter = 1
    var interval = setInterval(() => {
        var out = {}
        var buff = Buffer.alloc(8)

        if(counter == 1){
            buff.write("44", 0 , 'hex');
        }else{
            buff.write("54", 0 , 'hex');
        }
        
        buff.write("02", 1 , 'hex');
        buff.write("0C", 2 , 'hex');
        buff.write("41", 3 , 'hex');
        buff.write("46", 4 , 'hex');
        buff.write("1C", 5 , 'hex');
        buff.write("08", 6 , 'hex');
        buff.write("00", 7 , 'hex');

        console.log(buff)
        out.id = msg.id
        out.data = buff

        if(counter == 2){
            clearInterval(interval);
            // clearInterval(interval2);
        }
        counter++
        channel.send(out)
    },20)
    
}, 1000)

channel.start()
