import React, { useState }        from "react";
import Card         from 'react-bootstrap/Card';
import Form         from 'react-bootstrap/Form';
import { Alert, Button }   from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../context/UserAuthContext";

const Login = () => {
    const [ email , setEmail ]          = useState("");
    const [ password , setPassword ]    = useState("");
    const [ error , setError ]          = useState("")
    const { signIn }                    = useUserAuth();
    const navigate                      = useNavigate();
    const { user } = useUserAuth();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")
        try {
            await signIn(email , password );
            navigate("/")
            console.log("successful login");
            console.log(user);
            
            
        } catch (err : any) {
            setError(err.message)
        }
    }
    
return (
    <div className="absolute top-1/4 right-1/2 transform translate-x-1/2 translate-y-1/2 shadow-md p-3 bg-[#303030]">
        <Card  style={ window.innerWidth<560 ? { width: "20rem"} : {width: "25rem"}}>
            <Card.Body>
                <Card.Title>
                    <div className="text-white text-xl font-semibold flex justify-center mb-6">Login</div>
                </Card.Title>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="tw-px-4" controlId="exampleForm.ControlInput1">  
                        <Form.Label className="text-sm text-white">Email address :  </Form.Label>
                        <Form.Control 
                            className="text-white text-sm bg-[#555555] p-2 ml-2 rounded-md w-[62%] h-[60%] whitespace-normal"
                            type="email" 
                            placeholder="name@example.com" 
                            onChange={(e) => setEmail(e.target.value)}/>
                     </Form.Group>
                     <Form.Group className="mb-3 px-4 mt-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className="text-sm text-white">Password : </Form.Label>
                        <Form.Control 
                            className="text-white text-sm bg-[#555555] p-2 ml-2 rounded-md w-[70%] h-[60%] whitespace-normal"
                            type="password" 
                            placeholder="password" 
                            onChange={(e) => setPassword(e.target.value)}/>
                     </Form.Group>
                     <div className="grid gap-6 text-white bg-gray-900 mx-[20%] rounded-md"><Button variant="primary" type="submit">Login</Button></div>
                     <span className="text-white flex mt-1 justify-center align-items-center cursor-pointer"><Link to="/register">Don't have an account?</Link>
                        {/* <Link style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }} className="tw-align-items-center tw-ml-1" to="/register">SignUp</Link> */}
                    </span>
                </Form>
            </Card.Body> 
        </Card>     
    </div>
)
}

export default Login;