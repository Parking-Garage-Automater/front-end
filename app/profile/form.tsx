'use client'

import * as React from "react"
import { useState, useEffect, FormEvent } from 'react';

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

import { useDispatch, useSelector } from "react-redux"
import { API_CONSTANTS } from "@/APIConstants"
import { setUserCookie } from "@/components/cookies"
import { setUser } from "@/lib/features/user/userSlice"
import router from "next/router"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import { RootState } from "@/lib/store";

export function ProfileForm() {
    const [username, setUsername] = useState('')
    const [licenseno, setLicenseno] = useState('')
    const [paymentPlan, setPaymentPlan] = useState(false)
    const [userId, setUserId] = useState(0)
    const dispatch = useDispatch();
    let userData = useSelector((state:RootState) => state.user.user);
    console.log(userData);

	useEffect(() => {
        console.log(userData)
        setUsername(userData?.username || '');
        setLicenseno(userData?.licenseno || '');
        setPaymentPlan(userData?.autopayment || false);
        setUserId(userData?.id || 0);
	}, [])

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        let profileURL = 'https://ui-avatars.com/api/?name=' + username;

        let url = API_CONSTANTS.USER_API + '/' + userId;

        try {
            const res = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify({
                    username: username,
                    licence: licenseno,
                    profile_url: profileURL,
                    payment_plan: paymentPlan
                    
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let response = await res.json();
            if (response.status == 'success') {
                setUserCookie(response.data.username, response.data.licence);
                dispatch(setUser({
                    username: response.data.username, licenseno: response.data.licence,
                    autopayment: response.data.payment_plan, profileURL: response.data.profile_url,
                    id: response.data.id
                }));
                toast.success("Profile Updated Successfully");
            } else {
                toast.error(response.message)
            }
        } catch (error: any) {
            toast.error(error?.message)
        }
    }

    return (
        <Card className="w-[50vw]">
            <CardHeader>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>Edit your Profile Details here</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-row space-y-1.5 gap-20 items-center justify-center">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                className="w-full"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                id="username"
                                type="username"
                                maxLength={20}
                            />
                        </div>
                        <div className="flex flex-row space-y-1.5 gap-16 items-center justify-center">
                            <Label htmlFor="licenseno">License Number</Label>
                            <Input
                                className="w-full"
                                required
                                value={licenseno}
                                onChange={(e) => setLicenseno(e.target.value)}
                                id="licenseno"
                                type="licenseno"
                                maxLength={5}
                                disabled
                            />
                        </div>
                        <div className="flex flex-row space-y-1.5 gap-6 items-center">
                            <Label htmlFor="paymentPlan" className="pt-1">Auto Payment Plan</Label>
                            <Checkbox id="paymentPlan" checked={paymentPlan}
                                onCheckedChange={(checked: boolean) => setPaymentPlan(checked)} />
                        </div>
                    </div>
                    <div className="w-full pt-6">
                        <Button>
                            Update
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
