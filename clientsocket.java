// package com.stardash.stardash;

import java.io.*;
import java.net.*;
import java.util.function.Function;

public class clientsocket {

    int serverPort;
    Socket socket;
    PrintWriter toServer;
    BufferedReader fromServer;

    public clientsocket(){
        serverPort = 4753;
        try {
            socket = new Socket("localhost", serverPort);
            toServer =
                    new PrintWriter(socket.getOutputStream(), true);
            fromServer =
                    new BufferedReader(
                            new InputStreamReader(socket.getInputStream()));
        } catch (UnknownHostException ex) {

        } catch (IOException e) {
        }
    }

    public void stopConnection(){
        toServer.close();
        try {
            fromServer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public void sendMessage(String message) {

        toServer.print(message);
      // toServer.write(message);
      
    }

    public String run() {
        String line = "No Answer";
        try {
            System.out.println("12");
            line = fromServer.readLine();
            line += "\n"+fromServer.readLine();
            line += "\n"+fromServer.readLine();
            line += "\n"+fromServer.readLine();
            line += "\n"+fromServer.readLine();
            line += "\n"+fromServer.readLine();
            line += "\n"+fromServer.readLine();
            line += "\n"+fromServer.readLine();
            line += "\n"+fromServer.readLine();
            line += "\n"+fromServer.readLine();
            System.out.println("34");
        } catch (IOException e) {
            e.printStackTrace();
        }
    catch (Error e) {}
        return line;
    }
}
