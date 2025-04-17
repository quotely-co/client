import { useState, useEffect } from 'react';
import { AlertTriangle, Check, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

useEffect(()=>{

})
const checkUserExists = async (email) => {
    const HOST = import.meta.env.VITE_HOST_URL;

    try {
        const response = await axios.post(`${HOST}/api/auth/check_factory`, { email });
        if (response.status === 200) {
            console.log("User check response:", response.data);
            return response.data;
        } else if (response.status === 404) {
            console.log("User not found:", response.data);
            return { exists: false };
        } else {
            return { exists: false }
        }
    } catch (error) {
        console.log("Error checking user:", error);
        return { exists: false }

    }
};

const sendOTP = async (email) => {
    const HOST = import.meta.env.VITE_HOST_URL;

    try {
        const response = await axios.post(`${HOST}/api/auth/send-otp`, { email });
        if (response.status === 200) {
            console.log("OTP sent response:", response.data);
            return { success: true, otp: response.data.otp };
        } else {
            return { success: false };
        }
    } catch (error) {
        console.log("Error sending OTP:", error);
        return { success: false };
    }
};

const verifyOTP = async (email, userEnteredOTP, actualOTP) => {
    // Simulate API call to verify OTP
    const HOST = import.meta.env.VITE_HOST_URL;
    try {
        const response = await axios.post(
            `${HOST}/api/auth/factory/verify-otp`,
            { email, userEnteredOTP, actualOTP },
            { withCredentials: true }
        );

        if (response.status === 200) {
            console.log("OTP verification response:", response.data)
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("subdomain", response.data.subdomain);
            return { success: true };
        } else {
            return { success: false };
        }
    } catch (error) {
        console.log("Error verifying OTP:", error);
        return { success: false };
    }
};

// Logo Component
const QuotelyLogo = () => (
    <div className="mb-8">
        <div className="text-3xl font-bold flex items-center">
            <span className="text-4xl mr-1">"</span>
            QUOTELY
        </div>
    </div>
);

// First Page - Email Input
const EmailLoginPage = ({ onContinue }) => {

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        setError('');

        try {
            // Check if user exists
            const { exists } = await checkUserExists(email);
            console.log(exists);

            if (!exists) {
                setError('No account found with this email address');
                setIsLoading(false);
                return;
            }

            // Send OTP
            const { success, otp } = await sendOTP(email);

            if (success) {
                onContinue(email, otp);
            } else {
                setError('Failed to send verification code. Please try again.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-zinc-800 p-6">
            <div className="w-full max-w-sm">
                <QuotelyLogo />

                <h1 className="text-xl font-medium mb-6">Sign in</h1>

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border-b border-zinc-300 bg-transparent focus:outline-none focus:border-black"
                            required
                        />
                        {error && (
                            <p className="mt-2 text-xs text-red-500">{error}</p>
                        )}
                    </div>

                    <div className="flex items-center mb-6">
                        <input
                            type="checkbox"
                            id="remember"
                            className="mr-2 h-4 w-4 accent-black"
                        />
                        <label htmlFor="remember" className="text-sm text-zinc-600">Remember me</label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 bg-black text-white rounded-md font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={16} className="mr-2 animate-spin" />
                                Checking...
                            </>
                        ) : (
                            "Continue"
                        )}
                    </button>
                </form>

                <button className="mt-6 flex items-center text-xs text-zinc-500 hover:text-black transition-colors">
                    <AlertTriangle size={14} className="mr-1" />
                    Sign in issues?
                </button>
            </div>
        </div>
    );
};

// Verification Code Input Component
const OTPInput = ({ length = 6, value, onChange }) => {
    const [code, setCode] = useState(Array(length).fill(''));
    const inputRefs = Array(length).fill(0).map(() => useState(null));

    useEffect(() => {
        // Update internal state if value prop changes
        if (value) {
            const valueArray = value.split('').slice(0, length);
            setCode([...valueArray, ...Array(length - valueArray.length).fill('')]);
        }
    }, [value, length]);

    const handleCodeChange = (index, val) => {
        if (val.length <= 1) {
            const newCode = [...code];
            newCode[index] = val;
            setCode(newCode);

            // Notify parent component
            onChange(newCode.join(''));

            // Move to next input if value is entered
            if (val && index < length - 1) {
                inputRefs[index + 1][0]?.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        // Move to previous input on backspace if current is empty
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs[index - 1][0]?.focus();
        }
    };

    // Handle paste event
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').trim();
        if (pastedData.length === length && /^\d+$/.test(pastedData)) {
            setCode(pastedData.split(''));
            onChange(pastedData);
        }
    };

    return (
        <div className="flex justify-between mb-6" onPaste={handlePaste}>
            {code.map((digit, index) => (
                <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => inputRefs[index][1](el)}
                    className="w-10 h-10 text-center font-medium bg-zinc-900 rounded border border-zinc-700 focus:border-white focus:outline-none"
                    maxLength={1}
                    autoComplete="one-time-code"
                />
            ))}
        </div>
    );
};

// Second Page - Verification Code
const VerificationPage = ({ email, actualOTP, onSuccess }) => {
    const [otpValue, setOtpValue] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        // Countdown timer for resend option
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleVerify = async () => {
        if (otpValue.length !== 6) {
            setError('Please enter a complete verification code');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const { success } = await verifyOTP(email, otpValue, actualOTP);

            if (success) {
                toast.success('Verification successful!');
                onSuccess(true);
                const token = localStorage.getItem("token");
                const subdomain = localStorage.getItem("subdomain");
                window.location.href = `https://${subdomain}.quotely.shop?token=${token}`; // Redirect to dashboard
            } else {
                setError('Invalid verification code. Please try again.');
            }
        } catch (err) {
            console.log(err);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (countdown > 0) return;

        setIsResending(true);
        try {
            const { success, otp } = await sendOTP(email);
            if (success) {
                // Update the actualOTP in parent component
                onSuccess(false, otp);
                setCountdown(30);
                setError('');
            }
        } catch (err) {
            setError('Failed to resend code');
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
            <div className="w-full max-w-sm">
                <QuotelyLogo />

                <h1 className="text-xl font-medium mb-4">Verification</h1>

                <div className="mb-6">
                    <p className="text-sm text-zinc-400">Enter the code sent to</p>
                    <p className="text-sm font-medium">{email}</p>
                </div>

                <OTPInput
                    length={6}
                    value={otpValue}
                    onChange={setOtpValue}
                />

                {error && (
                    <p className="mb-4 text-xs text-red-400">{error}</p>
                )}

                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        id="remember"
                        className="mr-2 h-4 w-4 accent-white"
                    />
                    <label htmlFor="remember" className="text-sm text-zinc-400">Remember me</label>
                </div>

                <button
                    onClick={handleVerify}
                    disabled={isLoading}
                    className="w-full py-2 bg-white text-black rounded-md font-medium hover:bg-zinc-200 transition-colors flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={16} className="mr-2 animate-spin" />
                            Verifying...
                        </>
                    ) : (
                        "Sign In"
                    )}
                </button>

                <div className="mt-6 flex flex-col items-center">
                    <button
                        onClick={handleResendOTP}
                        disabled={countdown > 0 || isResending}
                        className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center"
                    >
                        {isResending ? (
                            <>
                                <Loader2 size={14} className="mr-1 animate-spin" />
                                Sending...
                            </>
                        ) : countdown > 0 ? (
                            `Resend code in ${countdown}s`
                        ) : (
                            "Resend verification code"
                        )}
                    </button>

                    <button className="mt-3 flex items-center text-xs text-zinc-500 hover:text-white transition-colors">
                        <AlertTriangle size={14} className="mr-1" />
                        Sign in issues?
                    </button>
                </div>
            </div>
        </div>
    );
};

// Success Page
const SuccessPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
            <div className="w-full max-w-sm text-center">
                <QuotelyLogo />

                <div className="flex justify-center mb-6">
                    <div className="bg-green-500 rounded-full p-3">
                        <Check size={24} className="text-white" />
                    </div>
                </div>

                <h1 className="text-xl font-medium mb-3">Successfully logged in</h1>
                <p className="text-sm text-zinc-400 mb-6">Welcome back to Quotely</p>

                <button
                    className="w-full py-2 bg-white text-black rounded-md font-medium hover:bg-zinc-200 transition-colors"
                >
                    Continue to Dashboard
                </button>
            </div>
        </div>
    );
};

// Main App Component
const QuotelyLoginApp = () => {
    const [currentPage, setCurrentPage] = useState('email');
    const [userEmail, setUserEmail] = useState('');
    const [actualOTP, setActualOTP] = useState('');

    const handleContinue = (email, otp) => {
        setUserEmail(email);
        setActualOTP(otp);
        setCurrentPage('verification');
    };

    const handleVerificationSuccess = (isLogin = true, newOTP = null) => {
        if (isLogin) {
            setCurrentPage('success');
        } else if (newOTP) {
            // Handle OTP resend
            setActualOTP(newOTP);
        }
    };

    return (
        <div className="font-sans">
            {currentPage === 'email' ? (
                <EmailLoginPage onContinue={handleContinue} />
            ) : currentPage === 'verification' ? (
                <VerificationPage
                    email={userEmail}
                    actualOTP={actualOTP}
                    onSuccess={handleVerificationSuccess}
                />
            ) : (
                <SuccessPage />
            )}
        </div>
    );
};

export default QuotelyLoginApp;