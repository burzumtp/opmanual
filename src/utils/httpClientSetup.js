import axios from "axios";
import GlobalURL from "./global"
// import { useAuth } from "../context/AuthContext";
 
const loginData = localStorage.getItem('token');
const token = loginData ? loginData : null;
let localhttpclient = axios.create({
    baseURL :GlobalURL[0].url,
    headers:{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
 Authorization: 'Bearer ' + token,
    }
});

let livehttpclient = axios.create({
    baseURL:GlobalURL[0].url,
    headers:{
      "Access-Control-Allow-Origin": "*",  
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
     
     Authorization: 'Bearer ' + token,
    }
})

export const httpClient = window.location.hostname === "localhost"? localhttpclient:livehttpclient;