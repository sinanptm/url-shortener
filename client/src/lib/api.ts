import { Link } from '@/types';
import axios from 'axios';
"https://url-shortener-w5wt.onrender.com"
const baseUrl = 'http://localhost:8080';

const getToken = () => localStorage.getItem("token");

const getAuthHeaders = () => {
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

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
    const response = await axios.post(`${baseUrl}/link`, { orgLink }, { ...getAuthHeaders() });
    return response.data;
};

export const markLinkClick = async (id: string) => {
    const response = await axios.patch(`${baseUrl}/link`, { id }, { ...getAuthHeaders() });
    return response.data;
};

export const deleteLink = async (id: string) => {
    const response = await axios.delete(`${baseUrl}/link/${id}`, { ...getAuthHeaders() });
    return response.data;
};

export const getUserLinks = async (): Promise<Link[]> => {
    const response = await axios.get(`${baseUrl}/link`, { ...getAuthHeaders() });
    return response.data;
};