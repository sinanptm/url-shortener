import axios from 'axios';

const baseUrl = 'http://localhost:8080';


export const login = async (userName: string, password: string) => {
    const response = await axios.post(`${baseUrl}/auth/login`, {
        password,
        userName
    });
    return response.data;
};

export const register = async (name: string, userName: string, password: string) => {
    const response = await axios.post(`${baseUrl}/auth/register`, {
        name,
        password,
        userName
    });
    return response.data;
};

export const createShortUrl = async (orgLink: string) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${baseUrl}/link`, { orgLink },
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};
