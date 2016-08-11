import os
def main():
	username=input('Your Username: ')
	passwd = input('Your passwd: ')
	commit_msg=input('Please enter the deploy commit msg: ')
	command_list=['git checkout master',
			'git status',
			'git add .',
			'git status',
			'git commit -m "%s"'%commit_msg,
			'git push origin master','%s'%username,
			'git push origin master:gh-pages -f','%s'%username,
			'git push coding master:coding-pages -f','%s'%username,
			'git status']
	for each in command_list:
		os.system(each)
		print('-----------------------------------')


if __name__ == '__main__':
	main()
