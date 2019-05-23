import socketio
import json
import pprint

pp = pprint.PrettyPrinter(indent=4)

#CONSTANTS
UPS = "UPS"
AIRCOND = "Aircond"
PDU = "PDU"
BATTERY = "Battery"
RECTIFIER = "Rectifier"
EQUIPMENT = [UPS, AIRCOND, PDU, BATTERY, RECTIFIER]


class Client(object):
    def __init__(self):
        self.sio = socketio.Client()
        # sio.connect('http://192.168.0.63:5001', transports = ['websocket'])
        self.sio.connect('http://192.168.0.63:5001')
        print("Connected to websocket")

        # Untuk realtime data pushing
    def push(self, category, data):
        if (category == UPS):
            room = "ups_in_data"
        elif (category == AIRCOND):
              room = "aircond_in_data"
        elif (category == PDU):
              room = "pdu_in_data"
        elif (category == BATTERY):
              room = "battery_in_data"
        elif (category == RECTIFIER):
              room = "rectifier_in_data"
              
        self.sio.emit(room, json.dumps(data))
        # pp.pprint(data)
        print("terikirim", "di", room)

    def listen(self):
        self.sio.emit('join_room', 'room_ups')
        self.sio.emit('join_room', 'room_rectifier')

    def wait(self):
        self.sio.wait()

# a = Client()
# @a.sio.on('ups_datas')
# def on_message(data):
#     print("data masuk", data)
#
# b = Client()
# @b.sio.on('rectifier_datas')
# def on_message(data):
#     print("data masuk", data)
#
# tes = Client()
# tes.push(UPS, {"sss":33})
# tes.push(RECTIFIER, {"DDD":44})
#
# a.listen()
# b.listen()
# a.wait()
# b.wait()




