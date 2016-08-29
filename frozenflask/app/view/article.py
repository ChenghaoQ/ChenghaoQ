from flask import Blueprint, render_template
from app import articles
article = Blueprint('article',__name__)

@article.route('/article/<path:path>/')
def page(path):
	#path is the filename of a page,https://github.com/ChenghaoQ/ChenghaoQ.git without the file extension
	#e.g."first-post
	article = articles.get_or_404(path)
	#page= article may have problem !!!!!1
	#page may related to the template referal
	#article is the data we extracted by python,and now we need to use template, in template, the name is page->{{ page.meta.title }}
	#So page = article
	return render_template('article.html',page=article)