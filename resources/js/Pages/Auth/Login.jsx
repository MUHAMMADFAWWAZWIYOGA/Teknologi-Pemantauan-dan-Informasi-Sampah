import React, { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

// Full animated Card (adapted from user's snippet)
const Card = ({ onAnimationEnd } = {}) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        // trigger the "hover" animation equivalent
        const t = setTimeout(() => setActive(true), 80);
        // call onAnimationEnd after the animation finishes (~1.4s)
        const finish = setTimeout(() => {
            if (typeof onAnimationEnd === 'function') onAnimationEnd();
        }, 1400);

        return () => {
            clearTimeout(t);
            clearTimeout(finish);
        };
    }, [onAnimationEnd]);

    return (
        <>
            <style>{`
                /* Card styles adapted from provided styled-components code */
                .card {
                    width: 300px;
                    height: 200px;
                    background: #243137;
                    position: relative;
                    display: grid;
                    place-content: center;
                    border-radius: 10px;
                    overflow: hidden;
                    transition: all 0.5s ease-in-out;
                }

                #logo-main, #logo-second { height: 100%; }
                #logo-main { fill: #bd9f67; }
                #logo-second { padding-bottom: 10px; fill: none; stroke: #bd9f67; stroke-width: 1px; }

                .border { position: absolute; inset: 0px; border: 2px solid #bd9f67; opacity: 0; transform: rotate(10deg); transition: all 0.5s ease-in-out; }
                .bottom-text { position: absolute; left: 50%; bottom: 13px; transform: translateX(-50%); font-size: 6px; text-transform: uppercase; padding: 0px 5px 0px 8px; color: #bd9f67; background: #243137; opacity: 0; letter-spacing: 7px; transition: all 0.5s ease-in-out; }

                .content { transition: all 0.5s ease-in-out; }
                .content .logo { height: 35px; position: relative; width: 33px; overflow: hidden; transition: all 1s ease-in-out; }
                .content .logo .logo1 { height: 33px; position: absolute; left: 0; }
                .content .logo .logo2 { height: 33px; position: absolute; left: 33px; }
                .content .logo .trail { position: absolute; right: 0; height: 100%; width: 100%; opacity: 0; }
                .content .logo-bottom-text { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); margin-top: 30px; color: #bd9f67; padding-left: 8px; font-size: 11px; opacity: 0; letter-spacing: none; transition: all 0.5s ease-in-out 0.5s; }

                /* Animate when .card.active OR on hover (keeps original interactivity too) */
                .card.active, .card:hover { border-radius: 0; transform: scale(1.05); }
                .card.active .logo, .card:hover .logo { width: 134px; animation: opacity 1s ease-in-out; }
                .card.active .border, .card:hover .border { inset: 15px; opacity: 1; transform: rotate(0); }
                .card.active .bottom-text, .card:hover .bottom-text { letter-spacing: 3px; opacity: 1; transform: translateX(-50%); }
                .card.active .content .logo-bottom-text, .card:hover .content .logo-bottom-text { opacity: 1; letter-spacing: 9.5px; }
                .card.active .trail, .card:hover .trail { animation: trail 1s ease-in-out; }

                @keyframes opacity {
                    0% { border-right: 1px solid transparent; }
                    10% { border-right: 1px solid #bd9f67; }
                    80% { border-right: 1px solid #bd9f67; }
                    100% { border-right: 1px solid transparent; }
                }

                @keyframes trail {
                    0% { background: linear-gradient(90deg, rgba(189, 159, 103, 0) 90%, rgb(189, 159, 103) 100%); opacity: 0; }
                    30% { background: linear-gradient(90deg, rgba(189, 159, 103, 0) 70%, rgb(189, 159, 103) 100%); opacity: 1; }
                    70% { background: linear-gradient(90deg, rgba(189, 159, 103, 0) 70%, rgb(189, 159, 103) 100%); opacity: 1; }
                    95% { background: linear-gradient(90deg, rgba(189, 159, 103, 0) 90%, rgb(189, 159, 103) 100%); opacity: 0; }
                }
            `}</style>

            <div className={`card${active ? ' active' : ''}`} aria-hidden>
                <div className="border" />
                <div className="content">
                    <div className="logo">
                        <div className="logo1">
                            <svg viewBox="0 0 29.667 31.69" xmlns="http://www.w3.org/2000/svg" id="logo-main">
                                <path transform="translate(0 0)" d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z" data-name="Path 6" id="Path_6" />
                                <path transform="translate(-45.91 0)" d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z" data-name="Path 7" id="Path_7" />
                                <path transform="translate(0 -51.963)" d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z" data-name="Path 8" id="Path_8" />
                            </svg>
                        </div>
                        <div className="logo2">
                            <svg viewBox="0 0 101.014 23.535" xmlns="http://www.w3.org/2000/svg" id="logo-second">
                                <g transform="translate(-1029.734 -528.273)">
                                    <path transform="translate(931.023 527.979)" d="M109.133,14.214l3.248-11.706A1.8,1.8,0,0,1,114.114,1.2h2.229a1.789,1.789,0,0,1,1.7,2.358L111.884,21.71a1.8,1.8,0,0,1-1.7,1.216h-3a1.8,1.8,0,0,1-1.7-1.216L99.317,3.554a1.789,1.789,0,0,1,1.7-2.358h2.229a1.8,1.8,0,0,1,1.734,1.312l3.248,11.706a.468.468,0,0,0,.9,0Z" data-name="Path 1" id="Path_1" />
                                    <path transform="translate(888.72 528.773)" d="M173.783,22.535a10.77,10.77,0,0,1-7.831-2.933,10.387,10.387,0,0,1-3.021-7.813v-.562A13.067,13.067,0,0,1,164.2,5.372,9.315,9.315,0,0,1,167.81,1.4,10.176,10.176,0,0,1,173.136,0,9.105,9.105,0,0,1,180.2,2.812q2.576,2.812,2.577,7.973v.583a1.793,1.793,0,0,1-1.8,1.787H169.407a.466.466,0,0,0-.457.564,5.08,5.08,0,0,0,5.217,4.136A6.594,6.594,0,0,0,178.25,16.6a1.817,1.817,0,0,1,2.448.218l.557.62a1.771,1.771,0,0,1-.1,2.488,9.261,9.261,0,0,1-2.4,1.57,11.732,11.732,0,0,1-4.972,1.034ZM173.115,4.68A3.66,3.66,0,0,0,170.3,5.85,6.04,6.04,0,0,0,168.911,9.2h8.125V8.735a4.305,4.305,0,0,0-1.051-3,3.781,3.781,0,0,0-2.87-1.059Z" data-name="Path 2" id="Path_2" />
                                    <path transform="translate(842.947 528.771)" d="M244.851,3.928a1.852,1.852,0,0,1-1.95,1.76c-.1,0-.2,0-.3,0a7.53,7.53,0,0,0-2.234.3,3.275,3.275,0,0,0-2.348,3.1V20.347a1.844,1.844,0,0,1-1.9,1.787h-2.366a1.844,1.844,0,0,1-1.9-1.787V1.751A1.391,1.391,0,0,1,233.294.4h3.043a1.4,1.4,0,0,1,1.428,1.265l.035.533a.282.282,0,0,0,.5.138A5.617,5.617,0,0,1,242.988,0h.031a1.832,1.832,0,0,1,1.864,1.813l-.032,2.114Z" data-name="Path 3" id="Path_3" />
                                    <path transform="translate(814.555 528.773)" d="M287.2,16.127a1.869,1.869,0,0,0-1.061-1.677,12.11,12.11,0,0,0-3.406-1.095q-7.8-1.627-7.8-6.587a5.956,5.956,0,0,1,2.415-4.83A9.781,9.781,0,0,1,283.659,0a10.536,10.536,0,0,1,6.659,1.948,6.36,6.36,0,0,1,2.029,2.586,1.791,1.791,0,0,1-1.661,2.475h-2.291a1.754,1.754,0,0,1-1.624-1.137,2.7,2.7,0,0,0-.606-.922,3.435,3.435,0,0,0-2.526-.814,3.512,3.512,0,0,0-2.284.663,2.088,2.088,0,0,0-.808,1.687,1.786,1.786,0,0,0,.92,1.557,9.485,9.485,0,0,0,3.1,1.024,25.5,25.5,0,0,1,3.678.974q4.627,1.687,4.628,5.844a5.659,5.659,0,0,1-2.567,4.81,11.125,11.125,0,0,1-6.629,1.838,11.627,11.627,0,0,1-4.881-.974,8.173,8.173,0,0,1-3.345-2.671,6.843,6.843,0,0,1-.679-1.174,1.784,1.784,0,0,1,1.653-2.492h1.9a1.786,1.786,0,0,1,1.673,1.133,2.8,2.8,0,0,0,.925,1.237,4.587,4.587,0,0,0,2.87.824,4.251,4.251,0,0,0,2.536-.632,1.965,1.965,0,0,0,.859-1.657Z" data-name="Path 4" id="Path_4" />
                                    <path transform="translate(772.607 528.773)" d="M348.648,22.535a10.77,10.77,0,0,1-7.832-2.933,10.386,10.386,0,0,1-3.021-7.813v-.562a13.067,13.067,0,0,1,1.273-5.854A9.314,9.314,0,0,1,342.676,1.4,10.174,10.174,0,0,1,348,0a9.1,9.1,0,0,1,7.063,2.812q2.576,2.812,2.577,7.973v.583a1.793,1.793,0,0,1-1.8,1.787H344.272a.467.467,0,0,0-.457.564,5.081,5.081,0,0,0,5.217,4.136,6.594,6.594,0,0,0,4.083-1.251,1.817,1.817,0,0,1,2.448.218l.557.62a1.771,1.771,0,0,1-.1,2.488,9.26,9.26,0,0,1-2.4,1.57,11.731,11.731,0,0,1-4.972,1.034ZM347.981,4.68a3.659,3.659,0,0,0-2.819,1.17A6.035,6.035,0,0,0,343.777,9.2H351.9V8.735a4.307,4.307,0,0,0-1.051-3,3.781,3.781,0,0,0-2.87-1.059Z" data-name="Path 5" id="Path_5" />
                                </g>
                            </svg>
                        </div>
                        <span className="trail" />
                    </div>
                    <span className="logo-bottom-text">uiverse.io</span>
                </div>
                <span className="bottom-text">universe of ui</span>
            </div>
        </>
    );
};

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showForm, setShowForm] = useState(false);

    // Reset password on unmount
    useEffect(() => {
        return () => reset('password');
    }, [reset]);

    // Show form after Card animation completes (handled by Card via onAnimationEnd)
    const handleCardFinished = () => setShowForm(true);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

                return (
                    <>
                        <Head title="Log in" />

                        <div className="min-h-screen flex bg-white">
                            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 relative overflow-hidden items-center justify-center">
                                <div className="absolute inset-0">
                                    {/* decorative shapes (kept from original) */}
                                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400 rounded-full opacity-20"></div>
                                    <div className="absolute top-20 left-20 w-20 h-20 border-4 border-blue-300 rounded-full opacity-40"></div>
                                    <div className="absolute top-40 left-1/3 w-12 h-12 bg-blue-400 rounded-full opacity-30"></div>
                                    <div className="absolute top-1/3 right-1/4 w-16 h-16 border-3 border-blue-300 rounded-full opacity-35"></div>
                                    <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-blue-400 rounded-full opacity-20"></div>
                                    <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-blue-300 rounded-full opacity-25"></div>
                                </div>

                                {/* TAPIS card positioned in the left panel (top-left) so it sits on the gradient */}
                                <div className="absolute top-8 left-8">
                                    <Card onAnimationEnd={handleCardFinished} />
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 relative overflow-hidden">
                                <div className="w-full max-w-md z-10">
                                    <div className="text-center mb-8">
                                        <h1 className="text-5xl font-bold text-gray-900 mb-2">Welcome Back !</h1>
                                        <p className="text-gray-700 text-base font-medium">Login to your account</p>
                                        <div className="h-0.5 bg-gray-400 mt-6"></div>
                                    </div>

                                    {status && (
                                        <div className="mb-4 font-medium text-sm text-green-600 bg-green-50 p-3 rounded-lg">{status}</div>
                                    )}

                                    <form onSubmit={submit} className="space-y-6 mt-8" style={{
                                        opacity: showForm ? 1 : 0,
                                        transform: showForm ? 'translateY(0)' : 'translateY(40px)',
                                        transition: 'opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1), transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)'
                                    }}>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                    <circle cx="12" cy="8" r="4"></circle>
                                                    <path d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6"></path>
                                                </svg>
                                                <span className="text-gray-800 font-semibold text-sm">Name</span>
                                            </div>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                autoComplete="username"
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="Enter your email"
                                                className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                                            />
                                            {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                                </svg>
                                                <span className="text-gray-800 font-semibold text-sm">Password</span>
                                            </div>
                                            <input
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                autoComplete="current-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Enter your password"
                                                className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                                            />
                                            {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password}</span>}
                                        </div>

                                        <div className="text-right">
                                            {canResetPassword && (
                                                <Link href={route('password.request')} className="text-blue-400 hover:text-blue-500 text-sm font-medium">Forgot Password?</Link>
                                            )}
                                        </div>

                                        <button type="submit" disabled={processing} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl transition transform hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-8">
                                            {processing ? 'Signing in...' : 'Sign in'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                );
            }

            
