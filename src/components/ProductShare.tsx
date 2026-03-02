// "use client";

// import React, { useState } from "react";
// import { Share2, Copy, Check, MoreHorizontal } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { toastSuccess, toastError } from "@/lib/toast";

// interface ProductShareProps {
//   productName: string;
//   productUrl: string;
//   productImage?: string;
// }

// export default function ProductShare({
//   productName,
//   productUrl,
//   productImage,
// }: ProductShareProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [copied, setCopied] = useState(false);

//   const shareOptions = [
//     {
//       id: "copy-link",
//       name: "Copy Link",
//       icon: "🔗",
//       action: () => handleCopyLink(),
//     },
//     {
//       id: "whatsapp",
//       name: "Whatsapp",
//       icon: "💬",
//       action: () => handleWhatsApp(),
//     },
//     {
//       id: "facebook",
//       name: "Facebook",
//       icon: "📘",
//       action: () => handleFacebook(),
//     },
//     {
//       id: "fb-messenger",
//       name: "Facebook Messenger",
//       icon: "💬",
//       action: () => handleMessenger(),
//     },
//     {
//       id: "gmail",
//       name: "Gmail",
//       icon: "✉️",
//       action: () => handleGmail(),
//     },
//     {
//       id: "sms",
//       name: "SMS",
//       icon: "📱",
//       action: () => handleSMS(),
//     },
//     {
//       id: "linkedin",
//       name: "LinkedIn",
//       icon: "💼",
//       action: () => handleLinkedIn(),
//     },
//   ];

//   const handleCopyLink = async () => {
//     try {
//       await navigator.clipboard.writeText(productUrl);
//       setCopied(true);
//       toastSuccess("Link copied to clipboard!");
//       setTimeout(() => setCopied(false), 2000);
//     } catch (error) {
//       toastError("Failed to copy link");
//     }
//   };

//   const handleWhatsApp = () => {
//     const text = encodeURIComponent(
//       `Check out this amazing product: ${productName}\n${productUrl}`
//     );
//     const whatsappUrl = `https://wa.me/?text=${text}`;
//     window.open(whatsappUrl, "_blank");
//     toastSuccess("Opening WhatsApp...");
//     setIsOpen(false);
//   };

//   const handleFacebook = () => {
//     const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//       productUrl
//     )}&quote=${encodeURIComponent(productName)}`;
//     window.open(facebookUrl, "_blank", "width=600,height=400");
//     toastSuccess("Opening Facebook...");
//     setIsOpen(false);
//   };

//   const handleMessenger = () => {
//     const messengerUrl = `fb-messenger://share/?link=${encodeURIComponent(
//       productUrl
//     )}`;
//     window.open(messengerUrl, "_blank");
//     toastSuccess("Opening Facebook Messenger...");
//     setIsOpen(false);
//   };

//   const handleGmail = () => {
//     const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=&su=${encodeURIComponent(
//       productName
//     )}&body=${encodeURIComponent(`Check out this product: ${productUrl}`)}`;
//     window.open(gmailUrl, "_blank");
//     toastSuccess("Opening Gmail...");
//     setIsOpen(false);
//   };

//   const handleSMS = () => {
//     const smsBody = encodeURIComponent(
//       `Check out: ${productName} - ${productUrl}`
//     );
//     const smsUrl = `sms:?body=${smsBody}`;
//     window.location.href = smsUrl;
//     toastSuccess("Opening SMS...");
//     setIsOpen(false);
//   };

//   const handleLinkedIn = () => {
//     const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//       productUrl
//     )}`;
//     window.open(linkedinUrl, "_blank", "width=600,height=400");
//     toastSuccess("Opening LinkedIn...");
//     setIsOpen(false);
//   };    

//   return (
//     <div className="relative">
//       <Button
//         variant="outline"
//         size="sm"
//         className="gap-2 border-2 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
//         onClick={() => setIsOpen(!isOpen)}
//         title="Share this product"
//       >
//         <Share2 className="w-4 h-4" />
//         Share
//       </Button>

//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <div
//             className="fixed inset-0 z-40"
//             onClick={() => setIsOpen(false)}
//           />

//           {/* Share Modal */}
//           <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-neutral-200 z-50 p-6">
//             {/* Header */}
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-bold text-neutral-900">Share</h3>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-neutral-400 hover:text-neutral-600 transition-colors"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Product Preview */}
//             <div className="flex items-start gap-3 mb-4 pb-4 border-b border-neutral-200">
//               {productImage && (
//                 <img
//                   src={productImage}
//                   alt={productName}
//                   className="w-16 h-16 object-cover rounded-lg"
//                 />
//               )}
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-semibold text-neutral-900 line-clamp-2">
//                   {productName}
//                 </p>
//               </div>
//             </div>

//             {/* Share Options Grid */}
//             <div className="grid grid-cols-4 gap-3 mb-4">
//               {shareOptions.map((option) => (
//                 <button
//                   key={option.id}
//                   onClick={option.action}
//                   className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-neutral-100 transition-colors"
//                   title={option.name}
//                 >
//                   <div className="text-2xl">{option.icon}</div>
//                   <span className="text-xs text-center text-neutral-600 font-medium">
//                     {option.name}
//                   </span>
//                 </button>
//               ))}
//             </div>

//             {/* Copy Link Section */}
//             <div className="bg-neutral-50 p-3 rounded-lg flex items-center justify-between gap-2">
//               <div className="flex-1 min-w-0">
//                 <p className="text-xs text-neutral-600 mb-1">Share Link</p>
//                 <p className="text-xs font-mono text-neutral-900 truncate">
//                   {productUrl}
//                 </p>
//               </div>
//               <button
//                 onClick={handleCopyLink}
//                 className="flex-shrink-0 p-2 hover:bg-neutral-200 rounded-lg transition-colors"
//                 title="Copy link"
//               >
//                 {copied ? (
//                   <Check className="w-4 h-4 text-green-600" />
//                 ) : (
//                   <Copy className="w-4 h-4 text-neutral-600" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }



// "use client";

// import React, { useState } from "react";
// import { Share2, Copy, Check, X } from "lucide-react";
// import {
//   FaWhatsapp,
//   FaFacebookF,
//   FaFacebookMessenger,
//   FaLinkedinIn,
// } from "react-icons/fa";
// import { SiGmail } from "react-icons/si";
// import { MdSms } from "react-icons/md";
// import { Button } from "@/components/ui/button";
// import { toastSuccess, toastError } from "@/lib/toast";

// interface ProductShareProps {
//   productName: string;
//   productUrl: string;
//   productImage?: string;
// }

// export default function ProductShare({
//   productName,
//   productUrl,
//   productImage,
// }: ProductShareProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [copied, setCopied] = useState(false);

//   const handleCopyLink = async () => {
//     try {
//       await navigator.clipboard.writeText(productUrl);
//       setCopied(true);
//       toastSuccess("Link copied!");
//       setTimeout(() => setCopied(false), 2000);
//     } catch {
//       toastError("Failed to copy link");
//     }
//   };

//   const shareOptions = [
//     {
//       name: "Copy Link",
//       icon: <Copy className="w-5 h-5 text-blue-600" />,
//       action: handleCopyLink,
//     },
//     {
//       name: "Whatsapp",
//       icon: <FaWhatsapp className="w-6 h-6 text-green-500" />,
//       action: () =>
//         window.open(
//           `https://wa.me/?text=${encodeURIComponent(
//             `Check this product: ${productName} ${productUrl}`
//           )}`,
//           "_blank"
//         ),
//     },
//     {
//       name: "Facebook",
//       icon: <FaFacebookF className="w-6 h-6 text-blue-700" />,
//       action: () =>
//         window.open(
//           `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//             productUrl
//           )}`,
//           "_blank",
//           "width=600,height=400"
//         ),
//     },
//     {
//       name: "Messenger",
//       icon: <FaFacebookMessenger className="w-6 h-6 text-blue-500" />,
//       action: () =>
//         window.open(
//           `fb-messenger://share/?link=${encodeURIComponent(productUrl)}`,
//           "_blank"
//         ),
//     },
//     {
//       name: "Gmail",
//       icon: <SiGmail className="w-6 h-6 text-red-500" />,
//       action: () =>
//         window.open(
//           `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
//             productName
//           )}&body=${encodeURIComponent(productUrl)}`,
//           "_blank"
//         ),
//     },
//     {
//       name: "SMS",
//       icon: <MdSms className="w-6 h-6 text-purple-600" />,
//       action: () =>
//         (window.location.href = `sms:?body=${encodeURIComponent(
//           `${productName} - ${productUrl}`
//         )}`),
//     },
//     {
//       name: "LinkedIn",
//       icon: <FaLinkedinIn className="w-6 h-6 text-blue-600" />,
//       action: () =>
//         window.open(
//           `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//             productUrl
//           )}`,
//           "_blank",
//           "width=600,height=400"
//         ),
//     },
//   ];

//   return (
//     <>
//       {/* Share Button */}
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => setIsOpen(true)}
//         className="gap-2"
//       >
//         <Share2 className="w-4 h-4" />
//         Share
//       </Button>

//       {/* Overlay */}
//       {isOpen && (
//         <>
//           <div
//             className="fixed inset-0 bg-black/40 z-40"
//             onClick={() => setIsOpen(false)}
//           />

//           {/* Right Side Drawer */}
//           <div className="fixed right-0 top-0 h-full w-[380px] bg-white shadow-2xl z-50 p-6 animate-slideIn">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-bold">Share</h2>
//               <button onClick={() => setIsOpen(false)}>
//                 <X className="w-5 h-5 text-neutral-500" />
//               </button>
//             </div>

//             {/* Product Preview */}
//             <div className="flex gap-4 mb-6 border-b pb-4">
//               {productImage && (
//                 <img
//                   src={productImage}
//                   alt={productName}
//                   className="w-20 h-20 rounded-lg object-cover"
//                 />
//               )}
//               <p className="font-semibold text-sm">{productName}</p>
//             </div>

//             {/* Share Grid */}
//             <div className="grid grid-cols-3 gap-6 mb-8">
//               {shareOptions.map((option, index) => (
//                 <button
//                   key={index}
//                   onClick={() => {
//                     option.action();
//                     setIsOpen(false);
//                   }}
//                   className="flex flex-col items-center gap-2 hover:scale-105 transition"
//                 >
//                   <div className="bg-gray-100 p-4 rounded-full">
//                     {option.icon}
//                   </div>
//                   <span className="text-xs font-medium">
//                     {option.name}
//                   </span>
//                 </button>
//               ))}
//             </div>

//             {/* Copy Link Section */}
//             <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
//               <p className="text-xs truncate">{productUrl}</p>
//               <button onClick={handleCopyLink}>
//                 {copied ? (
//                   <Check className="w-4 h-4 text-green-600" />
//                 ) : (
//                   <Copy className="w-4 h-4 text-gray-600" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Slide Animation */}
//       <style jsx>{`
//         @keyframes slideIn {
//           from {
//             transform: translateX(100%);
//           }
//           to {
//             transform: translateX(0);
//           }
//         }
//         .animate-slideIn {
//           animation: slideIn 0.3s ease-out;
//         }
//       `}</style>
//     </>
//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import { Share2, Copy, Check, X } from "lucide-react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaFacebookMessenger,
  FaLinkedinIn,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { MdSms } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { toastSuccess, toastError } from "@/lib/toast";

interface ProductShareProps {
  productName: string;
  productUrl: string;
  productImage?: string;
}

export default function ProductShare({
  productName,
  productUrl,
  productImage,
}: ProductShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  // Detect navbar height automatically
  useEffect(() => {
    const updateNavHeight = () => {
      const nav =
        document.querySelector("header") ||
        document.querySelector("nav");

      if (nav) {
        setNavHeight((nav as HTMLElement).offsetHeight);
      } else {
        setNavHeight(70); // fallback
      }
    };

    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);

    return () => window.removeEventListener("resize", updateNavHeight);
  }, []);

  // Lock body scroll when drawer open 
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      toastSuccess("Link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toastError("Failed to copy link");
    }
  };

  const shareOptions = [
    {
      name: "Copy Link",
      icon: <Copy className="w-5 h-3 text-blue-600" />,
      action: handleCopyLink,
    },
    {
      name: "Whatsapp",
      icon: <FaWhatsapp className="w-6 h-6 text-green-500" />,
      action: () =>
        window.open(
          `https://wa.me/?text=${encodeURIComponent(
            `Check this product: ${productName} ${productUrl}`
          )}`,
          "_blank"
        ),
    },
    {
      name: "Facebook",
      icon: <FaFacebookF className="w-6 h-6 text-blue-700" />,
      action: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            productUrl
          )}`,
          "_blank",
          "width=600,height=400"
        ),
    },
    {
      name: "Messenger",
      icon: <FaFacebookMessenger className="w-6 h-6 text-blue-500" />,
      action: () =>
        window.open(
          `fb-messenger://share/?link=${encodeURIComponent(productUrl)}`,
          "_blank"
        ),
    },
    {
      name: "Gmail",
      icon: <SiGmail className="w-6 h-6 text-red-500" />,
      action: () =>
        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
            productName
          )}&body=${encodeURIComponent(productUrl)}`,
          "_blank"
        ),
    },
    {
      name: "SMS",
      icon: <MdSms className="w-6 h-6 text-purple-600" />,
      action: () =>
        (window.location.href = `sms:?body=${encodeURIComponent(
          `${productName} - ${productUrl}`
        )}`),
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn className="w-6 h-6 text-blue-600" />,
      action: () =>
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            productUrl
          )}`,
          "_blank",
          "width=600,height=400"
        ),
    },
  ];

  return (
    <>
      {/* Share Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        <Share2 className="w-4 h-4" />
        Share
      </Button>

      {isOpen && (
        <>
          {/* Overlay (below navbar only) */}
          <div
            className="fixed left-0 right-0 bottom-0 bg-black/40 z-40"
            style={{ top: navHeight }}
            onClick={() => setIsOpen(false)}
          />

          {/* Right Side Drawer */}
          <div
            className="fixed right-0 w-[360px] bg-white shadow-2xl z-50 
                       rounded-l-2xl p-5 overflow-y-auto"
            style={{
              top: navHeight + 10, // small spacing below navbar
              height: `calc(100vh - ${navHeight + 20}px)`, // reduced height
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold">Share</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            {/* Product Preview */}
            <div className="flex gap-3 mb-5 border-b pb-4">
              {productImage && (
                <img
                  src={productImage}
                  alt={productName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <p className="font-semibold text-sm">{productName}</p>
            </div>

            {/* Share Grid */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              {shareOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    option.action();
                    setIsOpen(false);
                  }}
                  className="flex flex-col items-center gap-2 hover:scale-105 transition"
                >
                  <div className="bg-gray-100 p-4 rounded-full">
                    {option.icon}
                  </div>
                  <span className="text-xs font-medium text-center">
                    {option.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Copy Link Box */}
            <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
              <p className="text-xs truncate">{productUrl}</p>
              <button onClick={handleCopyLink}>
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}