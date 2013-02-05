/**
 * @author Fabrice
 *
 * patterne : Module
 * Objet avec une partie visible pour la lecture et
 * l'ecriture et une partie privée accessible
 * uniquement depuis l'interieur de la class js
 */

var Static = ( function ()
{
    // privates
    var settingUpdt = "setting-updated",
        reload      = "reload-counter",
        gamesUpdt   = "default-games-update",
        swipeLeft   = "s-LEFT",
        swipeRight  = "s-RIGHT",
        freeze      = "freeze-ui",
        unfreeze    = "unfreeze-ui",
        canSwipe    = true;

    return { // dans les accolade du return, sont placé les var et methode public accessible depuis l'exterieur
        // CUSTOM EVENTS FOR THE WHOLE APP
        SETTING_UPDT: settingUpdt,
        RELOAD_APP  : reload,
        GAMES_UPDT  : gamesUpdt,
        SWIPE_LEFT  : swipeLeft,
        SWIPE_RIGHT : swipeRight,
        FREEZE_UI   : freeze,
        UNFREEZE_UI : unfreeze,
        CAN_SWIPE   : canSwipe
    };
}());
