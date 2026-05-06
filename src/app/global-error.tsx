'use client';

import '@/styles/pages/_global-error.scss';
import { useEffect, useState } from "react";

export default function GlobalError() {
    const [message, setMessage] = useState('Attempting to start up API')
    const [apiHasError, setApiHasError] = useState< 'polling' | 'ok' | 'critical' >('polling')

    useEffect(() => {
        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
        
        const callAPIHealthCheck = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_ARCADIA_API_URL}util/health-check/`,
                    {
                        method: 'GET'
                    }
                )
                if (res.ok) {
                    return true
                } else {
                    return false
                }
            } catch {
                return false
            }
        }

        const pollAPIStatus = async () => {
            let attempts = 3;
            while (attempts > 0) {
                await delay(10000); 
                const isUp = await callAPIHealthCheck();
                if (isUp) {
                    setApiHasError('ok')
                    await delay(5000)
                    window.location.href = '/'
                    return; 
                } else {
                    attempts -= 1;
                }
            }
            setApiHasError('critical')
            setMessage('Server Unresponsive');
        };

        pollAPIStatus();
    }, []);


    return (
        <html>
            <body>
                <div id='content'>
                    <img id='whoops' src="/pages/error/whoops.png" alt="" />
                    <div id='text'>
                        {
                            apiHasError == 'polling' &&
                                <>
                                    <h1>Something Went Wrong.</h1>
                                    <p>The Arcadia service runs on Koyeb, which implements cold starts.</p>
                                    <p>This can cause the platform to pause due to failed api calls. Read more about cold starts <a href="https://www.koyeb.com/docs/run-and-scale/scale-to-zero#light-sleep-and-deep-sleep-for-cpu" target='_blank'>here</a></p>
                                    <p><b>Current Status:</b> Checking server</p>
                                </>
                        }
                        {
                            apiHasError == 'critical' &&
                                <>
                                    <h1>Something Went Wrong.</h1>
                                    <p>The api hasn't responded after 3 attempts trying to start it up.</p>
                                    <p>This means the server has run into a major error. The team has been notified. Our sincere appologies - The D2X Team</p>
                                </> 
                        }
                        {
                            apiHasError == 'ok' &&
                                <>
                                    <h1>API start up sucessful.</h1>
                                    <p>The api has responded with a ok status!</p>
                                    <p>You will be redirected soon to the Arcadia platform.</p>
                                    <p>Thank you for your patients and enjoy Arcadia - The D2X Team</p>
                                </>
                        }
                    </div>
                </div>
            </body>
        </html>
    )
}