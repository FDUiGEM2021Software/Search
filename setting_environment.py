import sys
import os
def main():
    try :
        path = sys.path[0]
        path.replace(' ', '')
        requirement_path = path + '\\requirements.txt'
        command = 'pip install -r ' +path
        os.popen(command).readlines()
    except:
        print("failed to install, please install manually")
main()
