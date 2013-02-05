/**
 * @author Fabrice
 *
 * Require  jQuery.js
 * 
 * to animate pages, mobile style animation
 */

(function() {
    'use strict';
    
    this.Transition = (function ()
    {
        
        /**
         * Constructor
         * @param {Object} options
         */
        function Transition (options)
        {
            this.options = {
                speed : 500
            }
        }

        /**
         * Get anim ready by putting current content to another htmlElement
         */
        Transition.prototype.prepare = function (side)
        {
            var opt = {
                'position' : 'absolute',
                'top' : '0'
            };
            $('.before-content').height('100%');
            if(side !== 'left') opt.right = $(window).width() + "px";
            else opt.left = $(window).width() + "px";
            $('.' + ((side == "left") ? "before" : "after") + '-content').html($('.content').html());
            $('.content').css(opt);
        };
        
        /**
         * animate old and new content, then remove old content
         * @return {String} side, left || right
         */
        Transition.prototype.animate = function (side, cb)
        {
            var opt = {
                'position' : 'relative',
                'left' : 'auto',
                'right' : 'auto'
            }, optAnim = {},
            side = side || 'left';
            
            if(side !== 'left') {
                optAnim.left = $(window).width() + "px";
            }
            else {
                optAnim.left = '-' + $(window).width() + "px";
            }
            
            $('article').css('position', 'absolute');
            $('article').animate(
                optAnim,
                this.options.speed,
                'ease-out',
                function () {
                    $(this).css({
                        'position' : 'relative',
                        'right' : 'auto',
                        'left' : 'auto'
                    });
                    $('.before-content').height('auto');
                    $('.before-content, .after-content').html('');
                    $('.content').css(opt);
                    //if($('.page-setting').size() > 0) $('.page-setting').height( parseInt($(window).height() - ($('.header-setting').height() + $('.footer-setting').height())) );
                    if( notNull(cb) ) cb();
                }
            );
        };
        
        return Transition;

    })();

}).call(this);
