
#for view parts, we need 3 things:templates,flask,flatpages
from flask import render_template #for using render_template
#from __init__.py import app ('flask'), articles ('flatpages')
from app import app,articles


#set the articlelist route
@app.route('/')
def index():
	return render_template('index.html')
@app.route('/posts.html')
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



#where does path come from
@app.route('/article/<path:path>/')
def page(path):
	#path is the filename of a page,https://github.com/ChenghaoQ/ChenghaoQ.git without the file extension
	#e.g."first-post
	article = articles.get_or_404(path)
	#page= article may have problem !!!!!1
	#page may related to the template referal
	#article is the data we extracted by python,and now we need to use template, in template, the name is page->{{ page.meta.title }}
	#So page = article
	return render_template('article.html',page=article)
