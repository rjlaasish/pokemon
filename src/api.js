export const fetchAPI = async (apiToFetch) => {
    const response = await fetch(apiToFetch);
    if (response.status >= 200 && response.status < 300) {
        return await response.json();
    } else {
        const error = new Error(response.statusText || response.status)
        error.response = response;
        return response;
    }
} 