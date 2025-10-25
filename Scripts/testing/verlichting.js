var can = require("socketcan");

var channel = can.createRawChannel('vcan0',true);


var msg2 = {
    'id': 0x180
}

setInterval(() => {
    var out = {}
    var buff = Buffer.alloc(6)

    buff.writeUIntBE(0, 0, 1)
    var random_boolean = Math.random() < 0.5;
    if(random_boolean){
        buff.writeUIntBE(0, 1, 1)
    }else{
        buff.writeUIntBE(255, 1, 1)
    }
    buff.writeUIntBE(0,2,1)
    buff.writeUIntBE(0,3,1)
    buff.writeUIntBE(0,4,1)
    buff.writeUIntBE(0,5,1)
    console.log(buff)
    out.id = msg2.id
    out.data = buff

    channel.send(out)
}, 250)





channel.start()
