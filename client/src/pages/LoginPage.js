import "../App.css";

import {useState, useEffect} from 'react';
import {jwtDecode} from "jwt-decode";

export const LoginPage = () => {
    const [user, setUser] = useState({});

    function handleCallbackResponse(response) {

        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwtDecode(response.credential);
        console.log(userObject)
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
    }

    function handleSignOut(event){
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "360602520506-j5et35bhqgd81ssr17fkth5gplr10sse.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "medium"}
            );
        
        google.accounts.id.prompt();
            
        },[]);

        //Will check if user is signed in to output sign out button
        return (
            <div className="log">
                <div id="signInDiv"></div>
                {
                    Object.keys(user).length !== 0 && (
                    <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
                )}
                { user && 
                    <div>
                        <img src={user.picture}alt=""></img>
                        <h3>{user.name}</h3>
                        <h4>{user.email}</h4>
                    </div>
                }
                </div>
        )}