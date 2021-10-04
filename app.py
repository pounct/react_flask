# -*- coding: utf-8 -*
from flask import Flask,  jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import datetime


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/flask01'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text())
    date = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, title, body):
        self.title = title
        self.body = body


class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'date')


article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)

# db.create_all()


@app.route('/hello', methods=["GET"])
def hello():
    return jsonify({'Hello': "World"})


@app.route('/get', methods=["GET"])
def get_articles():
    all_articles = Articles.query.all()
    results = articles_schema.dump(all_articles)

    return jsonify(results)


@app.route('/get/<id>/', methods=["GET"])
def get_article(id):
    article = Articles.query.get(id)

    return article_schema.jsonify(article)


@app.route('/add', methods=["POST"])
def add_article():
    title = request.json['title']
    body = request.json['body']
    article = Articles(title, body)

    db.session.add(article)
    db.session.commit()

    return article_schema.jsonify(article)


@app.route('/update/<id>/', methods=["PUT"])
def update_article(id):
    article = Articles.query.get(id)
    title = request.json['title']
    body = request.json['body']
    article.title = title
    article.body = body

    db.session.commit()

    return article_schema.jsonify(article)


@app.route('/delete/<id>/', methods=["DELETE"])
def delete_article(id):
    article = Articles.query.get(id)

    db.session.delete(article)
    db.session.commit()

    return article_schema.jsonify(article)


if __name__ == "__main__":
    app.run(debug=True)
