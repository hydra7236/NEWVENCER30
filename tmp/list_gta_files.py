
import os

def list_files(path):
    try:
        files = os.listdir(path)
        for f in files:
            print(f)
    except Exception as e:
        print(f"Error: {e}")

list_files(r"D:\gta")
