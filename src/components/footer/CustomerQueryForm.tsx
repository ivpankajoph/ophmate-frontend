"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import userApi from "@/lib/userApi";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const querySchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    orderId: z.string().optional(),
    issueType: z.enum([
        "Delivery delayed",
        "Wrong product delivered",
        "Damaged product received",
        "Product not as described",
        "Missing items in package",
        "Refund not received",
        "Payment issue",
        "Other",
    ], {
        required_error: "Please select an issue type",
    }),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type QueryFormValues = z.infer<typeof querySchema>;

export default function CustomerQueryForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state: any) => state.customerAuth?.user);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<QueryFormValues>({
        resolver: zodResolver(querySchema),
        defaultValues: {
            fullName: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
        },
    });

    const onSubmit = async (data: QueryFormValues) => {
        setLoading(true);
        try {
            const response = await userApi.post("/support/queries/submit", data);
            if (response.data.success) {
                setIsOpen(false);
                reset();
                Swal.fire({
                    icon: "success",
                    title: "Query Submitted",
                    text: "Thank you for contacting us. We will get back to you shortly.",
                    timer: 3000,
                    showConfirmButton: false,
                });
            }
        } catch (error: any) {
            console.error("Submission error:", error);
            setIsOpen(false);
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: error.response?.data?.message || "Something went wrong. Please try again later.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="text-sm hover:underline text-left">
                    Submit Complaint
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Contact Support</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input
                                id="fullName"
                                placeholder="John Doe"
                                {...register("fullName")}
                                className={errors.fullName ? "border-destructive" : ""}
                            />
                            {errors.fullName && (
                                <p className="text-xs text-destructive">{errors.fullName.message}</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                {...register("email")}
                                className={errors.email ? "border-destructive" : ""}
                            />
                            {errors.email && (
                                <p className="text-xs text-destructive">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                placeholder="1234567890"
                                {...register("phone")}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="orderId">Order ID</Label>
                            <Input
                                id="orderId"
                                placeholder="#ORD-123"
                                {...register("orderId")}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="issueType">Issue Type *</Label>
                        <Select onValueChange={(value) => setValue("issueType", value as any)}>
                            <SelectTrigger className={errors.issueType ? "border-destructive" : ""}>
                                <SelectValue placeholder="Select an issue type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Delivery delayed">Delivery delayed</SelectItem>
                                <SelectItem value="Wrong product delivered">Wrong product delivered</SelectItem>
                                <SelectItem value="Damaged product received">Damaged product received</SelectItem>
                                <SelectItem value="Product not as described">Product not as described</SelectItem>
                                <SelectItem value="Missing items in package">Missing items in package</SelectItem>
                                <SelectItem value="Refund not received">Refund not received</SelectItem>
                                <SelectItem value="Payment issue">Payment issue</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.issueType && (
                            <p className="text-xs text-destructive">{errors.issueType.message}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                            id="message"
                            placeholder="Describe your issue in detail..."
                            rows={4}
                            {...register("message")}
                            className={errors.message ? "border-destructive" : ""}
                        />
                        {errors.message && (
                            <p className="text-xs text-destructive">{errors.message.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Query"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
