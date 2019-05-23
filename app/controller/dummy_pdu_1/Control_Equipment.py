import time, os, random
import sys, argparse, ast, json

_FINISH = False
ThisFolder = os.path.abspath('.')
ParentFolder = os.path.abspath('..')

# Write function
def write(eq_type, eq_id, varname, value):
    print(random.choice([1, -1]))
    with open(ThisFolder + '/app/controller/dummy_pdu_1/data/dummy_pdu.json') as json_data:
        data = json.load(json_data)

    for i, item in enumerate(data["newValue"]):
        if item["var_name"] == varname:
            data["newValue"][i]["value"] = int(value)
            # print(data["newValue"][i])

    with open(ThisFolder + '/app/controller/dummy_pdu_1/data/dummy_pdu.json', 'w') as file:
        file.write(json.dumps(data, indent=4))

# Main Function
def main(args):
    try:
        eq_type = args.eq_type
        eq_id = int(args.eq_id)
        varname = args.varname
        value = args.value

        write(eq_type, eq_id, varname, value)
    except:
        raise


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("--eq_type", type=str, help="Equipment type", default=None)
    parser.add_argument("--eq_id", type=int, help="id of the equipment (id_profile)", default=None)
    parser.add_argument("--varname", type=str, help="Variable Name", default=None)
    parser.add_argument("--value", type=str, help="Variable Value", default=None)

    args = parser.parse_args(sys.argv[1:]);

    main(args);
