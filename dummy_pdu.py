import MySocket, time, random, pprint, json, os

pp = pprint.PrettyPrinter(indent=4)
ThisFolder = os.path.abspath('.')
ParentFolder = os.path.abspath('..')

ws_client = MySocket.Client()

while(True):
    with open(ThisFolder + '/data/dummy_pdu.json') as json_data:
        data = json.load(json_data)

    for item in data["newValue"]:
        if item["category"] != "OUTLET_STATUS":
            item["value"] = round(random.random()*100,2)

    ws_client.push("PDU", data)

    with open(ThisFolder + '/data/dummy_pdu.json', 'w') as file:
        file.write(json.dumps(data, indent=4))

    print("success")
    time.sleep(5)

