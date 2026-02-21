#!/usr/bin/env python3
import json
import sys

# Read the JSON string from stdin or a file
if len(sys.argv) > 1:
    with open(sys.argv[1], 'r', encoding='utf-8') as f:
        json_str = f.read()
else:
    json_str = sys.stdin.read()

try:
    # Parse the JSON
    data = json.loads(json_str)
    # Format with 2-space indentation
    formatted = json.dumps(data, indent=2, ensure_ascii=False)
    print(formatted)
except json.JSONDecodeError as e:
    print(f"Error parsing JSON: {e}", file=sys.stderr)
    sys.exit(1)




