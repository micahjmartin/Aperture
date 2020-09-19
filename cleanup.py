import json

with open("assets/js/colors.js") as fil:
    data = json.load(fil)

output = {}
for k, v in data.items():
    if v.get("color"):
        output[k] = v["color"]

print(json.dumps(output))