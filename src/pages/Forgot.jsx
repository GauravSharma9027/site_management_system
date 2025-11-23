import React, { useState } from 'react'
import InputField from '../components/ui/InputField'
import Button from '../components/button/Button'
import leftImage from '../assets/ForgotPasswordImg.png'
import { Link } from 'react-router-dom'
import Ripples from 'react-ripples';
import { RiLoader4Line } from 'react-icons/ri'
import { toast } from 'react-toastify'
const Forgot = () => {
    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState("");
    const otpSendHandler = (e) => {
        e.preventDefault();
        if (!formData.adminId) {
            toast.warn("Please enter your Admin ID!");
            return;
        }
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
            toast.success("OTP sent to your registered email!");
        }, 2000);
    }

    const formDataChangeHandler = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (!formData.adminId || !formData.forgotOtp) {
            toast.warn("Please fill all the fields!");
            return;
        }
        setTimeout(() => {
            setLoader(false);
            toast.success("Password Reset Successful!");
        }, 2000);
    }
    return (
        <div className='w-screen min-h-screen lg:py-0 flex justify-center items-center'>
            <div className='lg:h-[70vh] w-[85vw] lg:w-[60vw] p-6 lg:p-8 rounded-xl ring-3 ring-[#4acfff] bg-gradient-to-tr from-[#015f82] to-[#00AFEF] shadow-[0px_0px_20px_8px_#016a90]'>
                <div className='px-5 h-full w-full flex justify-center items-center rounded-xl bg-white'>
                    {/* left image */}
                    <div className='h-full hidden sm:block overflow-hidden'>
                        <img src={leftImage} alt="" className='object-cover h-full w-65 md:w-80 lg:w-65 xl:w-80' />
                    </div>
                    {/* right form */}
                    <div className='space-y-4 flex flex-col justify-center items-center p-10'>
                        <h1 className='mb-6 text-2xl xs:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold font-[Comic_Sans_MS] text-[#00AFEF] text-nowrap'>Forgot <br />Your Password ?</h1>
                        <InputField
                            label="Admin ID"
                            labelClass='text-black text-sm'
                            inputClass='pt-0 m-0 focus:border-gray-900 placeholder:text-gray-400 text-gray-800 text-xs md:text-sm lg:text-xs'
                            placeholder='Admin Id'
                            name="adminId"
                            onChange={formDataChangeHandler}
                        />
                        <div className='flex justify-between items-center w-full'>
                            <InputField
                                label="OTP"
                                labelClass='text-black text-sm'
                                inputClass='p-0 m-0 focus:border-gray-900 w-full placeholder:text-gray-400 text-gray-800 text-xs md:text-sm lg:text-xs'
                                placeholder='OTP Here '
                                name="forgotOtp"
                                type='number'
                                max="6"
                                min="6"
                                onChange={formDataChangeHandler}
                            />
                            {
                                loader ?
                                    <Button text={<RiLoader4Line size={25} className='transition-all animate-spin font-bold' />} className="h-8 w-24 mr-2 rounded-[50rem] flex justify-center items-center text-xs bg-gradient-to-b from-green-700 via-green-400 to-green-700" /> :
                                    <Button text="Get OTP" onClick={otpSendHandler} className="h-8 w-24 mr-2 rounded-[50rem] flex justify-center items-center text-xs text-[#fff] bg-gradient-to-b from-green-700 via-green-400 to-green-700" />
                            }
                        </div>
                        <div className='px-2 w-full mt-6 sm:mt-2'>
                            <Ripples color="rgba(0,0,0,0.3)" className="w-full hover:scale-x-105 duration-500 transition transform rounded-[50rem]">
                                <Button text="Reset Password" className="py-1 rounded-[50rem] flex justify-center items-center text-lg text-[#fff] bg-gradient-to-b from-[#0693c7] via-[#01ddff] to-[#0693c7]" />
                            </Ripples>
                        </div>
                        <Link to="/login" className='text-black text-xs font-bold underline text-center'>Back to signIn</Link>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Forgot
