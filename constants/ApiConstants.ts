const HETZNER_BASE_URL = "https://iot.nielstesting.nl/";
const HETZNER_OCR_URL = "http://138.199.217.16/ocr/";

export const API_CONSTANTS: any = {
    LOGIN: HETZNER_BASE_URL + "us/api/login",
    VERIFY_USER: HETZNER_BASE_URL + "us/api/verify",
    REGISTER: HETZNER_BASE_URL + "us/api/register",
    GET_USER_DETAILS: HETZNER_BASE_URL + "us/api/users/",
    UPDATE_USER: HETZNER_BASE_URL + "us/api/users/update/",
    PAYMENT: HETZNER_BASE_URL + "ps/api/v1/payments",
    GET_HISTORY: HETZNER_BASE_URL + "ps/api/v1/history?plate_number=",
    GET_HISTORY_ALL: HETZNER_BASE_URL + "ps/api/v1/history/all/",
    GET_PARKING_SPOT_STATUS: HETZNER_BASE_URL + "pt/parking",
    HETZNER_OCR_URL: HETZNER_OCR_URL
};


