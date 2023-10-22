import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputFrom from "../components/sharedCode/inputForm";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.alerts)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(showLoading());
            const { data } = await axios.post('/api/v1/auth/login',
                { email, password });

            if (data.success) {
                dispatch(hideLoading());
                localStorage.setItem('token', data.token)

                toast.success('Login Successfully')
                navigate('/dashboard')
            }

            //console.log(email, password);
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Invalid Login Details Please Try Again!")
            console.log(error);

        }
    };
    return (
        <>
            {loading ?
                (<Spinner />) : (
                    <div className="formContainer content d-flex justify-content-center align-items-center">
                        <form className="card p-2 " onSubmit={handleSubmit}>
                            <div className="text-center">
                                <img src="/assets/images/logo.png" alt="logo" height={100} width={100} />
                            </div>
                            <InputFrom
                                htmlFor="email"
                                labelText={"Email"}
                                type={"email"}
                                value={email}
                                handleChange={(e) => setEmail(e.target.value)}
                                name="email"
                            />
                            <InputFrom
                                htmlFor="password"
                                labelText={"Password"}
                                type={"password"}
                                value={password}
                                handleChange={(e) => setPassword(e.target.value)}
                                name="password"
                            />


                            <div className="d-flex justify-content-between">
                                <p>Not a user <Link to="/register"> Register here </Link></p>{" "}
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>

                        </form>
                    </div>
                )
            }
        </>
    )

}

export default Login
