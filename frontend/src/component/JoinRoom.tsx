import React from 'react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'

const JoinRoom = () => {
    return (
        <div>
            <InputOTP maxLength={6}>
            <InputOTPGroup className='flex gap-4 [&>[data-slot=input-otp-slot]]:rounded '>
                <InputOTPSlot index={0} className=''/>
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
            </InputOTPGroup>
            </InputOTP>
        </div>
    )
}

export default JoinRoom