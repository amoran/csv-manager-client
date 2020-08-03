
export const API_BASE = process.env.NODE_ENV === "production" ?
    "https://csv-manager.uc.r.appspot.com/api/v1/" :
    "http://localhost:1337/api/v1/";
