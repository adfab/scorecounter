/**
 * @author Fabrice
 *
 * Require  jQuery.js
 * 
 * Manage device special stuff
 */

var MobileAction = ( function ()
{
    'use strict';
    // privates

    /**
     * Add Listener for device special event
     */
    function initListener ()
    {
        this.swipeDistance = 150;
        // SHAKE EVENTS
        //$('h1').bind('click', function(){
        window.addEventListener('shake', function ()
        {
            $(window).trigger( Static.RELOAD_APP, [ true ] );
        }, false);
        
        $('.reload div').live('touchstart', function ()
        {
            $(window).trigger( Static.RELOAD_APP, [ true ] );
        });
        
        /* --------------------------------------------------------------------------------------- CUSTOM SWIPE LISTENER */
        var touch = {}, _this = this;
        touch.points = 0;
        $(document).bind('touchstart', function (e)
        {
            if(!Static.CAN_SWIPE) return;
            touch.x1 = e.touches[0].pageX;
            //touch.y1 = e.touches[0].pageY;
        }).bind('touchmove', function (e)
        {
            if(!Static.CAN_SWIPE) return;
            e.preventDefault();
            touch.x2 = e.touches[0].pageX;
            //touch.y2 = e.touches[0].pageY;
            //touch.points = Math.round((touch.y1 - e.touches[0].pageY) / 150);
            //touch.points += Math.floor((touch.y1 - e.touches[0].pageY));
            
            if((touch.x1 - touch.x2) > _this.swipeDistance){
                touch.x1 = touch.x2;
                $(document).trigger(Static.SWIPE_RIGHT);
            }
            else if((touch.x1 - touch.x2) < -_this.swipeDistance){
                touch.x1 = touch.x2;
                $(document).trigger(Static.SWIPE_LEFT);
            }
        }).bind('touchend', function (e)
        {
            var xdist = Math.abs(touch.x1 - touch.x2);
            /*
            var ydist = Math.abs(touch.y1 - touch.y2);
            if (ydist >= 150) {
                if (touch.y1 < touch.y2) alert("SWIPE UP");
                else alert("SWIPE DOWN");
            }
            alert(xdist);
            */
            touch = {}
        }).bind('touchcancel', function ()
        {
            touch = {}
        });
    }
    
    /**
     * call when app is send to setting page
     */
    function swipeGoToSetting ()
    {
        $(document).unbind(Static.SWIPE_LEFT);
        $(document).bind(Static.SWIPE_LEFT, function ()
        {
            $('.setting a').trigger('click');
        });
    }
    
    /**
     * call when app is send to counter page
     */
    function swipeGoToCounter ()
    {
        $(document).unbind(Static.SWIPE_RIGHT);
        $(document).bind(Static.SWIPE_RIGHT, function ()
        {
            $('.back a').trigger('click');
        });
    }
    
    /**
     * Remove Listener for device special event
     */
    function removeListener ()
    {
        window.removeEventListener('shake');
        $('.reload div').die('touchstart');
    }

    return { // dans les accolade du return, sont placé les var et methode public accessible depuis l'exterieur
        initListener : initListener,
        removeListener : removeListener,
        swipeGoToSetting : swipeGoToSetting,
        swipeGoToCounter : swipeGoToCounter
    };
    
}());
