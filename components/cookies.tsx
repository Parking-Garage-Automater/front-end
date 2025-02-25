import { setCookie, destroyCookie, parseCookies } from "nookies";
import { redirect } from 'next/navigation'

export const setUserCookie = (username: string, license: string) => {
    setCookie(null, "user_info", `${username}|${license}`, {
        path: "/",
        sameSite: "lax",
    });
};

export const getUserCookie = () => {
    const cookies = parseCookies();
    if (cookies.user_info) {
        const [username, license] = cookies.user_info.split("|"); // Split back into strings
        return { username, license };
    } 
        return null;
};

// Remove user session
export const removeUserCookie = () => {
    destroyCookie(null, "user_info");
};