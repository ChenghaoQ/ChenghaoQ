from flask import Blueprint, render_template
from app import articles,app
from markupsafe import Markup
#from markdown import markdown
from flask_flatpages import pygmented_markdown
postwall = Blueprint('postwall',__name__)

@postwall.route('/')
def posts():
	#posts = [article for article in articles if 'date' in article.meta]
	posts=[]

	for article in articles:
		print(article.meta)
		if 'date' in article.meta:
			posts.append(article)
			
	#sort posts by date,descending
	
	sorted_posts = sorted(posts,reverse = True,key = lambda page:page.meta['date'])#Because of key is date, so in .md file date cannot be write in wrong format like Date
	#pages may related to template index.html

	return render_template('index.html',pages = sorted_posts)


@app.template_filter('excerpt')
def excerpt_spliter(article):
    sep='<!--More-->'
    if sep in article:
        pass
    else:
        sep = '\n'
    return Markup(pygmented_markdown(article.split(sep,1)[0]))
