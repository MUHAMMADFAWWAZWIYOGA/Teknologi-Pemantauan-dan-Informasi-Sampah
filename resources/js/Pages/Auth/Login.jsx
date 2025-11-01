import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <>
            <Head title="Log in" />

            <div className="min-h-screen flex bg-white">
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 relative overflow-hidden items-center justify-center">
                    <div className="absolute inset-0">
                        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400 rounded-full opacity-20"></div>

                        <div className="absolute top-20 left-20 w-20 h-20 border-4 border-blue-300 rounded-full opacity-40"></div>
                        <div className="absolute top-40 left-1/3 w-12 h-12 bg-blue-400 rounded-full opacity-30"></div>
                        <div className="absolute top-1/3 right-1/4 w-16 h-16 border-3 border-blue-300 rounded-full opacity-35"></div>
                        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-blue-400 rounded-full opacity-20"></div>
                        <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-blue-300 rounded-full opacity-25"></div>
                        <div className="absolute bottom-40 left-1/2 w-10 h-10 border-3 border-blue-300 rounded-full opacity-40"></div>

                        <div
                            className="absolute top-1/4 left-1/4 opacity-40"
                            style={{
                                width: 0,
                                height: 0,
                                borderLeft: "25px solid transparent",
                                borderRight: "0px solid transparent",
                                borderTop: "15px solid transparent",
                                borderBottom:
                                    "15px solid rgba(147, 197, 253, 0.6)",
                            }}
                        ></div>
                        <div
                            className="absolute top-1/2 left-1/3 opacity-35"
                            style={{
                                width: 0,
                                height: 0,
                                borderLeft: "30px solid transparent",
                                borderRight: "0px solid transparent",
                                borderTop: "18px solid transparent",
                                borderBottom:
                                    "18px solid rgba(147, 197, 253, 0.5)",
                            }}
                        ></div>
                        <div
                            className="absolute bottom-1/4 left-1/2 opacity-30"
                            style={{
                                width: 0,
                                height: 0,
                                borderLeft: "20px solid transparent",
                                borderRight: "0px solid transparent",
                                borderTop: "12px solid transparent",
                                borderBottom:
                                    "12px solid rgba(147, 197, 253, 0.4)",
                            }}
                        ></div>
                        <div
                            className="absolute top-2/3 right-1/3 opacity-35"
                            style={{
                                width: 0,
                                height: 0,
                                borderLeft: "28px solid transparent",
                                borderRight: "0px solid transparent",
                                borderTop: "16px solid transparent",
                                borderBottom:
                                    "16px solid rgba(147, 197, 253, 0.5)",
                            }}
                        ></div>

                        <div className="absolute top-1/3 left-1/2 w-6 h-6 bg-blue-300 opacity-40 transform rotate-45"></div>
                        <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-blue-400 opacity-35 transform rotate-45"></div>
                        <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-blue-300 opacity-45 transform rotate-45"></div>
                        <div className="absolute bottom-1/2 right-1/3 w-7 h-7 bg-blue-400 opacity-30 transform rotate-45"></div>
                        <div className="absolute top-1/4 right-1/2 w-4 h-4 bg-blue-300 opacity-50 transform rotate-45"></div>

                        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-300 rounded-full opacity-60"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-blue-200 rounded-full opacity-50"></div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div
                            className="absolute -top-10 -right-10 opacity-80"
                            style={{
                                width: 0,
                                height: 0,
                                borderLeft: "150px solid transparent",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                                borderBottom: "150px solid #4f46e5",
                            }}
                        ></div>

                        <div className="absolute top-12 right-24 w-20 h-20 border-4 border-blue-300 rounded-full opacity-40"></div>
                        <div className="absolute top-1/3 right-16 w-14 h-14 border-4 border-blue-200 rounded-full opacity-50"></div>
                        <div className="absolute top-1/2 right-40 w-10 h-10 border-3 border-blue-300 rounded-full opacity-35"></div>
                        <div className="absolute bottom-1/3 left-16 w-24 h-24 border-4 border-blue-300 rounded-full opacity-40"></div>
                        <div className="absolute bottom-20 right-1/3 w-12 h-12 bg-blue-200 rounded-full opacity-50"></div>
                        <div className="absolute bottom-40 right-20 w-8 h-8 bg-blue-100 rounded-full opacity-60"></div>

                        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-100 rounded-full opacity-30"></div>
                    </div>

                    <div className="w-full max-w-md z-10">
                        <div className="text-center mb-8">
                            <h1 className="text-5xl font-bold text-gray-900 mb-2">
                                Welcome Back !
                            </h1>
                            <p className="text-gray-700 text-base font-medium">
                                Login to your account
                            </p>
                            <div className="h-0.5 bg-gray-400 mt-6"></div>
                        </div>

                        {status && (
                            <div className="mb-4 font-medium text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6 mt-8">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <svg
                                        className="w-5 h-5 text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                    >
                                        <circle cx="12" cy="8" r="4"></circle>
                                        <path d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6"></path>
                                    </svg>
                                    <span className="text-gray-800 font-semibold text-sm">
                                        Name
                                    </span>
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    isFocused
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="Enter your email"
                                    className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm ${
                                        errors.email
                                            ? "border-red-500"
                                            : "border-gray-200"
                                    }`}
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-xs mt-1 block">
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <svg
                                        className="w-5 h-5 text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                    >
                                        <rect
                                            x="3"
                                            y="11"
                                            width="18"
                                            height="11"
                                            rx="2"
                                            ry="2"
                                        ></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                    <span className="text-gray-800 font-semibold text-sm">
                                        Password
                                    </span>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm ${
                                        errors.password
                                            ? "border-red-500"
                                            : "border-gray-200"
                                    }`}
                                />
                                {errors.password && (
                                    <span className="text-red-500 text-xs mt-1 block">
                                        {errors.password}
                                    </span>
                                )}
                            </div>

                            <div className="text-right">
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-blue-400 hover:text-blue-500 text-sm font-medium"
                                    >
                                        Forgot Password?
                                    </Link>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl transition transform hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                            >
                                {processing ? "Signing in..." : "Sign in"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
