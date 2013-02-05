package com.example.counter;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.WindowManager;

import com.adfab.counter.R;
import org.apache.cordova.DroidGap;

public class Counter extends DroidGap {

	public static final String QUIT = "Quit";
	public static final String RELOAD = "Reload";
	public static final String CLEAR_DATA_CACHE = "Clear cache";
	public static final String DISPLAY_ASTUCE = "Astuce";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.loadUrl("file:///android_asset/www/index.html", 10000);
        //super.setStringProperty("loadingDialog", "Starting your app...");
        //getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
	    super.onCreateOptionsMenu(menu);
	    int base = Menu.FIRST;
	    // Group, item id, order, title
	    menu.add(base, base, base, Counter.QUIT);
	    menu.add(base, base, base, Counter.RELOAD);
	    menu.add(base, base, base, Counter.CLEAR_DATA_CACHE);
	    menu.add(base, base, base, Counter.DISPLAY_ASTUCE);
	    return true;
    }
    
   //handle menu item selection
    public boolean onOptionsItemSelected(MenuItem item) {
    	if (item.hasSubMenu() == false) {
		    if(Counter.QUIT == item.getTitle()) {
		    	finish();
		    }
		    else if(Counter.RELOAD == item.getTitle()) {
		    	this.sendJavascript("menuReload();"); 
		    }
		    else if(Counter.CLEAR_DATA_CACHE == item.getTitle()) {
		    	this.sendJavascript("clearDataCache();"); 
		    }
		    else if(Counter.DISPLAY_ASTUCE == item.getTitle()) {
		    	this.sendJavascript("displayAstuce();"); 
		    }
	    }
	    return true;
    }
    
}
