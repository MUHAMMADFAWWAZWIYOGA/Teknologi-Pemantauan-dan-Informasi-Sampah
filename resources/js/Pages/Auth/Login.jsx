import { useEffect, useState } from "react";
// Impor 'router' dari Inertia.js untuk navigasi dan form handling
import { router } from '@inertiajs/react'; 
// Catatan: Dalam implementasi Inertia yang ideal, Anda akan menggunakan useForm hook
// daripada useState/setErrors manual untuk form submission, tapi kita modifikasi yang ada.

export default function Login() {
    const [data, setData] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({}); // State ini akan diperbarui jika Laravel mengirimkan error validasi
    const [showPassword, setShowPassword] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showForm, setShowForm] = useState(false);
    const [mouseDetected, setMouseDetected] = useState(false);
    const [formInteracted, setFormInteracted] = useState(false);

    useEffect(() => {
        // Untuk mobile/touch device, langsung tampilkan form
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (isMobile || hasTouchScreen) {
            setTimeout(() => {
                setShowForm(true);
            }, 500);
            return;
        }

        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
            
            // Deteksi pergerakan mouse pertama kali
            if (!mouseDetected && !showForm) {
                setMouseDetected(true);
                // Delay sedikit untuk animasi lebih smooth
                setTimeout(() => {
                    setShowForm(true);
                }, 150);
            }
        };

        const handleMouseLeave = () => {
            // Jika form belum diinteraksi, kembali ke fullscreen
            if (!formInteracted && showForm) {
                setShowForm(false);
                setMouseDetected(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [mouseDetected, showForm, formInteracted]);

    // Deteksi interaksi dengan form
    useEffect(() => {
        if (showForm) {
            const handleFormInteraction = () => {
                setFormInteracted(true);
            };

            const formElement = document.querySelector('[data-form-container]');
            if (formElement) {
                formElement.addEventListener('focus', handleFormInteraction, true);
                formElement.addEventListener('input', handleFormInteraction, true);
                formElement.addEventListener('click', handleFormInteraction, true);
                
                return () => {
                    formElement.removeEventListener('focus', handleFormInteraction, true);
                    formElement.removeEventListener('input', handleFormInteraction, true);
                    formElement.removeEventListener('click', handleFormInteraction, true);
                };
            }
        }
    }, [showForm]);

    // Fungsi submit yang dimodifikasi untuk Inertia:
    // Menghapus setTimeout dan menggunakan router.post()
    const submit = (e) => {
        e.preventDefault();
        
        // Validasi Klien Awal (untuk mencegah pengiriman jika field kosong)
        setErrors({}); // Reset errors sebelum mencoba submit
        if (!data.email || !data.password) {
            setErrors({ 
                email: !data.email ? "Email is required" : "",
                password: !data.password ? "Password is required" : "",
            });
            return;
        }

        // Kirim data ke endpoint login Laravel yang didefinisikan di routes/web.php
        // Inertia akan menangani: 
        // 1. Set processing = true (via onStart)
        // 2. Redirect ke dashboard jika sukses (Laravel mengembalikan redirect response)
        // 3. Set error state jika gagal (Laravel mengembalikan error response)
        router.post(route('login'), data, {
            onStart: () => {
                setProcessing(true);
                setErrors({}); // Bersihkan error lama
            },
            onFinish: () => {
                setProcessing(false);
            },
            onError: (be_errors) => {
                // Inertia secara otomatis akan menyuntikkan errors ke props
                // Tapi kita tetap set state lokal untuk kesesuaian UI Anda.
                setErrors(be_errors); 
            },
        });
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 overflow-hidden relative">
            <div className={`${showForm ? 'lg:w-1/2' : 'lg:w-full'} hidden lg:flex relative overflow-hidden items-center justify-center transition-all duration-[900ms] ease-out will-change-[width] z-10`} style={{ transition: 'width 900ms cubic-bezier(0.4, 0, 0.2, 1)' }}>
                <div className="absolute inset-0 bg-gradient-animation"></div>
                
                <div className="absolute inset-0 opacity-30">
                    <div className="wave wave1"></div>
                    <div className="wave wave2"></div>
                    <div className="wave wave3"></div>
                </div>

                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => {
                        const positions = [
                            { left: 15, top: 20 }, { left: 85, top: 15 }, { left: 45, top: 10 },
                            { left: 70, top: 25 }, { left: 25, top: 35 }, { left: 60, top: 45 },
                            { left: 40, top: 55 }, { left: 80, top: 60 }, { left: 20, top: 65 },
                            { left: 50, top: 70 }, { left: 90, top: 75 }, { left: 30, top: 80 },
                            { left: 65, top: 85 }, { left: 10, top: 50 }, { left: 75, top: 40 },
                            { left: 35, top: 90 }, { left: 55, top: 30 }, { left: 22, top: 48 },
                            { left: 78, top: 52 }, { left: 42, top: 72 }
                        ];
                        return (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                                style={{
                                    left: `${positions[i].left}%`,
                                    top: `${positions[i].top}%`,
                                    boxShadow: '0 0 4px rgba(255,255,255,0.8)',
                                    animation: `glow ${2 + (i % 3)}s ease-in-out infinite ${(i % 5) * 0.5}s`
                                }}
                            ></div>
                        );
                    })}
                </div>

                <div className="absolute inset-0">
                    <div 
                        className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"
                        style={{
                            animation: 'morph 8s ease-in-out infinite, float 6s ease-in-out infinite'
                        }}
                    ></div>

                    <div className="orbit-container">
                        <div className="orbit orbit1">
                            <div className="orbit-circle"></div>
                        </div>
                        <div className="orbit orbit2">
                            <div className="orbit-circle"></div>
                        </div>
                        <div className="orbit orbit3">
                            <div className="orbit-circle"></div>
                        </div>
                    </div>

                    <div 
                        className="absolute top-20 left-20 w-20 h-20 border-4 border-blue-300 rounded-full opacity-50"
                        style={{
                            animation: 'float 5s ease-in-out infinite, glow 3s ease-in-out infinite'
                        }}
                    ></div>
                    
                    <div 
                        className="absolute top-40 left-1/3 w-16 h-16 bg-gradient-to-br from-blue-300 to-cyan-400 opacity-40"
                        style={{
                            animation: 'float 7s ease-in-out infinite 1s, rotate3d 10s linear infinite',
                            borderRadius: '30%'
                        }}
                    ></div>

                    <div 
                        className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-30"
                        style={{
                            animation: 'float 6s ease-in-out infinite 2s, pulse 4s ease-in-out infinite'
                        }}
                    ></div>

                    <div 
                        className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 opacity-25"
                        style={{
                            animation: 'float 8s ease-in-out infinite 1.5s, morph 6s ease-in-out infinite',
                            borderRadius: '40%'
                        }}
                    ></div>

                    <div
                        className="absolute top-1/4 left-1/4 opacity-40"
                        style={{
                            width: 0,
                            height: 0,
                            borderLeft: "30px solid transparent",
                            borderRight: "0px solid transparent",
                            borderTop: "18px solid transparent",
                            borderBottom: "18px solid rgba(147, 197, 253, 0.6)",
                            animation: 'float 9s ease-in-out infinite, rotate 15s linear infinite',
                            filter: 'blur(1px)'
                        }}
                    ></div>

                    <div
                        className="absolute bottom-1/4 right-1/3 opacity-35"
                        style={{
                            width: 0,
                            height: 0,
                            borderLeft: "35px solid transparent",
                            borderRight: "0px solid transparent",
                            borderTop: "20px solid transparent",
                            borderBottom: "20px solid rgba(167, 139, 250, 0.5)",
                            animation: 'float 7s ease-in-out infinite 2s, rotate 12s linear infinite reverse',
                            filter: 'blur(1px)'
                        }}
                    ></div>

                    <div 
                        className="absolute top-1/3 left-1/2 w-8 h-8 bg-gradient-to-br from-blue-300 to-purple-400 opacity-40"
                        style={{
                            animation: 'float 6s ease-in-out infinite 0.5s, spin 8s linear infinite'
                        }}
                    ></div>

                    <div 
                        className="absolute bottom-1/2 right-1/3 w-10 h-10 bg-gradient-to-br from-cyan-300 to-blue-400 opacity-35"
                        style={{
                            animation: 'float 7s ease-in-out infinite 1.5s, spin 6s linear infinite reverse',
                            borderRadius: '20%'
                        }}
                    ></div>

                    {[
                        { left: 25, top: 30 }, { left: 60, top: 25 }, { left: 75, top: 45 },
                        { left: 40, top: 55 }, { left: 30, top: 70 }, { left: 65, top: 65 },
                        { left: 50, top: 40 }, { left: 80, top: 75 }
                    ].map((pos, i) => (
                        <div
                            key={`dot-${i}`}
                            className="absolute w-3 h-3 bg-white rounded-full"
                            style={{
                                left: `${pos.left}%`,
                                top: `${pos.top}%`,
                                opacity: 0.6,
                                animation: `glow ${2 + (i % 3)}s ease-in-out infinite ${(i % 4) * 0.5}s`,
                                boxShadow: '0 0 10px rgba(255,255,255,0.8)'
                            }}
                        ></div>
                    ))}

                    <div 
                        className="absolute top-1/2 left-1/2 w-1 h-96 bg-gradient-to-b from-transparent via-white to-transparent opacity-10"
                        style={{
                            transform: 'translate(-50%, -50%) rotate(45deg)',
                            animation: 'rotate 20s linear infinite'
                        }}
                    ></div>
                    <div 
                        className="absolute top-1/2 left-1/2 w-1 h-96 bg-gradient-to-b from-transparent via-white to-transparent opacity-10"
                        style={{
                            transform: 'translate(-50%, -50%) rotate(-45deg)',
                            animation: 'rotate 20s linear infinite reverse'
                        }}
                    ></div>
                </div>

                <div 
                    className="relative z-10 text-center px-12"
                    style={{
                        animation: 'fade-in 1s ease-out, float 6s ease-in-out infinite 3s'
                    }}
                >
                    <h2 className="text-6xl font-bold text-white mb-6 drop-shadow-lg">
                        Hello, Tapis's Admin!
                    </h2>
                    <p className="text-2xl text-blue-50 drop-shadow-md mb-8">
                        Pantau Keadaan Secara Real-Time
                    </p>
                    {!showForm && (
                        <div className="mt-8 animate-pulse">
                            <p className="text-xl text-white/90 drop-shadow-md flex items-center justify-center gap-3">
                                <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                </svg>
                                Gerakkan mouse untuk login
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Bagian Form Login */}
            <div 
                data-form-container
                className={`w-full ${showForm ? 'lg:w-1/2 lg:opacity-100 lg:visible lg:pointer-events-auto lg:shadow-2xl' : 'lg:w-0 lg:opacity-0 lg:invisible lg:pointer-events-none'} bg-gradient-to-br from-white/98 via-blue-50/60 to-purple-50/50 backdrop-blur-lg flex items-center justify-center p-6 relative overflow-hidden z-20`}
                style={!showForm ? { 
                    transform: 'translateZ(0) translateX(100%)',
                    opacity: 0
                } : { 
                    transform: 'translateZ(0) translateX(0)',
                    opacity: 1
                }}
            >
                {/* Gradient overlay untuk transisi lebih smooth */}
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-200/30 via-purple-200/20 to-transparent transition-opacity duration-700 ease-out pointer-events-none z-0 ${showForm ? 'opacity-100' : 'opacity-0'}`}></div>
                <div className={`absolute inset-0 pointer-events-none ${showForm ? 'opacity-100' : 'lg:opacity-0 opacity-100'} transition-opacity duration-500`}>
                    <div
                        className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"
                        style={{
                            animation: 'morph 10s ease-in-out infinite, float 8s ease-in-out infinite'
                        }}
                    ></div>

                    <div
                        className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-400 rounded-full opacity-20 blur-3xl"
                        style={{
                            animation: 'morph 12s ease-in-out infinite 2s, float 9s ease-in-out infinite 1s'
                        }}
                    ></div>

                    <div 
                        className="absolute top-12 right-24 w-20 h-20 border-4 border-blue-300 rounded-full opacity-40"
                        style={{
                            animation: 'float 5s ease-in-out infinite, glow 3s ease-in-out infinite'
                        }}
                    ></div>

                    <div 
                        className="absolute top-1/3 right-16 w-16 h-16 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-40"
                        style={{
                            animation: 'float 6s ease-in-out infinite 1s, pulse 4s ease-in-out infinite'
                        }}
                    ></div>

                    <div 
                        className="absolute bottom-1/3 left-16 w-24 h-24 border-4 border-blue-300 opacity-30"
                        style={{
                            animation: 'float 7s ease-in-out infinite 2s, spin 10s linear infinite',
                            borderRadius: '30%'
                        }}
                    ></div>

                    <div 
                        className="absolute top-1/2 right-40 w-12 h-12 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full opacity-40"
                        style={{
                            animation: 'float 4.5s ease-in-out infinite 0.5s, pulse 3s ease-in-out infinite'
                        }}
                    ></div>

                    {[
                        { left: 15, top: 20 }, { left: 85, top: 25 }, { left: 30, top: 35 },
                        { left: 70, top: 40 }, { left: 45, top: 50 }, { left: 60, top: 60 },
                        { left: 25, top: 70 }, { left: 80, top: 75 }, { left: 40, top: 80 },
                        { left: 55, top: 30 }, { left: 75, top: 55 }, { left: 20, top: 45 }
                    ].map((pos, i) => (
                        <div
                            key={`right-dot-${i}`}
                            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-40"
                            style={{
                                left: `${pos.left}%`,
                                top: `${pos.top}%`,
                                animation: `glow ${2 + (i % 3)}s ease-in-out infinite ${(i % 4) * 0.5}s`
                            }}
                        ></div>
                    ))}
                </div>

                <div className={`w-full max-w-md z-30 relative ${showForm ? 'opacity-100 lg:translate-x-0' : 'lg:opacity-0 lg:translate-x-12 opacity-100'} transition-all duration-[800ms] ease-out animate-slide-up`}>
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold text-gray-900 mb-2 animate-fade-in">
                            Welcome Back!
                        </h1>
                        <p className="text-gray-700 text-base font-medium animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            Login to your account
                        </p>
                        <div className="h-0.5 bg-gray-400 mt-6 animate-expand"></div>
                    </div>

                    <div className="space-y-6 mt-8">
                        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <div className="flex items-center gap-3 mb-2">
                                <svg
                                    className="w-5 h-5 text-gray-600 transition-transform duration-300 hover:scale-110"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                >
                                    <circle cx="12" cy="8" r="4"></circle>
                                    <path d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6"></path>
                                </svg>
                                <span className="text-gray-800 font-semibold text-sm">
                                    Email
                                </span>
                            </div>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) => setData({...data, email: e.target.value})}
                                placeholder="Enter your email"
                                className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 text-sm transform hover:scale-[1.01] ${
                                    errors.email ? "border-red-500 shake" : "border-gray-200"
                                }`}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-xs mt-1 block animate-fade-in">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                            <div className="flex items-center gap-3 mb-2">
                                <svg
                                    className="w-5 h-5 text-gray-600 transition-transform duration-300 hover:scale-110"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                >
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                <span className="text-gray-800 font-semibold text-sm">
                                    Password
                                </span>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) => setData({...data, password: e.target.value})}
                                    placeholder="Enter your password"
                                    className={`w-full px-4 py-2.5 pr-12 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 text-sm transform hover:scale-[1.01] ${
                                        errors.password ? "border-red-500 shake" : "border-gray-200"
                                    }`}
                                    style={{ lineHeight: '1.5' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110 flex items-center justify-center"
                                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="text-red-500 text-xs mt-1 block animate-fade-in">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        <div className="text-right animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            <a
                                href={route('password.request')} // Menggunakan helper route() Laravel
                                className="text-blue-400 hover:text-blue-500 text-sm font-medium transition-all duration-300 hover:underline"
                            >
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="button"
                            onClick={submit}
                            disabled={processing}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-8 animate-fade-in"
                            style={{ animationDelay: '0.5s' }}
                        >
                            {processing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                /* Smooth transitions and GPU acceleration */
                * {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }

                /* Animated Gradient Background */
                @keyframes gradient-shift {
                    0%, 100% {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                    }
                    33% {
                        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%);
                    }
                    66% {
                        background: linear-gradient(135deg, #fa709a 0%, #fee140 50%, #30cfd0 100%);
                    }
                }

                .bg-gradient-animation {
                    animation: gradient-shift 15s ease infinite;
                    transform: translateZ(0);
                    will-change: background;
                }

                /* Waves Animation */
                .wave {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 200%;
                    height: 100%;
                    background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent);
                    transform: translateX(-50%);
                }

                .wave1 {
                    animation: wave-move 12s linear infinite;
                }

                .wave2 {
                    animation: wave-move 15s linear infinite;
                    animation-delay: -5s;
                }

                .wave3 {
                    animation: wave-move 18s linear infinite;
                    animation-delay: -10s;
                }

                @keyframes wave-move {
                    0% {
                        transform: translateX(-50%) skewY(0deg);
                    }
                    50% {
                        transform: translateX(0%) skewY(2deg);
                    }
                    100% {
                        transform: translateX(-50%) skewY(0deg);
                    }
                }

                /* Orbiting Circles */
                .orbit-container {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                .orbit {
                    position: absolute;
                    border: 2px solid rgba(255,255,255,0.2);
                    border-radius: 50%;
                }

                .orbit1 {
                    width: 150px;
                    height: 150px;
                    animation: orbit-rotate 15s linear infinite;
                }

                .orbit2 {
                    width: 250px;
                    height: 250px;
                    animation: orbit-rotate 20s linear infinite reverse;
                }

                .orbit3 {
                    width: 350px;
                    height: 350px;
                    animation: orbit-rotate 25s linear infinite;
                }

                .orbit-circle {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background: radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0.3));
                    border-radius: 50%;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    box-shadow: 0 0 15px rgba(255,255,255,0.8);
                }

                @keyframes orbit-rotate {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* Morph Animation */
                @keyframes morph {
                    0%, 100% {
                        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
                    }
                    50% {
                        border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
                    }
                }

                /* Float Animation */
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                    }
                    33% {
                        transform: translateY(-20px) translateX(10px);
                    }
                    66% {
                        transform: translateY(-10px) translateX(-10px);
                    }
                }

                /* 3D Rotation */
                @keyframes rotate3d {
                    0% {
                        transform: rotate3d(1, 1, 1, 0deg);
                    }
                    100% {
                        transform: rotate3d(1, 1, 1, 360deg);
                    }
                }

                /* Spin Animation */
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* Rotate Animation */
                @keyframes rotate {
                    0%, 100% {
                        transform: rotate(0deg);
                    }
                    50% {
                        transform: rotate(180deg);
                    }
                }

                /* Glow Animation */
                @keyframes glow {
                    0%, 100% {
                        box-shadow: 0 0 5px rgba(255,255,255,0.3);
                        opacity: 0.4;
                    }
                    50% {
                        box-shadow: 0 0 20px rgba(255,255,255,0.8);
                        opacity: 0.8;
                    }
                }

                /* Fade In Animation */
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Slide Up Animation */
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Expand Animation */
                @keyframes expand {
                    from {
                        width: 0;
                    }
                    to {
                        width: 100%;
                    }
                }

                /* Shake Animation */
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }

                /* Pulse Animation */
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.4;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 0.7;
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }

                .animate-slide-up {
                    animation: slide-up 0.8s ease-out;
                }

                .animate-expand {
                    animation: expand 0.8s ease-out;
                }

                .shake {
                    animation: shake 0.3s ease-in-out;
                }

                /* Smooth slide transition dari kanan */
                [data-form-container] {
                    transition: width 900ms cubic-bezier(0.4, 0, 0.2, 1),
                                transform 900ms cubic-bezier(0.4, 0, 0.2, 1),
                                opacity 700ms ease-out,
                                background 900ms cubic-bezier(0.4, 0, 0.2, 1);
                    background-blend-mode: overlay;
                }

                /* Prevent white flash dengan background gradient */
                [data-form-container]::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to right, 
                        rgba(59, 130, 246, 0.1), 
                        rgba(147, 51, 234, 0.08), 
                        rgba(236, 72, 153, 0.05));
                    opacity: 1;
                    pointer-events: none;
                    z-index: -1;
                    transition: opacity 700ms ease-out;
                }

                [data-form-container].lg\\:w-0::before {
                    opacity: 0;
                }

                /* GPU acceleration for better performance */
                @supports (transform: translateZ(0)) {
                    [class*="transition-all"],
                    [data-form-container] {
                        transform: translateZ(0);
                        backface-visibility: hidden;
                        perspective: 1000px;
                        will-change: width, transform, opacity, clip-path;
                    }
                }
            `}</style>
        </div>
    );
}