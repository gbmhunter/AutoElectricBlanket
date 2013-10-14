package com.cladlab.autoelectricblanket;

import com.cladlab.autoelectricblanket.util.SystemUiHider;

import android.annotation.TargetApi;
import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.Toast;
import com.cladlab.autoelectricblanket.R;

/**
 * An example full-screen activity that shows and hides the system UI (i.e.
 * status bar and navigation/system bar) with user interaction.
 *
 * @see SystemUiHider
 */
public class FullscreenActivity extends Activity {

	 private class MyWebViewClient extends WebViewClient {
         @Override
         public boolean shouldOverrideUrlLoading(WebView view, String url) {
             view.loadUrl(url);
             return true;
         }
   }
   Button btnBack;
   WebView webview;
   @Override
   protected void onCreate(Bundle savedInstanceState) {
       // TODO Auto-generated method stub
       super.onCreate(savedInstanceState);
       setContentView(R.layout.activity_fullscreen);

       webview=(WebView)findViewById(R.id.webview1);
       webview.setWebViewClient(new MyWebViewClient());
       
       WebView myWebView = (WebView) findViewById(R.id.webview1);
       WebSettings webSettings = myWebView.getSettings();
       webSettings.setJavaScriptEnabled(true);
       
       openURL();
   }

    /** Opens the URL in a browser */
   private void openURL() {
       webview.loadUrl("http://192.168.8.113:8000/view/index.html");
	   //webview.loadUrl("http://www.google.com");
       webview.requestFocus();
   }
}
