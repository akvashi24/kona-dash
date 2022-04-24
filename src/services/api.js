
import axios from "axios";

const apiURL = "http://localhost:5000/"

const api = axios.create({
    baseURL: apiURL
});

export const logErrors = (error) => {
    try {
        console.log(`--Error: ${error.response.data.error.message}`)
        console.log(`--Error: ${error.response.status}`)
    }
    catch (error) {
        return;
    }
}

export const getBurntoutReport = async () => {
    const query = "api/v1/reports/burntout"
    const results = await api.get(query).catch(error => {
        logErrors(error);
        throw error;
    });
    return results ? results.data : null;
};

export const getUnderengagedReport = async () => {
    const query = "api/v1/reports/underengaged"
    const results = await api.get(query).catch(error => {
        logErrors(error);
        throw error;
    });
    return results ? results.data : null;
};

export const getRYGBreakdownReport = async () => {
    const query = "api/v1/reports/rygbreakdown"
    const results = await api.get(query).catch(error => {
        logErrors(error);
        throw error;
    });
    return results ? results.data : null;
};
