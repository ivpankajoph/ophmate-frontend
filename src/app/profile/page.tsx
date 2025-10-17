"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Profile() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-sm shadow-lg rounded-2xl border border-gray-200 bg-white">
        <CardContent className="flex flex-col items-center p-6 text-center">
          {/* Profile Image */}
          <div className="relative w-32 h-32 mb-4">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Profile"
              className="rounded-full object-cover w-full h-full border-4 border-gray-200 shadow-sm"
            />
          </div>

          {/* User Info */}
          <h2 className="text-2xl font-semibold text-gray-800">Alex Runner</h2>
          <p className="text-gray-500 text-sm">alex.runner@example.com</p>
          <p className="text-gray-400 text-sm mt-1">New York, USA</p>

          {/* Bio */}
          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            Passionate about running, tech, and design. Loves building user-friendly web experiences.
          </p>

          {/* Buttons */}
          <div className="flex gap-3 mt-6 w-full justify-center">
            <Button variant="default" className="px-6">
              Edit Profile
            </Button>
            <Button variant="outline" className="px-6">
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}



