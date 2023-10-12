import React, { useState }        from "react";
import Card         from 'react-bootstrap/Card';
import Form         from 'react-bootstrap/Form';
import { Alert, Button }   from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../context/UserAuthContext";

const Login = () => {
    const [ email , setEmail ]          = useState("");
    const [ password , setPassword ]    = useState("");
    const [ error , setError ]          = useState("")
    const { signIn }                    = useUserAuth();
    // const navigate                      = useNavigate();
    const { user } = useUserAuth();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")
        try {
            await signIn(email , password );
            // navigate("/selectuser")
            console.log("successful login");
            console.log(user);
            
            
        } catch (err : any) {
            setError(err.message)
        }
    }
    
return (
    <div className="tw-absolute tw-top-1/2 tw-right-1/2 tw-transform tw-translate-x-1/2 tw-translate-y-1/2 tw-shadow-md">
        <Card  style={ window.innerWidth<560 ? { width: "20rem"} : {width: "25rem"}}>
            <Card.Body>
                <Card.Title>
                    <div className="tw-text-lg tw-font-semibold tw-flex justify-content-center tw-mb-6">Login</div>
                </Card.Title>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="tw-px-4" controlId="exampleForm.ControlInput1">  
                        <Form.Label className="tw-text-sm">Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="name@example.com" 
                            onChange={(e) => setEmail(e.target.value)}/>
                     </Form.Group>
                     <Form.Group className="mb-3 tw-px-4 tw-mt-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className="tw-text-sm">Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="password" 
                            onChange={(e) => setPassword(e.target.value)}/>
                     </Form.Group>
                     <div className="tw-grid tw-gap-6"><Button variant="primary" type="submit">Login</Button></div>
                     <span className="tw-flex tw-mt-1 tw-justify-center tw-align-items-center">Don't have an account?
                        {/* <Link style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }} className="tw-align-items-center tw-ml-1" to="/register">SignUp</Link> */}
                    </span>
                </Form>
            </Card.Body> 
        </Card>     
    </div>
)
}

export default Login;