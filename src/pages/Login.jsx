import React, { useState } from 'react'
import { FaFacebookSquare, FaTwitter, FaUser } from "react-icons/fa";
import { RiInstagramFill, RiLockPasswordFill, RiLoader4Line } from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io";
import logo from '../assets/logo2.png'
import InputField from '../components/ui/InputField';
import Button from '../components/button/Button';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const [formData, setFormData] = useState("");
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const formDataChangeHandler = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const formSubmit = (e) => {
        e.preventDefault();
        setLoader(true);
        if (!formData.adminId || !formData.password) {
            toast.warn("Please fill all the fields!");
            setLoader(false);
            return;
        }
        setTimeout(() => {
            console.log(formData);
            setLoader(false);
            navigate('/');
            toast.success("Login Successful!");
        }, 2000);
    }
    return (
        <div className='flex justify-center items-center w-screen py-8 lg:py-0 min-h-screen'>
            {/* for laptop view */}
            <div className='hidden lg:block h-[70vh] w-[70vw] xl:w-[60vw] relative rounded-xl ring-3 ring-[#792aea] shadow-[0px_0px_20px_8px_#792aea]'>
                {/* left side */}
                <div className='p-5 px-8 flex flex-col justify-between h-full w-full bg-gradient-to-tr from-[#260e4d] to-[#6b22e1] rounded-xl  border-[#792aea]' style={{ clipPath: 'polygon(0 0,65% 0%,25% 100%,0% 100%)' }}>
                    <div>
                        <h1 className='text-white text-4xl font-semibold mt-8 uppercase font-[Comic_Sans_MS]'>Site Management <br /> System</h1>
                        <h4 className='mt-2 text-white font-bold text-sm'>Secure Venders Login</h4>
                    </div>
                    <div className="h-40 w-50 overflow-hidden flex justify-center items-center">
                        <img src={logo} className='h-56 object-cover' alt="" srcset="" />
                    </div>
                    <div className='mb-5'>
                        <div className='flex gap-6'>
                            <RiInstagramFill size={26} className='text-white transition-all hover:scale-120 duration-300' />
                            <IoLogoYoutube size={26} className='text-white transition-all hover:scale-120 duration-300' />
                            <FaTwitter size={26} className='text-white transition-all hover:scale-120 duration-300' />
                            <FaFacebookSquare size={26} className='text-white transition-all hover:scale-120 duration-300' />
                        </div>
                        <p className='mt-2 text-white text-xs'>sopport1234@gmail.com</p>
                    </div>
                </div>
                {/* right side */}
                <div className=' h-full w-full rounded-xl flex justify-end p-10 absolute top-0 right-0' style={{ clipPath: 'polygon(65% 0%,100% 0%,100% 100%,25% 100%)' }}>
                    <form className='w-64 flex flex-col justify-center items-center h-full gap-6 '>
                        <h2 className='text-4xl text-white font-extrabold mb-6 font-[Comic_Sans_MS]'>Login</h2>
                        <div className='mb-4 w-64 space-y-6'>
                            <InputField
                                label="Admin ID"
                                icon={FaUser}
                                value={formData.adminId}
                                name="adminId"
                                onChange={formDataChangeHandler}
                            />
                            <InputField
                                type='password'
                                label="Password"
                                icon={RiLockPasswordFill}
                                name="password"
                                value={formData.password}
                                onChange={formDataChangeHandler}
                            />

                        </div>
                        {
                            loader ?
                                <Button onClick={formSubmit} text={<RiLoader4Line size={30} className='transition-all animate-spin font-bold' />} className="flex justify-center items-center font-bold rounded-[50rem] py-2 bg-gradient-to-b from-[#260e4d] via-[#6b22e1] to-[#260e4d] " /> :
                                <Button onClick={formSubmit} text="Login" className="flex justify-center items-center font-bold rounded-[50rem] py-2 lg:py-4 xl:py-2 bg-gradient-to-b from-[#260e4d] via-[#6b22e1] to-[#260e4d] " />
                        }
                        <div className='px-2 flex justify-end w-full'>
                            <Link to="/forgot-password" className=' text-white text-sm underline'>Forgot Password?</Link>
                        </div>
                    </form>
                </div>
            </div>
            {/* for mobile & tablet view */}
            <div className='lg:hidden w-[80vw] sm:w-[60vw] rounded-xl ring-3 ring-[#792aea] shadow-[0px_0px_20px_8px_#792aea]'>
                <div className='py-5 md:py-7 px-8 h-full w-full flex flex-col items-center bg-gradient-to-tr from-[#260e4d] to-[#6b22e1] rounded-xl  border-[#792aea]'>
                    {/* logo */}
                    <div className='w-full'>
                        <div className='w-full md:px-4 flex items-center justify-start gap-2 sm:gap-4  '>
                            <div className="h-24 w-30 overflow-hidden flex justify-center items-center">
                                <img src={logo} className='h-30 md:h-36 center object-cover' alt="logo" />
                            </div>
                            <h1 className='text-white text-xl md:text-3xl font-bold uppercase font-[Comic_Sans_MS]'>Site <br className='sm:hidden' /> Management <br /> System</h1>
                        </div>
                        {/* <h4 className='text-white font-bold text-sm'>Secure Venders Login</h4> */}
                    </div>
                    {/* form */}
                    <div className='w-full my-3 rounded-xl flex justify-center py-4 sm:p-4'>
                        <form className='px-4 py-6 sm:p-6 md:p-8 rounded-2xl h-full w-full sm:w-80 md:w-full flex flex-col justify-center items-center gap-6 bg-[#08040e]'>
                            <h2 className='text-4xl md:text-5xl text-white font-extrabold font-[Comic_Sans_MS]'>Login</h2>
                            <div className='mb-4 w-full space-y-6'>
                                <InputField
                                    label="Admin ID"
                                    icon={FaUser}
                                    value={formData.adminId}
                                    name="adminId"
                                    onChange={formDataChangeHandler}
                                />
                                <InputField
                                    type='password'
                                    label="Password"
                                    icon={RiLockPasswordFill}
                                    name="password"
                                    value={formData.password}
                                    onChange={formDataChangeHandler}
                                />

                            </div>
                            <div className='w-full px-2'>
                                {
                                    loader ?
                                        <Button onClick={formSubmit} text={<RiLoader4Line size={30} className='transition-all animate-spin font-bold' />} className="flex justify-center items-center font-bold rounded-[50rem] py-2 bg-gradient-to-b from-[#260e4d] via-[#6b22e1] to-[#260e4d] " /> :
                                        <Button onClick={formSubmit} text="Login" className="flex justify-center items-center font-bold rounded-[50rem] py-2 bg-gradient-to-b from-[#260e4d] via-[#6b22e1] to-[#260e4d] " />
                                }
                            </div>
                            <div className='px-2 flex justify-end w-full'>
                                <Link to="/forgot-password" className=' text-white text-sm underline'>Forgot Password?</Link>
                            </div>
                        </form>
                    </div>
                    {/* media links */}
                    <div className='mt-2'>
                        <div className='flex gap-8 md:gap-10 text-white'>
                            <RiInstagramFill size={26} className='md:h-10 md:w-10 transition-all hover:scale-120 duration-300' />
                            <IoLogoYoutube size={26} className='md:h-10 md:w-10 transition-all hover:scale-120 duration-300' />
                            <FaTwitter size={26} className='md:h-10 md:w-10 transition-all hover:scale-120 duration-300' />
                            <FaFacebookSquare size={26} className='md:h-10 md:w-10 transition-all hover:scale-120 duration-300' />
                        </div>
                        <p className='mt-2 text-white text-sm md:text-lg text-center'>support1234@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
