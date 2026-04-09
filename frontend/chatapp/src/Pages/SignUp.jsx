import React, { useState } from 'react'
import useAuthStore from '../Store/useAuthStore'
import BorderAnimated from '../Components/BorderAnimated'
import { MessageCircleIcon, User, Mail, Lock, Loader2 } from 'lucide-react'
import { Link } from 'react-router'

const SignUp = () => {

    const { isSigningUp, signup } = useAuthStore()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData)
    }

    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-slate-950'>

            <div className='relative w-full max-w-6xl md:h-[800px] h-auto'>
                <BorderAnimated>
                    <div className='w-full flex flex-col md:flex-row bg-slate-900 z-10'>

                        {/* LEFT FORM */}
                        <div className='md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30'>
                            <div className='w-full max-w-md'>

                                {/* HEADING */}
                                <div className='text-center mb-8'>
                                    <MessageCircleIcon className='w-12 h-12 mx-auto text-slate-400 mb-4 hover:text-cyan-500' />
                                    <h2 className='text-2xl font-bold text-slate-200 mb-2'>Create Account</h2>
                                    <p className='text-slate-400'>Sign up for a new account</p>
                                </div>

                                {/* FORM */}
                                <form onSubmit={handleSubmit} className='space-y-6'>

                                    {/* NAME */}
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className='w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800 text-slate-200 outline-none focus:ring-2 focus:ring-cyan-500'
                                        />
                                    </div>

                                    {/* EMAIL */}
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className='w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800 text-slate-200 outline-none focus:ring-2 focus:ring-cyan-500'
                                        />
                                    </div>

                                    {/* PASSWORD */}
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className='w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800 text-slate-200 outline-none focus:ring-2 focus:ring-cyan-500'
                                        />
                                    </div>

                                    {/* BUTTON */}
                                    <button
                                        type="submit"
                                        disabled={isSigningUp}
                                        className='w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition text-white font-semibold flex items-center justify-center gap-2'
                                    >
                                        {isSigningUp ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Creating...
                                            </>
                                        ) : (
                                            "Sign Up"
                                        )}
                                    </button>

                                    {/* LOGIN LINK */}
                                    <p className='text-center text-cyan-600 text-sm px-4 py-2 bg-slate-800 rounded-md text-center'>
                                        Already have an account?{" "}
                                        <Link to="/login" className='text-cyan-400 cursor-pointer'>
                                            Login
                                        </Link>
                                    </p>

                                </form>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className='md:w-1/2 hidden md:flex flex-col items-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent'>

                            {/* IMAGE */}
                            <div>
                                <img
                                    className='w-full h-auto object-contain'
                                    src="/signup.png"
                                    alt="signup"
                                />
                            </div>

                            {/* LINKS */}
                            <div className='mt-6 text-center'>

                                <h3 className='text-xl font-medium text-cyan-400 italic'>Start Your Journey Today</h3>

                                <div className='mt-4 flex justify-center gap-4'>
                                    <span className='px-4 py-2 text-center bg-slate-800 rounded-2xl text-cyan-400 cursor-pointer hover:text-white hover:bg-slate-700'>Free</span>
                                    <span className='px-4 py-2 text-center bg-slate-800 rounded-2xl text-cyan-400 cursor-pointer hover:text-white hover:bg-slate-700'>Easy Setup</span>
                                    <span className='px-4 py-2 text-center bg-slate-800 rounded-2xl text-cyan-400 cursor-pointer hover:text-white hover:bg-slate-700'>Privacy</span>

                                </div>

                            </div>
                        </div>

                    </div>
                </BorderAnimated>
            </div>

        </div>
    )
}

export default SignUp