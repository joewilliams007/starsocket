// package com.stardash.stardash;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.os.StrictMode;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;


// public class ChatActivity extends AppCompatActivity {

   public class ChatActivity{  
        public static void main(String args[])  
        {    

          //  StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
          //  StrictMode.setThreadPolicy(policy);
            //sendMessage();
            // online();
            sendMessage();

        }


    public static void online() {

        clientsocket client = new clientsocket();
        System.out.println(client.run());
        client.stopConnection();
      //  ((TextView) findViewById(R.id.textViewOnline)).setText(client.run());
       //  Toast.makeText(this, client.run(), Toast.LENGTH_LONG).show();

    }

    public static void sendMessage() {
        clientsocket client = new clientsocket();

        String message = "heee";       // ((EditText)findViewById(R.id.editTextSendMessage)).getText().toString();
      //  ((TextView) findViewById(R.id.textViewOnline)).setText("All Messages\n"+message);
        client.sendMessage(message);
       
    }
}//  ((TextView) findViewById(R.id.textViewOnline)).setText("fail");