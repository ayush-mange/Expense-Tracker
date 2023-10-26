import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Form         from 'react-bootstrap/Form';
import { Alert, Button }   from "react-bootstrap";
import { Link , useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../context/UserAuthContext";
import { log } from "console";
// import { Link } from "react-router-dom";


const SignUp = () => {
    const [ email , setEmail ]          = useState("");
    const [ password , setPassword ]    = useState("");
    const [ error , setError ]          = useState("")
    const { signUp }                    = useUserAuth();
    const navigate                      = useNavigate();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")
        try {
            await signUp(email , password );
            navigate("/")
            console.log("SignUp Successful");
            
        } catch (err : any) {
            setError(err.message)
        }
    }

    return (
    <>

    <div className="absolute top-1/4 right-1/2 transform translate-x-1/2 translate-y-1/2 shadow-md p-3 bg-[#303030]">
        <Card  style={ window.innerWidth<560 ? { width: "20rem"} : {width: "25rem"}}>
            <Card.Body>
                <Card.Title>
                    <div className="text-xl font-semibold flex justify-center text-white mb-5">Sign Up</div>
                </Card.Title>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="px-4" controlId="exampleForm.ControlInput1">
                        <Form.Label className="text-sm text-white">Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="name@example.com" 
                            onChange={(e) => setEmail(e.target.value)}/>
                     </Form.Group>
                     <Form.Group className="mb-3 px-4 tw-mt-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className="text-sm text-white">Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="password" 
                            onChange={(e)=>setPassword(e.target.value)}/>
                     </Form.Group>
                     <Form.Group className="mb-3 px-4 tw-mt-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className="text-sm text-white">Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="password" />
                     </Form.Group>
                     <div className="grid gap-6 text-white"><Button variant="primary" type="submit">Sign Up</Button></div>
                     <span className="flex mt-1 justify-center align-items-center text-white cursor-pointer"><Link to="/login">Already have an account?</Link>
                        {/* <Link style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }} className="tw-align-items-center tw-ml-1" to="/login">Login</Link> */}
                    </span>
                </Form>

            </Card.Body> 
        </Card>     
    </div>
    </>

)
}

export default SignUp;