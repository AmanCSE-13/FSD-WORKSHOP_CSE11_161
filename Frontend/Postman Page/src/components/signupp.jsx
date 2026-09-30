import { useState } from "react";
import axios from "axios"

const url= "http://localhost:3000";

const SignUp = ({ onSucess }) => {
    const [formData, setformData] = useState ({
        id:"",
        name:"",
        email:"",
        password:"",

    });
const [error, setError] = useState("");

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,

    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try{
        const response = await axios.post(`${url}creat`,formData);
        onSucess(response.data);
        setFormData({
            id:"",
            name:'',
            email:"",
            password:"",
        });
    } catch(error){
        console.error(error);
        setError(error.response?.data?.message || "Signup failed. Please try again.");
    }
}