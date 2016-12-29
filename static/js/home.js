

(function()
{
    function hidesidecontent(sidecont,maincont,sideme)
    {
        sidecont.animate({'left':sideme.width()-sidecont.width()},{duration:500,queue:false});
            
		maincont.animate({'margin-left':sideme.width()},{duration:500,queue:false});
    }
    function hidesidemenu(sidecont,maincont,sideme,closeBarEl)
    {
        sidecont.animate({'left':-sidecont.width()},{duration:0});
        console.log('ccc');
        maincont.animate({'margin-left':0},{duration:500,queue:false});
			
        sideme.animate({'left':-sideme.width()},{duration:500,queue:false});
        closeBarEl.className= 'showbar';
    }
    
    
	var Sidemenu = function()
	{
		this.el = document.querySelector('#sidebar-menu ul');
		this.state = 'allClosed';
		this.el.addEventListener('click',function(evt){
			evt.stopPropagation();
		});
		/*animation*/
		this.sidecont = $('#sidebar-content');
		this.maincont = $('#main-page');
		
		this.menuList = document.querySelectorAll('#sidebar-menu ul>li');
		var self = this;
		for(var i = 0;i<this.menuList.length;i++)
		{
			this.menuList[i].addEventListener('click',function(evt)
			{
				
				var sidecontel = '#'+evt.currentTarget.id+'-content',
					menuContEl = $('#'+evt.currentTarget.id+'-content');

				if(self.state === 'allClosed'){
					self.sidecont.animate({'left':50},{duration:500,queue:false});
					self.maincont.animate({'margin-left':300},{duration:500,queue:false});
					/*menuContEl.delay(800).fadeIn(500);*/

					self.state = 'oneOpened';
					self.MenuContNow = menuContEl;
				}
				if(self.state === 'oneOpened')
				{
					self.MenuContNow.fadeOut(500);
					menuContEl.delay(500).fadeIn(500);
					console.log('open'+menuContEl.id);
					self.state ='oneOpened';
					self.MenuContNow = menuContEl;
				}
			});	
		}
		$('.nav-con-close').on('click',function(){
					
					self.sidecont.animate({'left':-250},{duration:500,queue:false});
					self.maincont.animate({'margin-left':50},{duration:500,queue:false});
					self.state = 'allClosed';
				});
		
	};
	var Sidebar = function(eventId,closeBarId,sidebarContId)
	{
		this.state = 'opened';

		this.el = document.getElementById(eventId||'sidebar-menu');
		this.closeBarEl = document.getElementById(closeBarId||'closeBar');
		this.contel = document.getElementById(sidebarContId||'sidebar-content');
		this.sidemenu = new Sidemenu();
		var self = this;
		
		this.sideme = $('#sidebar-menu');
		this.sidecont = $('#sidebar-content');
		this.sideclose = $('#closeBar');
		this.maincont = $('#main-page');
		this.closeBarEl.addEventListener('click',function(event){
			if(event.target !== self.closeBarEl){
				self.switchTrigger();
				
			}
		});
	};
	Sidebar.prototype.close = function(){	
		this.state = 'closed';
		
		if(this.sidemenu.state === 'oneOpened')
		{
			/*onsole.log(this.sidemenu.state);
			this.contel.className ='a hide-back';
			this.contel.className ='a hide-back-again';*/
			/*this.sidecont.animate({'left':this.sideme.width()-this.sidecont.width()},{duration:500});
            
			this.maincont.animate({'margin-left':this.sideme.width()},{duration:500});*/
			/*hidesidecontent(this.sidecont,this.maincont,this.sideme);
            console.log('aaa');
            /*this.sidecont.animate({'left':-this.sidecont.width()},{duration:0,queue:false});*/
            hidesidemenu(this.sidecont,this.maincont,this.sideme,this.closeBarEl);
			/*this.sidecont.animate({'left':-this.sidecont.width()},{duration:500});
			this.maincont.delay(500)..animate({'margin-left':0},{duration:500});
            
			this.sideme.delay(500).animate({'left':-this.sideme.width()},{duration:500});
			this.sideclose.animate({'left':40},{duration:500});*/
            /*this.closeBarEl.className= 'showbar';*/
            this.sidemenu.state = 'allClosed';
		}
		else if(this.sidemenu.state === 'allClosed')
		{
            hidesidemenu(this.sidecont,this.maincont,this.sideme,this.closeBarEl);
			/*this.sidecont.animate({'left':-this.sidecont.width()},{duration:0,queue:false});
			console.log(this.sideme.width());
			
			
			this.maincont.animate({'margin-left':0},{duration:800,queue:false});
			
			this.sideme.animate({'left':-this.sideme.width()},{duration:500,queue:false});*/
			/*this.closeBarEl.className= 'showbar';*/
		}

		
		
	};
	Sidebar.prototype.open = function(){
		this.state = 'opened';
		
		this.sideme.animate({'left':0},{duration:300,queue:false});
		
		this.maincont.delay(500).animate({'margin-left':this.sideme.width()},{duration:300,queue:false});
		console.log('111');
		this.sidecont.delay(1000).animate({'left':this.sideme.width()-this.sidecont.width()},{duration:0});

		this.closeBarEl.className= 'closebar';
		
	};
	Sidebar.prototype.switchTrigger = function(){
		if(this.state === 'opened'){
			this.close();
		}
		else{
			this.open();
		}
	};
	
	
	
	
	
	
	var /*sidebar = new Sidebar('sidebar-menu','closeBar','sidebar-content'),*/
        backbutton=$('.back-to-top');
        /*main_page=$('#main-page');*/
    function backback()
    {
        $('html,body').animate({
            scrollTop:0
        },800)
    }
    
    function hidebutton()
    {
        if($(window).scrollTop() > $(window).height()/2)
            backbutton.fadeIn();
        else
            backbutton.fadeOut();
    }
	

    if($(window).width()>1024){
        sidebar = new Sidebar('sidebar-menu','closeBar','sidebar-content');
        /*$(function(){setTimeout(hideSideBar,600)});
        sidebar_trigger.on('click',showhideSideBar);*/
        backbutton.on('click',backback);
        $(window).on('scroll',hidebutton);
        $(window).trigger('scroll');
    }
    
	
})();
