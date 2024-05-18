from flask import Blueprint, json, jsonify, request, g

comments_ = Blueprint('comments', __name__)


@comments_.route('/getEveryComments', methods=['GET'])
def getEveryComments():
    if request.method == 'GET':
        with open(g.comments_file_path, 'r', encoding='utf-8') as f:
            comments = json.load(f)
        return jsonify(comments)


@comments_.route('/addNewComment', methods=['POST'])
def addNewComment():
    if request.method == 'POST':
        data = request.json
        if data:
            # zapis do pliku
            with open(g.comments_file_path, 'r', encoding='utf-8') as f:
                comments = json.load(f)

            new_comment = {
                'id': len(list(comment['id'] for comment in comments)) + 1,
                'entry_id': int(data['entry_id']),
                'name': data['name'],
                'content': data['content']
            }

            comments.append(new_comment)

            with open(g.comments_file_path, 'w', encoding='utf-8') as f:
                json.dump(comments, f, ensure_ascii=False, indent=4)

            return jsonify({"message": "Success - adding new entry"})
        else:
            return jsonify({"error": "Error with adding new entry"})