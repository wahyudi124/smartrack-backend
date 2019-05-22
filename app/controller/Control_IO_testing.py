import time, os, random
import sys, argparse, ast

ThisFolder = os.path.abspath('.')
ParentFolder = os.path.abspath('..')

# Write function
def write(id, Type, Port, Value):
    print(random.choice([1, 4, -1]))

# Main Function
def main(args):
    try:
        id = int(args.id)
        Type = args.Type
        Port = int(args.Port)
        Value = ast.literal_eval(args.Value)

        write(id, Type, Port, Value)
    except:
        print(-1)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("--id", type=str, help="IO id", default=None)
    parser.add_argument("--Type", type=str, help="Type (DO/AO)", default=None)
    parser.add_argument("--Port", type=int, help="Port number", default=None)
    parser.add_argument("--Value", type=str, help="Value", default=None)

    args = parser.parse_args(sys.argv[1:]);

    main(args);
