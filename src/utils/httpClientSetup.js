import axios from "axios";
import GlobalURL from "./global"



let localhttpclient = axios.create({
    baseURL :GlobalURL[0].url,
    headers:{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",

    }
});

let livehttpclient = axios.create({
    baseURL:GlobalURL[0].url,
    headers:{
      "Access-Control-Allow-Origin": "*",  
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    }
})

export const httpClient = window.location.hostname === "localhost"? localhttpclient:livehttpclient;