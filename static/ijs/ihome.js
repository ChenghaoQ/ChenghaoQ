;$(function()
{
    'use strict';
    var menu = $('.menu'),
        backbutton=$('.back-to-top'),
        menu_trigger = $('.menu_trigger');
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
    menu_trigger.click(function(){menu.slideToggle()})
    backbutton.on('click',backback)
    $(window).on('scroll',hidebutton)
    $(window).trigger('scroll')

    
    /*sidebar_trigger.on('click',showSideBar)*/
})