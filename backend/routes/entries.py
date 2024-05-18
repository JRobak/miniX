from flask import Blueprint, json, jsonify, request, g

entries_ = Blueprint('entries', __name__)


@entries_.route('/getEveryEntries', methods=['GET'])
def getEveryEntries():
    if request.method == 'GET':
        with open(g.entries_file_path, 'r', encoding='utf-8') as f:
            entries = json.load(f)
        return jsonify(entries)


@entries_.route('/addNewEntry', methods=['POST'])
def addNewEntry():
    if request.method == 'POST':
        data = request.json
        if data:
            new_entry = {
                'id': data['id'],
                'name': data['name'],
                'content': data['content']
            }

            # zapis do pliku
            with open(g.entries_file_path, 'r', encoding='utf-8') as f:
                entries = json.load(f)

            entries.append(new_entry)

            with open(g.entries_file_path, 'w', encoding='utf-8') as f:
                json.dump(entries, f, ensure_ascii=False, indent=4)

            return jsonify({"message": "Success - adding new entry"})
        else:
            return jsonify({"error": "Error with adding new entry"})