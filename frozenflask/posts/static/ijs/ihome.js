;$(function()
{
    'use strict';
    var menu = $('.menu'),
        backbutton=$('.back-to-top'),
        menu_trigger = $('.menu_trigger'),
        mask = $('.mask'),
        sidebar =$('#sidebar'),
        sidebar_item = $('#sidebar>ul>li'),
        sidebar_trigger = $('#sidebar-trigger');
        
    function hidebutton()
    {
        if($(window).scrollTop() > $(window).height()/2)
            backbutton.fadeIn();
        else
            backbutton.fadeOut();
    }
    function backback()
    {
        $('html,body').animate({
            scrollTop:0
        },800)
    }
    
    
    
    
    function showSideBar()
    {
        
        sidebar.css('left',0);
        /*main_page.css('margin-left',sidebar.width());*/
        
        mask.fadeIn(600);
    }
    function hideSideBar()
    {
        sidebar.css('left',-sidebar.width());
        
        mask.fadeOut(600);
    }

    
    
    
    
    
    
    /*main*/
    $(function(){
        if($(window).width()<1024){
            menu_trigger.click(function(){menu.slideToggle()});
            $(function(){setTimeout(hideSideBar,1000)});
            sidebar_trigger.on('click',showSideBar);
            sidebar_item.on('click',hideSideBar);
            mask.on('click',hideSideBar);
            backbutton.on('click',backback);
            $(window).on('scroll',hidebutton);
            $(window).trigger('scroll');
        }
    })
    
    /*sidebar_trigger.on('click',showSideBar)*/
})