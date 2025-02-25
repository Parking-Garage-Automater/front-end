'use client'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_CONSTANTS } from '@/APIConstants'
import { toast } from 'sonner'


export const RegisterForm = () => {
    const [username, setUsername] = useState('')
    const [licenseno, setLicenseno] = useState('')
    const [error, setError] = useState<string | null>(null)

    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        let profileURL = 'https://ui-avatars.com/api/?name=' + username;
        let url = API_CONSTANTS.USER_API;

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    licence: licenseno,
                    profile_url: profileURL,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let response = await res.json();
            if (response.status == 'success') {
                toast.success("Registration Successful");
                router.push('/login');
            } else {
                toast.error(response.message)
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
            <div className="grid w-full items-center gap-1.5">
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
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="licenseno">License Number</Label>
                <Input
                    className="w-full"
                    required
                    value={licenseno}
                    onChange={(e) => setLicenseno(e.target.value)}
                    id="licenseno"
                    type="licenseno"
                    maxLength={5}
                />
            </div>
            {error && <Alert>{error}</Alert>}
            <div className="w-full">
                <Button className="w-full" size="lg">
                    Register
                </Button>
            </div>
        </form>
    )
}
