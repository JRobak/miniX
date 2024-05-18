from flask import Flask, g
from flask_cors import CORS
from routes import entries, comments

app = Flask(__name__)
CORS(app)

app.register_blueprint(entries.entries_)
app.register_blueprint(comments.comments_)


@app.before_request
def before_request():
    g.comments_file_path = '../frontend/assets/json/Comments.json'
    g.entries_file_path = '../frontend/assets/json/Entries.json'


if __name__ == '__main__':
    app.run(debug=True, port=5000)
