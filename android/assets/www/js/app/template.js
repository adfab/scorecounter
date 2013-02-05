/**
 * @author Fabrice
 *
 * Require jQuery.js
 * 
 * Template element for button player
 *   - player score
 *   - player name
 *   - button events like tap (+) & (-) to update the score
 * 
 */

(function() {
    'use strict';
    
    this.Template = (function ()
    {
        /**
         * Constructor
         * @param {Object} options
         */
        function Template (options)
        {
            this.options = {
                score : 10,
                name : '',
                scaleScore : 0.13,
                scaleName : 0.20,
                scalePlusMoins : 0.07,
                nbPlayers : 2,
                swipeDistance : 30
            }
            this.$el = $('<li>');
            // merge user options with default options
            this.options = mergeObject(this.options, options);
        }
        
        /**
         * Create element and add it to the daddy parameter
         * @param daddy, parent container
         * @param options, to override constructor options
         */
        Template.prototype.createElm = function (daddy, options)
        {
            var _this = this;
            options = options || {};
            // merge user options with default options
            this.options = mergeObject(this.options, options);
            this.removeListener();
            if(!notNull(daddy)) return;
            this.$el.html('<span class="player-score">0</span><span class="player-name"></span><div class="moins"><span class="icon-minus"></span></div><div class="plus"><span class="icon-plus"></span></div>');
            daddy.append(this.$el);
            
            // set width & height for <li> elements
            this.$el.height( (daddy.height() / ((this.options.nbPlayers + (this.options.nbPlayers % 2)) * .5)) - 2 );
            this.$el.width( (daddy.width() * .5) - 2 );
            
            var playerScore = this.$el.find('.player-score');
            
            playerScore.css( 'font-size', ((_this.$el.height() * _this.options.scaleScore + (this.options.nbPlayers * 2)) + "px") );
            playerScore.css( 'top', ((this.$el.height() * .5) - (playerScore.height() * .5)) + "px" );
            
            var fontSize = ((_this.$el.height() * _this.options.scalePlusMoins) + (this.options.nbPlayers));
            
            $('.icon-plus, .icon-minus').css( 'font-size', fontSize + "px" );
            $('.icon-plus').css( 'right', this.options.nbPlayers * 2 );
            $('.icon-minus').css( 'left', this.options.nbPlayers * 2 );
            $('.icon-plus, .icon-minus').css( 'top', ((this.$el.height() * .5) - ($('.icon-plus').height() * .5)) + "px" );
            
            this.setName(this.options.name);
            this.setScore(this.options.score);
            this.initListener();
        };
        
        /**
         * add UI listener to the elements 
         */
        Template.prototype.initListener = function ()
        {
            // IMPORTANTE, conflict between [lontap / tap] and touchstart event,
            // so i made it all with touchstart event and added timestamp
            // condition to check differents king of events
            
            var touch = {}, touchPts = {}, _this = this;
            
            // TAP EVENT ON PLUS & MINUS BUTTON
            this.$el.find('.plus, .moins').bind('touchstart', function (e)
            {
                var classToAdd = "",
                    _that = $(this),
                    liElm = $(this).parent('li');
                $('.container-counter li').attr('class', '');
                e.preventDefault();
                touchPts.start = new Date().getTime();
                touch.hasMoved = false;
                _that.bind('touchmove', function (e)
                {
                    touch.hasMoved = true;
                    _this.$el.find('.plus, .moins').unbind('touchend').unbind('touchmove');
                });
                _that.bind('touchend', function (e)
                {
                    e.preventDefault();
                    touchPts.end = new Date().getTime();
                    if(!touch.hasMoved && (touchPts.end - touchPts.start) < 1000){
                        _this.setScore( ((_that.hasClass('plus')) ? 1 : -1 ) );
                        
                        if(_that.hasClass('plus'))  classToAdd = 'anim-plus';
                        else classToAdd = 'anim-moins';
                        
                        if(classToAdd !== ""){
                            liElm.addClass(classToAdd);
                            setTimeout(function(){
                                liElm.removeClass(classToAdd);
                            }, 150);
                        }
                    }
                    _this.$el.find('.plus, .moins').unbind('touchend').unbind('touchmove');
                    touchPts = {}
                });
            });
            
            // SWIPE TOP & BOTTOM + LONGTAP
            this.$el.bind('touchstart', function (e)
            {
                //e.preventDefault();
                touch.y1 = e.touches[0].pageY;
                touch.start = new Date().getTime();
                touch.hasMoved = false;
                $('body').bind('touchmove', function (e)
                {
                    //e.preventDefault();
                    touch.y2 = e.touches[0].pageY;
                    if((touch.y1 - touch.y2) > _this.options.swipeDistance){
                        touch.hasMoved = true;
                        if(!_this.$el.hasClass('anim-plus')) _this.$el.removeClass('anim-moins').addClass('anim-plus');
                        _this.setScore(1);
                        touch.y1 = touch.y2;
                    }
                    else if((touch.y1 - touch.y2) < -_this.options.swipeDistance){
                        touch.hasMoved = true;
                        if(!_this.$el.hasClass('anim-moins')) _this.$el.removeClass('anim-plus').addClass('anim-moins');
                        _this.setScore(-1);
                        touch.y1 = touch.y2;
                    }
                }).bind('touchend', function (e)
                {
                    touch.end = new Date().getTime();
                    if(!touch.hasMoved && (touch.end - touch.start) > 1500){
                        var init = init || false, name = '';
                        if(!init){
                            name = prompt("Player name", "");
                            if (notNull(name)) _this.setName(name);
                        }
                    }
                    if(touch.hasMoved) _this.$el.attr('class', '');
                    $('body').unbind('touchmove').unbind('touchend');
                    touch = {}
                });
            });
        };
        
        /**
         * remove UI listener to the elements 
         */
        Template.prototype.removeListener = function ()
        {
            if(!notNull(this.$el)) return;
            this.$el.attr('class', '');
            var _this = this;
            $('body').unbind('touchmove').unbind('touchend');
            this.$el.unbind('touchstart');
            if(this.$el.find('.plus, .moins').size() > 0) this.$el.find('.plus, .moins').unbind('touchstart').unbind('touchend').unbind('touchmove');
        };
        
        /**
         * retrieve template element
         */
        Template.prototype.getElm = function ()
        {
            return this.$el;
        };
        
        /**
         * setter to change the name
         * @param name, new name
         */
        Template.prototype.setName = function (name)
        {
            this.options.name = name;
            this.$el.find('.player-name').text(name);
        };
        
        /**
         * setter to change the score
         * @param points, points to replace to the current score
         */
        Template.prototype.changeScore = function (points)
        {
            this.$el.find('.player-score').text(points);
        };
        
        /**
         * setter to change the score
         * @param points, points to add to the current score
         */
        Template.prototype.setScore = function (points)
        {
            this.$el.find('.player-score').text(
                (this.getScore() + parseInt(points) >= 0) ? this.getScore() + parseInt(points) : 0
            );
        };
        
        /**
         * getter to get the score
         */
        Template.prototype.getScore = function ()
        {
            return parseInt(this.$el.find('.player-score').text());
        };
        
        return Template;

    })();

}).call(this);
