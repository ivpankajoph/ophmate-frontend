"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store"
import {
  loginCustomer,
  registerCustomer,
  sendCustomerOtp,
  verifyCustomerOtp,
} from "@/store/slices/customerAuthSlice"
import { useRouter } from "next/navigation"
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

type Mode = "login" | "register" | "otp"

// Animated background shapes component
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500 rounded-full opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-30"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  )
}

// Floating decorative icons
function FloatingIcon({ 
  icon: Icon, 
  className,
  delay = 0 
}: { 
  icon: any, 
  className: string,
  delay?: number
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.1, scale: 1 }}
      transition={{
        duration: 1,
        delay,
        ease: "easeOut",
      }}
    >
      <Icon size={80} />
    </motion.div>
  )
}

// Custom input component with icon and animations
function AnimatedInput({
  icon: Icon,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  showPasswordToggle,
  isPasswordVisible,
  onTogglePassword,
  maxLength,
  onKeyDown,
  inputRef,
}: {
  icon: any
  label: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  error?: string
  showPasswordToggle?: boolean
  isPasswordVisible?: boolean
  onTogglePassword?: () => void
  maxLength?: number
  onKeyDown?: (e: React.KeyboardEvent) => void
  inputRef?: React.RefObject<HTMLInputElement>
}) {
  const [focused, setFocused] = useState(false)

  return (
    <motion.div
      className="relative"
      initial={false}
      animate={{ scale: 1 }}
      whileFocus={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Label
        className={`absolute left-12 text-sm transition-all duration-200 z-10 ${
          focused || value
            ? "-top-2.5 left-10 text-xs bg-white px-2 text-purple-600 font-medium"
            : "top-3.5 text-gray-500"
        }`}
      >
        {label}
      </Label>
      <div className="relative">
        <div
          className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
            focused ? "text-purple-500" : "text-gray-400"
          }`}
        >
          <Icon size={20} />
        </div>
        <Input
          ref={inputRef}
          type={type === "password" && isPasswordVisible ? "text" : type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? "" : placeholder}
          maxLength={maxLength}
          onKeyDown={onKeyDown}
          className={`pl-10 pr-10 h-12 bg-white/80 backdrop-blur-sm border-2 transition-all duration-200 ${
            error
              ? "border-red-300 focus:border-red-400"
              : focused
              ? "border-purple-400 focus:border-purple-500 shadow-lg shadow-purple-500/10"
              : "border-gray-200 hover:border-gray-300"
          }`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs mt-1 flex items-center gap-1"
        >
          <AlertCircle size={12} />
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}

// Loading spinner component
function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

export default function UserLogin() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { loading, error, token, otpSent } = useSelector(
    (state: RootState) => state.customerAuth,
  )

  const [mode, setMode] = useState<Mode>("login")
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState(Array(6).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (token) {
      router.push("/profile")
    }
  }, [token, router])

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await dispatch(loginCustomer({ identifier, password }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    await dispatch(registerCustomer({ name, email, phone, password }))
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length < 10) return
    await dispatch(sendCustomerOtp({ phone }))
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    const code = otp.join("")
    if (code.length !== 6) return
    await dispatch(verifyCustomerOtp({ phone, otp: code }))
  }

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode)
    setIdentifier("")
    setPassword("")
    setName("")
    setEmail("")
    setPhone("")
    setOtp(Array(6).fill(""))
  }

  const modeOptions = [
    { value: "login" as Mode, label: "Sign In", icon: Lock },
    { value: "register" as Mode, label: "Create Account", icon: User },
    { value: "otp" as Mode, label: "OTP Login", icon: Phone },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground />
      
      {/* Floating decorative icons */}
      <FloatingIcon icon={Mail} className="top-20 left-10" delay={0.2} />
      <FloatingIcon icon={Lock} className="bottom-20 right-10" delay={0.4} />
      <FloatingIcon icon={User} className="top-1/3 right-20" delay={0.6} />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-[420px] mx-4 z-10"
      >
        <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl shadow-purple-500/20 rounded-3xl overflow-hidden">
          {/* Header with gradient */}
          <div className="relative h-32 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-white/10"
              animate={{
                x: [-100, 100],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
            <div className="absolute inset-0 bg-black/10" />
            
            {/* Logo/icon */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
            </motion.div>
          </div>

          <CardContent className="pt-20 pb-6 px-6 sm:px-8">
            {/* Mode tabs at top */}
            <motion.div
              className="flex gap-2 mb-6 bg-gray-100 p-1.5 rounded-2xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {modeOptions.map((option, index) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleModeChange(option.value)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    mode === option.value
                      ? "bg-white text-purple-600 shadow-md"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <option.icon size={16} />
                  <span className="hidden sm:inline">{option.label}</span>
                  <span className="sm:hidden">{option.label.split(" ")[0]}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Title and description */}
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-6"
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {mode === "login" && "Welcome Back!"}
                {mode === "register" && "Create Account"}
                {mode === "otp" && "Quick Login"}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {mode === "login" && "Sign in to access your account"}
                {mode === "register" && "Join us and start shopping"}
                {mode === "otp" && "Enter your phone to receive OTP"}
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {mode === "login" && (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                  onSubmit={handleLogin}
                >
                  <AnimatedInput
                    icon={Mail}
                    label="Email or Phone"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter email or phone"
                  />
                  <div className="relative">
                    <AnimatedInput
                      icon={Lock}
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      showPasswordToggle
                      isPasswordVisible={showPassword}
                      onTogglePassword={() => setShowPassword(!showPassword)}
                    />
                    <motion.button
                      type="button"
                      onClick={() => router.push("/forgot-password")}
                      className="text-sm text-purple-600 hover:text-purple-700 mt-2 block ml-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Forgot Password?
                    </motion.button>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 transition-all duration-300"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <LoadingSpinner />
                          Signing in...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Sign In
                          <ArrowRight size={18} />
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              )}

              {mode === "register" && (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                  onSubmit={handleRegister}
                >
                  <AnimatedInput
                    icon={User}
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                  <AnimatedInput
                    icon={Mail}
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  <AnimatedInput
                    icon={Phone}
                    label="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    maxLength={10}
                  />
                  <div className="relative">
                    <AnimatedInput
                      icon={Lock}
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create password"
                      showPasswordToggle
                      isPasswordVisible={showPassword}
                      onTogglePassword={() => setShowPassword(!showPassword)}
                    />
                    <p className="text-xs text-gray-400 mt-2 ml-1">
                      Must be at least 6 characters
                    </p>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 transition-all duration-300"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <LoadingSpinner />
                          Creating account...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Create Account
                          <ArrowRight size={18} />
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              )}

              {mode === "otp" && (
                <motion.form
                  key="otp"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                  onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
                >
                  <AnimatedInput
                    icon={Phone}
                    label="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    maxLength={10}
                  />
                  
                  {otpSent && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      <Label className="text-sm text-gray-600 ml-1">
                        Enter 6-digit OTP
                      </Label>
                      <div className="flex justify-between gap-1 sm:gap-2">
                        {otp.map((digit, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex-1"
                          >
                            <Input
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange(index, e.target.value)}
                              onKeyDown={(e) => handleOtpKeyDown(index, e)}
                              ref={(el) => {
                                inputRefs.current[index] = el
                              }}
                              className="w-full h-12 text-center text-lg font-semibold bg-white/80 border-2 border-gray-200 focus:border-purple-400 rounded-xl transition-all duration-200"
                            />
                          </motion.div>
                        ))}
                      </div>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-sm text-green-600 flex items-center justify-center gap-1 mt-2"
                      >
                        <CheckCircle2 size={14} />
                        OTP sent successfully!
                      </motion.p>
                    </motion.div>
                  )}
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={loading || (!otpSent && phone.length < 10)}
                      className="w-full h-12 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 transition-all duration-300"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <LoadingSpinner />
                          {otpSent ? "Verifying..." : "Sending..."}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          {otpSent ? "Verify OTP" : "Send OTP"}
                          <ArrowRight size={18} />
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2"
                >
                  <AlertCircle className="text-red-500 flex-shrink-0" size={18} />
                  <p className="text-red-600 text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-sm text-gray-500">
                {mode === "login" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      onClick={() => handleModeChange("register")}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => handleModeChange("login")}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </motion.div>
          </CardContent>
        </Card>

        {/* Mobile optimization notice */}
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-gray-400">
            Optimized for all screen sizes
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

