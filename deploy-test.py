import os
def main():
	commit_msg=input("Enter commit msg: ")
	command_list=['git checkout master',
			'git status',
			'git add .',
			'git status',
			'git commit -m "%s"'%commit_msg,
			'git push origin master',
			'git push origin master:gh-pages -f',
			'git push coding master:coding-pages -f',
			'git status']
	for each in command_list:
		os.system(each)
		print('-----------------------------------')


if __name__ == '__main__':
	main()
