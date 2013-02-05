/**
 * @author Fabrice
 *
 * pattern : Singleton
 * Require  jQuery.js
 */
var Note = (function ()
{
    // private var
    var _instance,
        opt = {
            daddy	: 'body',
            ClassName	: 'notification',
            title	: 'Astuce',
            titleWrapper : $('<span>'),
            txt : '',
            txtWrapper : $('<p>')
        },
        $el = $('<div>');

    /**
     * initialise object
     */
    function init ()
    {
        $el.append(opt.titleWrapper);
        $el.append(opt.txtWrapper);
        $el.addClass(opt.ClassName);
    }
    
    /**
     * Display notification
     */
    function show (options)
    {
        $(window).trigger( Static.FREEZE_UI );
        // merge user options with default options
        opt = mergeObject(opt, options);
        
        opt.titleWrapper.text(opt.title);
        opt.txtWrapper.text(opt.txt);
        
        $(opt.daddy).append($el);
        
        setTimeout(function(){
            $el.addClass('display');
        }, 50);
        $el.bind('touchstart', function ()
        {
            hide();
        });
    }
    
    /**
     * Hide notification
     */
    function hide ()
    {
        $el.unbind('touchstart');
        
        $el.removeClass('display');
        setTimeout(function(){
            $(window).trigger( Static.UNFREEZE_UI );
            $el.remove();
        }, 1600);
    }
    
    /**
     * constructor
     */
    function Singleton ()
    {
        /**
         * Singleton constructor
         */
        return {
            initialise : init,
            show : show,
            hide : hide
        };
    }

    var _static = {
        name : "[Object Note]",
        /**
         * Only way to get the only instance of the singleton object
         */
        getInstance : function() {
            if (_instance === undefined) _instance = new Singleton();
            return _instance;
        }
    };
    return _static;

})(); 