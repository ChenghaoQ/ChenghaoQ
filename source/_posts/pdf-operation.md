---
layout: posts
title: 使用Python操作PDF
date: 2018-06-22 17:13:05
tags:
categories: Python
---


最近在工作过程中发现的问题。客户在经常会使用拍照的方法提供底稿资料，成千上万的照片在逐一转换，分类，合并，打印操作过程中会浪费大量的时间。之前有尝试过一些软件来操作但是效果仍不尽如人意。这次使用PyPDF2和PIL两个库来完成我们的PDF转换，制作插页，合并及分拆操作。


<!--More-->

##工具准备

- Python3.x
- PIL
- Reportlab
- PyPDF2

## 获得当前目录下的所有文件及文件夹路径

进行批量处理的前提是你可以访问多个文件，下面这行代码的作用是讲当前目录下的所有文件的完整路径放入一个列表中，方便后面通过循环来调用

	```Python
	import os
	files=[]
	for filename in os.listdir(os.getcwd()):
		files.append(os.getcwd()+os.sep+filename) #方案一，放入files列表里,方便以后调用
		function(os.getcwd()+os.sep+filename)#方案二，不保存为到列表直接调用
	```

- os.getcwd()：会显示当前路径（绝对路径）
- os.listdir(os.getcwd())：会显示出当前路径下的所有文件及文件夹的名称（不包含路径），输出结果为['abc.pdf','xyz.jpg','123.xlsx','新建文件夹']
- os.getcwd()+os.sep+filename：将文件名和路径结合在一起，os.sep为路径分隔符（Unix类系统为'/',Windows系列为"//"或'\'
- 方案一：使用第2行新建列表，第4行逐条添加到列表
- 方案二：忽略第2、4行，直接使用第5行调用函数


## 图片转换PDF



	```Python
	import PIL.Image
	def img2pdf(filename,keyword):
	    im = PIL.Image.open(filename) #打开文件
	    name = filename.split(keyword)[0]#切掉后缀
	    im = im.convert('RGB')#转换为RGB
	    PIL.Image.Image.save(im,name+'.pdf',"PDF",resolution = 100.0)#保存为PDF
	    print(filename+' has been processed to %s'%name)#提示操作完成
	```



<!--首先我们引入Python自带的PIL图片处理库，接着我们定义一个可以将图片转换为PDF的函数。该函数接收两个变量：
- filename: 包含完整路径的文件名称（例如：abc/xyz/123.jpg)
- keyword: 这里是指文件的后缀，可以是jpg,可以是png,等等等等，目的有两个：
	- 在保存前使用split函数切掉该后缀并替换为.pdf后缀
	- 与目录遍历工具配合（最后会讲）在同一目录下进行选择性操作，例如只转换目录下jpg文件而跳过png文件。
操作过程的原理基本与手动处理相同，即：
> 打开图片 -> 转换RGBA为RGB -> 保存文件为PDF格式
1. 第3行：打开文件，这里使用的路径可以是绝对路径（推荐）也可以是相对路径
2. 第4行：切掉之前的后缀(abc/xyz/123.jpg -> abc/xyz/123),方便后面添加新的后缀。也可以使用replace('.jpg','.pdf')直接替换
3. 第5行：将图片转换为RGB三原色格式，有的图片格式为RGBA（RedBlueGreenAlpha),Alpha指透明度。我使用的版本不可直接保存为PDF
4. 第6行：将pdf文件保存在同一目录下
5. 第7行：当任务完成后提示操作完成-->

## PDF文件操作

### 制作分隔页

    ```Python
    from reportlab.pdfgen import canvas
    from reportlab.platypus import Paragraph
    import reportlab.pdfbase.ttfonts #导入reportlab的注册字体
    reportlab.pdfbase.pdfmetrics.registerFont(reportlab.pdfbase.ttfonts.TTFont('LiHei', '/Users/chenghaoq/MySQL/LiHei.ttf'))
    from reportlab.lib.units import inch
    from reportlab.lib.styles import getSampleStyleSheet
    
    def Coverpage(passage):
        styleSheet = getSampleStyleSheet()
        style = styleSheet['BodyText']
        style.fontName = 'LiHei'
        style.fontSize = 20
        style.leading = 20
        c = canvas.Canvas('C.'+passage)
        c.setFont('LiHei',20)
        pa = Paragraph(passage,style)
        pa.wrapOn(c,6*inch,8*inch)
        pa.drawOn(c,100,500)
        c.save()

    ```

Coverpage这个函数会在相同目录下生成一个新的插页PDF文件，我们在这里面使用reportlab来

### PDF合并

    ```Python
    def pdf_merge(filelist,output_name,coverpage=False):
        pdfFileWriter = PdfFileWriter()   
        for print_file in filelist:
                if '.pdf' in print_file:
                    print("Processing %s"%print_file)
                    if coverpage:
                    #create the cover page and append to the writer
                        Coverpage(print_file)
                        C_pdfReader = PdfFileReader(open('C.'+print_file, 'rb'),strict=False)
                        pageObj = C_pdfReader.getPage(0)
                        pdfFileWriter.addPage(pageObj)
                    #read the file and append to the writer
                    pdfReader = PdfFileReader(open(print_file, 'rb'),strict=False)
                    numPages = pdfReader.getNumPages()
                    for index in range(0, numPages):
                        pageObj = pdfReader.getPage(index)
                        pdfFileWriter.addPage(pageObj)     
        pdfFileWriter.write(open(output_name, 'wb'))
    ```

pdf_merge这个函数需要引入三个变量：
1. 含有所有需要合并的PDF文件的列表（我们刚刚在同一目录下的批量操作中已经获得）
2. 输出的文件名字 
3. 是否使用插页隔开（可选,默认选是False，如果为True，将生成插页并插入至对应部分前，插页内容为文件名）



### PDF分拆


    ```Python
    def pdf_split(pdf_file,page_range=None):
        #range is a list seems like [2,3,5,7]
        split_path = pdf_file.split('.pdf')[0]
        os.makedirs(split_path)
        pdfReader = PdfFileReader(open(pdf_file, 'rb'),strict=False)
        numPages = [each-1 for each in page_range] if page_range else range(0,pdfReader.getNumPages())
        for index in numpages:
            pageObj = pdfReader.getPage(index)
            pdfFileWriter = PdfFileWriter() 
            pdfFileWriter.addPage(pageObj)
            pdfFileWriter.write(open(split_path+os.sep+"%d.pdf"%index, 'wb'))
    ```
        



    
    
    
    
    
    
    
    
