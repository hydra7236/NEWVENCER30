
def count_brackets(file_path):
    try:
        content = open(file_path, 'r', encoding='utf-8').read()
        counts = {
            '{': content.count('{'),
            '}': content.count('}'),
            '[': content.count('['),
            ']': content.count(']'),
            '(': content.count('('),
            ')': content.count(')')
        }
        for char, count in counts.items():
            print(f"{char}: {count}")
    except Exception as e:
        print(f"Error: {e}")

count_brackets(r"d:\gta\vencer-2k26-portal-mainvecnerrr\vencer-2k26-portal-main\src\data\events.ts")
