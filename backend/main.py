from flask import Flask, json, jsonify, request
import os

app = Flask(__name__)

comments_file_path = 'json/Comments.json'
entries_file_path = 'json/Entries.json'


@app.route('/getEveryEntries', methods=['GET'])
def getEveryEntries():
    print('1')
    if request.method == 'GET':
        with open(entries_file_path, 'r') as f:
            entries = json.load(f)
        return jsonify(entries)


if __name__ == '__main__':
    app.run(debug=True)
