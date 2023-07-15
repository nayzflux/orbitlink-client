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

        if (e?.response) {
            throw e.response;
        }

        throw 'Unknown Error';
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

        if (e?.response) {
            throw e.response;
        }

        throw 'Unknown Error';
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

        if (e?.response) {
            throw e.response;
        }

        throw 'Unknown Error';
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

        if (e?.response) {
            throw e.response;
        }

        throw 'Unknown Error';
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

        if (e?.response) {
            throw e.response;
        }

        throw 'Unknown Error';
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

        throw 'Unknown Error';
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

        throw 'Unknown Error';
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

        throw 'Unknown Error';
    }
}

export const updateUser = async (userId, data) => {
    try {
        const response = await axios.patch(`${API_URL}/users/${userId}`, data, {withCredentials: true});
        console.log('Updated user!')
        return response?.data;
    } catch (e) {
        console.log('Failed to update user!')

        if (e?.response) {
            throw e.response;
        }

        throw 'Unknown Error';
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

        throw 'Unknown Error';
    }
}


export const fetchDestinationURL = async (shortURL, password) => {
    try {
        const response = await axios.get(`${API_URL}/${shortURL}`, {headers: {Authorization: password}});
        return response?.data;
    } catch (e) {
        if (e?.response) {
            throw e.response;
        }

        throw "Unknown error";
    }
}

export const getStats = async () => {
    try {
        const response = await axios.get(`${API_URL}/stats`);
        return response?.data;
    } catch (e) {
        if (e?.response) {
            throw e.response;
        }

        throw "Unknown error";
    }
}