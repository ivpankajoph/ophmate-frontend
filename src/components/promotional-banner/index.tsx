import { Badge } from 'lucide-react'
import React from 'react'

export default function PromotionalBanner (){
  return (
 <>
 
       <div className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="font-medium">Free shipping over <span className="font-bold">₹75</span></div>
          <div className="hidden sm:flex gap-4 items-center">
            <span>Need help? <a className="underline">Contact us</a></span>
            <Badge>Limited Offer</Badge>
          </div>
        </div>
      </div></>
  )
}

