import { API_CONSTANTS } from "@/APIConstants";

export const fetchUser = async (username: string, license: string) => {
    let url = API_CONSTANTS.USER_API + '/' + username + '/' + license;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let response = await res.json();
    return response;
}