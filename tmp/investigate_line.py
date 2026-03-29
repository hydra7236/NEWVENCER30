
import sys

def check_line(file_path, line_num):
    try:
        content = open(file_path, 'r', encoding='utf-8').read()
        lines = content.split('\n')
        if line_num <= len(lines):
            line = lines[line_num - 1]
            print(f"Line {line_num}: '{line}'")
            print(f"Hex: {line.encode('utf-8').hex()}")
            for i, char in enumerate(line):
                print(f"Index {i}: '{char}' (Hex: {char.encode('utf-8').hex()})")
        else:
            print("Line number out of range")
    except Exception as e:
        print(f"Error: {e}")

check_line(r"d:\gta\vencer-2k26-portal-mainvecnerrr\vencer-2k26-portal-main\src\data\events.ts", 245)
