from flask import Blueprint, render_template
from app import articles
postwall = Blueprint('postwall',__name__)

@postwall.route('/posts.html')
def posts():
	#posts = [article for article in articles if 'date' in article.meta]
	posts=[]

	for article in articles:
		if 'date' in article.meta:
			posts.append(article)
			
	#sort posts by date,descending
	
	sorted_posts = sorted(posts,reverse = True,key = lambda page:page.meta['date'])#Because of key is date, so in .md file date cannot be write in wrong format like Date
	#pages may related to template index.html

	return render_template('posts.html',pages = sorted_posts)
