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
                    <div className="absolute insert-0">
                        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400 rounded-full opacity-20">
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
                                    borderTop: "10px solid transparent",
                                    borderBottom:
                                        "10px solid rgba(147, 197, 253, 0.6)",
                                }}
                            ></div>

                            <div
                                className="absolute top-1/4 left-1/2 opacity-30"
                                style={{
                                    width: 0,
                                    height: 0,
                                    borderLeft: "20px solid transparent",
                                    borderRight: "0px solid transparent",
                                    borderTop: "12px solid transparent",
                                    borderBottom:
                                        "12px solid rgba(147, 197, 253, 0.6)",
                                }}
                            ></div>

                            <div
                                className="absolute top-2/3 left-1/3 opacity-35"
                                style={{
                                    width: 0,
                                    height: 0,
                                    borderLeft: "20px solid transparent",
                                    borderRight: "0px solid transparent",
                                    borderTop: "16px solid transparent",
                                    borderBottom:
                                        "16px solid rgba(147, 197, 253, 0.6)",
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

                    <div className="w-full lg-w-1/2 bg-white flex items-center justify-center p-6 relative overflow-hidden">
                        <div className="absolute insert-0 pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
