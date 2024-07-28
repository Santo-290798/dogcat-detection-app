import axios from 'axios';

export const DETECT_URL = "/api/detect";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default axios.create({
    baseURL: BASE_URL
});