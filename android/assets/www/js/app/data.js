/**
 * @author Fabrice
 *
 * pattern : Singleton
 * Require  jQuery.js
 */
var Data = (function ()
{
    // private var
    var _instance,
        defaultData = {
                "option" :
                {
                    'nbPlayers' : 2,
                    'score' : 10,
                    'game' : 'default',
                    'lastDayUsed' : '0-0-0'
                }
        },
        allData = null,
        dataName = 'sCoRe-CoUnTeR',
        noteDatas = null,
        games = null,
        date = null;

    /**
     * initialise object
     */
    function init ()
    {
        allData = getDatas();
        var currentDate = (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear());
        if(allData.option.lastDayUsed !== currentDate){ // if user open the app a new day, it get a notification tips
            allData.option.lastDayUsed = currentDate;
            setData();
            sendNote();
        }
        
        getGames();
        initListener();
    }
    
    function sendNote ()
    {
        if(!notNull(noteDatas)){
            var request = new XMLHttpRequest();
            request.open("GET", "js/json/notes.json");
            request.onreadystatechange = function()
            {
                if (request.readyState == 4){
                    var noteDatas = JSON.parse(request.responseText).messages;
                    setTimeout(function(){
                        note.show( noteDatas[(Math.floor(Math.random() * noteDatas.length))] );
                    }, 2000);
                }
            };
            request.send();
        }
        else{
            note.show( noteDatas[(Math.floor(Math.random() * noteDatas.length))] );
        }
    }
    
    /**
     * initialise listener events
     */
    function initListener ()
    {
        $(window).bind(Static.SETTING_UPDT, function (e, nbPlayers, score)
        {
            setPlayers(nbPlayers);
            setScore(score);
        });
        $(window).bind( Static.GAMES_UPDT, function (e, gameID)
        {
            setGame(gameID);
        });
    }
    /**
     * Get data from user's local storage
     * or create default data and store them
     * @return {Object} data from local storage
     */
    function getDatas ()
    {
        var data = window.localStorage.getItem(dataName);
        date = new Date();
        if(!notNull(data)){
            data = defaultData;
            window.localStorage.setItem(dataName, JSON.stringify(data));
        }
        else {
            data = JSON.parse(data);
        }
        
        return data;
    }
    
    /**
     * Save default player's in game
     * @param {Integer} nb
     */
    function setPlayers (nb)
    {
        if(allData.option.nbPlayers != nb){
            allData.option.nbPlayers = nb;
            setData();
        }
    }
    
    /**
     * Save default player score
     * @param {Integer} nb
     */
    function setScore (nb)
    {
        if(allData.option.score != nb){
            allData.option.score = nb;
            setData();
        }
    }
    
    /**
     * Save current game mode
     * @param {Integer} nb
     */
    function setGame (gameID)
    {
        if(!notNull(allData.option.score) || allData.option.game != gameID){
            var i, g = getGames().games;
            for (i = 0; i < g.length; i++) {
                if(g[i].id === gameID){
                    setScore(g[i].points);
                    break;
                }
            }
            allData.option.game = gameID;
            setData();
        }
    }
    
    /**
     * Save default options
     * @param {Object} data
     */
    function setData ()
    {
        if(!notNull(allData)){
            allData = defaultData;
        }
        window.localStorage.setItem(dataName, JSON.stringify(allData));
    }
    
    /**
     * @return {Object} default options
     */
    function getOption ()
    {
        return allData.option;
    }
    
    /**
     * @return {Object} all game modes
     */
    function getGames ()
    {
        if(games == null){
            var request = new XMLHttpRequest();
            request.open("GET", "js/json/games.json");
            request.onreadystatechange = function()
            {
                if (request.readyState == 4)
                    games = JSON.parse(request.responseText);
            };
            request.send();
        }
        return games;
    }
    
    /**
     * clear data from local storage
     */
    function clear ()
    {
        window.localStorage.removeItem(dataName);
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
            getOption : getOption,
            setPlayers : setPlayers,
            setScore : setScore,
            getGames : getGames,
            setGame : setGame,
            clearLocalStorage : clear,
            sendNote : sendNote
        };
    }

    var _static = {
        name : "[Object Data]",
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