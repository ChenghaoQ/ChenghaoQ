from flask import Flask
from flask_flatpages import FlatPages
from flask_frozen import Freezer


#init the flask
app = Flask(__name__)

#load the settings from .py file
app.config.from_pyfile('settings.py')
#initialize the article pages
articles = FlatPages(app) #FlatPages use 'app' as arguments
#initialize the freezer
freezer = Freezer(app)

#after initialize import views
#from app import views

#from .view.index import index
from .view.postwall import postwall
from .view.article import article

#注册蓝图
#app.register_blueprint(index)
app.register_blueprint(postwall)
app.register_blueprint(article)
