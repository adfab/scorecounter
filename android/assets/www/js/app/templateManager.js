/**
 * @author Fabrice
 *
 * Require  jQuery.js
 *          template.js
 *          CameraManager.js
 * 
 */
(function() {
    'use strict';
    
    this.TemplateManager = (function ()
    {
        
        /**
         * Constructor
         */
        function TemplateManager ()
        {
            var _this = this;
            this.hasListener = false;
            this.options = Data.getInstance().getOption();
            this.arrTemplate = [];
        }
        
        /**
         * Initialise APP
         * 
         * Param are only [need / used] when the reload event is fired
         * @param evt
         * @param reload
         */
        TemplateManager.prototype.initDefault = function (evt, reload)
        {
            var i,
            reload = reload || false;
            this.removeListener();
            this.initListenerApp();
            this.container = $('#container-counter');
            
            this.container.height( $(window).height() - ($('header').height() + $('.footer-counter').height()) );
            
            if(this.arrTemplate.length <= 0 || this.options.nbPlayers != Data.getInstance().getOption().nbPlayers){
                this.options = mergeObject(this.options, Data.getInstance().getOption());
                this.arrTemplate = [];
                for (i = 0; i < this.options.nbPlayers; i++) {
                    this.arrTemplate.push( new Template(this.options) );
                    this.arrTemplate[i].createElm(this.container);
                };
            }
            else{
                var score = Data.getInstance().getOption().score;
                // if reloading game, Map & Filter player's score to know if restart is needed
                if(reload && this.arrTemplate.map( function (t) // map score
                    {
                        return t.getScore();
                    }).filter(function(val) { // filter score
                        return (val != score);
                    }).length )// check length to know if there are score differents than the current default one
                {
                    reload = confirm("Recommencer le match ?"); // ask confirm reloading score
                }
                    
                for (i = 0; i < this.options.nbPlayers; i++) {
                    this.container.append(this.arrTemplate[i].getElm());
                    this.arrTemplate[i].initListener();
                    if(this.options.score != score || reload) this.arrTemplate[i].changeScore(score);
                }
                this.options = mergeObject(this.options, Data.getInstance().getOption());
            }
        };

        /**
         * remove UI listener to the elements 
         */
        TemplateManager.prototype.initListenerApp = function ()
        {
            var i, _this = this;
            if(this.hasListener) return;
            this.hasListener = true;
            for (i = 0; i < this.arrTemplate.length; i++) {
                this.arrTemplate[i].initListener();
            };
            Static.CAN_SWIPE = true;
            $('.setting div, .back div').live('touchstart', function (e)
            {
                $(this).next('a').trigger('click');
            });
            
            $(window).unbind( Static.UNFREEZE_UI )
                     .bind( Static.RELOAD_APP, function(e, r){ _this.initDefault(e, r); } )
                     .bind( Static.FREEZE_UI, function (){ _this.removeListenerApp(); } );
        };
        
        /**
         * remove notifications listener witch freeze elements 
         */
        TemplateManager.prototype.removeListenerApp = function ()
        {
            if(!this.hasListener) return;
            this.hasListener = false;
            var _this = this;
            Static.CAN_SWIPE = false;
            $('.setting div, .back div').die('click');
            $(window).unbind( Static.RELOAD_APP )
                     .unbind( Static.FREEZE_UI )
                     .bind( Static.UNFREEZE_UI, function(){ _this.initListenerApp(); } );
            this.removeListener();
        };
        
        /**
         * remove UI listener to the elements 
         */
        TemplateManager.prototype.removeListener = function ()
        {
            var i;
            for (i = 0; i < this.arrTemplate.length; i++) {
                this.arrTemplate[i].removeListener();
            };
        };
        
        return TemplateManager;

    })();

}).call(this);
