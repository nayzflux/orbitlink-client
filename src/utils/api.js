import axios from "axios";

const API_URL = 'http://localhost:5000/api'

/**
 * Create link
 */
export const createLink = async (link) => {
    try {
        const response = await axios.post(`${API_URL}/links`, link, {withCredentials: true});
        console.log('Link created!')
        return response?.data;
    } catch (e) {
        console.log('Failed to create link!')

        if (e?.response?.status) {
            throw new Error(e.response.data?.message);
        }

        throw new Error('Unknown error');
    }
}

/**
 * Read link
 */
export const fetchLink = async (_id) => {
    try {
        const response = await axios.get(`${API_URL}/links/${_id}`, {withCredentials: true});
        console.log('Link fetched!')
        return response?.data;
    } catch (e) {
        console.log('Failed to fetched link!')

        if (e?.response?.status) {
            throw new Error(e?.response?.status);
        }

        throw new Error('Unknown error');
    }
}

/**
 * Read all links
 */
export const fetchAllLinks = async () => {
    try {
        const response = await axios.get(`${API_URL}/links`, {withCredentials: true});
        console.log('All links fetched!')
        return response?.data;
    } catch (e) {
        console.log('Failed to fetched all links!')

        if (e?.response?.status) {
            throw new Error(e?.response?.status);
        }

        throw new Error('Unknown error');
    }
}

/**
 * Update link
 */
export const updateLink = async (_id, link) => {
    try {
        const response = await axios.patch(`${API_URL}/links/${_id}`, link, {withCredentials: true});
        console.log('Link fetched!')
        return response?.data;
    } catch (e) {
        console.log('Failed to fetched link!')

        if (e?.response?.status) {
            throw new Error(e?.response?.status);
        }

        throw new Error('Unknown error');
    }
}

/**
 * Delete link
 */
export const deleteLink = async (_id) => {
    try {
        const response = await axios.delete(`${API_URL}/links/${_id}`, {withCredentials: true});
        console.log('Link fetched!')
        return response?.data;
    } catch (e) {
        console.log('Failed to fetched link!')

        if (e?.response?.status) {
            throw new Error(e?.response?.status);
        }

        throw new Error('Unknown error');
    }
}

/**
 * Auth | Sign In
 */
export const signIn = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {email, password}, {withCredentials: true});
        console.log('Signed in!')
        return response?.data;
    } catch (e) {
        console.log('Failed to sign in!')

        if (e?.response) {
            throw e.response;
        }
    }
}

/**
 * Auth | Sign Up
 */
export const signUp = async (email, password, username) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, {email, password, username}, {withCredentials: true});
        console.log('Signed up!')
        return response?.data;
    } catch (e) {
        console.log('Failed to sign up!')

        if (e?.response) {
            throw e.response;
        }
    }
}

/**
 * Get User
 */

export const fetchUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}`, {withCredentials: true});
        console.log('Fetch user!')
        return response?.data;
    } catch (e) {
        console.log('Failed to fetch user!')

        if (e?.response) {
            throw e.response;
        }
    }
}

/**
 * Lgout
 */

export const logout = async () => {
    try {
        const response = await axios.post(`${API_URL}/auth/logout`,  {},{withCredentials: true});
        console.log('Logout!')
        return response?.data;
    } catch (e) {
        console.log('Failed to logout!')

        if (e?.response) {
            throw e.response;
        }
    }
}
