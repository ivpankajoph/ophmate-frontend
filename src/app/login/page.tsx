"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PhoneOtpLogin() {
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState(Array(6).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length < 10) return alert("Please enter a valid phone number")
    setStep("otp")
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const code = otp.join("")
    if (code.length !== 6) return alert("Enter complete 6-digit OTP")
    alert("✅ Login Successful")
  }

  const handleEditPhone = () => {
    setOtp(Array(6).fill(""))
    setStep("phone")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl border border-gray-200">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            {step === "phone" ? "Login with Phone" : "Enter OTP"}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {step === "phone"
              ? "We’ll send a one-time code to your phone number"
              : (
                <>
                  OTP sent to <span className="font-medium text-gray-900">+91 {phone}</span>{" "}
                  <button
                    type="button"
                    onClick={handleEditPhone}
                    className="text-blue-600 text-sm font-medium hover:underline ml-2"
                  >
                    Change
                  </button>
                </>
              )}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={step === "phone" ? handleSendOtp : handleLogin}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {step === "phone" ? (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <Label>Enter 6-digit OTP</Label>
                  <div className="flex justify-between gap-2 sm:gap-3">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleOtpChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        ref={(el) => { inputRefs.current[index] = el }}
                        className="w-10 sm:w-12 text-center text-lg font-semibold focus-visible:ring-2 focus-visible:ring-blue-500"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 text-right">
                    Didn’t receive OTP?{" "}
                    <button
                      type="button"
                      onClick={() => alert("OTP resent")}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Resend
                    </button>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 mt-4">
          {step === "phone" ? (
            <Button onClick={handleSendOtp} className="w-full">
              Send OTP
            </Button>
          ) : (
            <Button onClick={handleLogin} className="w-full">
              Verify & Login
            </Button>
          )}

          <Button variant="outline" className="w-full">
            Continue with Google
          </Button>

 
        </CardFooter>
      </Card>
    </div>
  )
}
