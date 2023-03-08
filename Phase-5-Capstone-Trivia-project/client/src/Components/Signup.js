import { useState, useEffect } from "react";
import {Form, Button, Label, Input} from "semantic-ui-react"
import { useNavigate } from "react-router-dom";

function Signup({setCurrentUser, setLogin}){

    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleCallbackResponse(response){
        console.log("encoded JWT ID token" + response.credential)
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
           client_id: "405177722456-fpfcqtmigg7nng9dmvb16jnj6e13rse3.apps.googleusercontent.com",
           callback: handleCallbackResponse 
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large"}
        )
    }, [])
    

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function onSubmit(e){
        e.preventDefault()
        const user = {
            email,
            username,
            password
        }
        fetch('/signup',{
            method: "POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(user)
    })
    .then(res => {
        if(res.ok){
            res.json().then(user => 
              { setCurrentUser(user)
                navigate("/welcome")
            })
        } 
        //   else{
        //     res.json().then( errors => setErrors(errors))
        // }
    })
    
}

return (
    <div> 
        <div className="SignUp">
        <h2>Sign Up</h2>
        <Form onSubmit={onSubmit}>
            <Form.Group size="large" id="email">
            <Label>Email</Label>
            <Input
                autoFocus
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </Form.Group>
            <Form.Group size="large" id="username">
            <Label>Username</Label>
            <Input
                name="username"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </Form.Group>
            <Form.Group size="large" controlId="password">
            <Label>Password</Label>
            <Input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </Form.Group>
            <Button size="large" type="submit" disabled={!validateForm()}>
            Sign Up!!
            </Button>
            
        </Form>
        <Button onClick={()=>{setLogin(current => !current)}}> Already have an account? Login </Button>
        <div id="signInDiv"></div>
        </div>
    </div>

  );

}

export default Signup