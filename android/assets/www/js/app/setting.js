/**
 * @author Fabrice
 *
 * Require  jQuery.js
 * 
 * Manage setting view
 */

(function() {
    'use strict';
    
    this.Setting = (function ()
    {
        
        /**
         * Constructor
         * @param {Object} options
         */
        function Setting ()
        {
            
        }
        
        /**
         * listen for setting change events
         */
        Setting.prototype.initListener = function ()
        {
            var _this = this;
            // LISTENER (+) & (-)
            $('.decrease, .increase').on('touchstart', function ()
            {
                var points = ( ($(this).hasClass('decrease')) ? -parseInt($(this).parent().attr('data-points')) : parseInt($(this).parent().attr('data-points')) ),
                    currentNumber = parseInt($(this).siblings('input').val()),
                    minValue = parseInt($(this).parent().attr('data-min'));
                if(parseInt($(this).siblings('input').val()) + points >= minValue) $(this).siblings('input').val( currentNumber + points );
                else $(this).siblings('input').val(minValue);
                $(window).trigger( Static.SETTING_UPDT, [ parseInt($('.nb-player input').val()), parseInt($('.nb-points input').val()) ] );
                if($(this).parent().hasClass('nb-points')){
                    _this.checkMatchingPointsGame();
                }
            });
            
            // Direct input change
            $('.nb-player input, .nb-points input').on('change', function ()
            {
                var minValue = parseInt($(this).parent().attr('data-min'));
                if(parseInt($(this).val()) < minValue) $(this).val(minValue);
                $(window).trigger( Static.SETTING_UPDT, [ parseInt($('.nb-player input').val()), parseInt($('.nb-points input').val()) ] );
                
                if($(this).parent().hasClass('nb-points')){
                    _this.checkMatchingPointsGame();
                }
            });
            
            // select current game
            $('.presets ul li span#' + Data.getInstance().getOption().game).addClass('selected');
            $('.presets ul li span').on('touchstart', function ()
            {
                $('.presets ul li span').removeClass('selected');
                $(this).addClass('selected');
                $(window).trigger( Static.GAMES_UPDT, [ $(this).attr('id') ] );
                
                $('.nb-points input').val(parseInt(Data.getInstance().getOption().score));
            });
        };
        
        Setting.prototype.checkMatchingPointsGame = function ()
        {
            var i, g = Data.getInstance().getGames().games, val = $('.nb-points input').val(), hasFoundMatchingGame = false, current = null;
            for (i = 0; i < g.length; i++) {
                if(g[i].points == val){
                    current = g[i].id;
                    break;
                }
            }
            if(current == null) current = 'default';
            $('.presets ul li span').removeClass('selected');
            $('#' + current).addClass('selected');
            $(window).trigger( Static.GAMES_UPDT, [ current ] );
        };
        
        /**
         * remove setting change event listener
         */
        Setting.prototype.removeListener = function ()
        {
            $('.decrease, .increase').off('touchstart');
            $('.nb-player input, .nb-points input').off('change');
            $('.presets ul li span').off('touchstart');
        };
        
        return Setting;

    })();

}).call(this);
