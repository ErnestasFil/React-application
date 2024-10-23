export default class FetchData {
    async get(url) {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(`${apiUrl}/${url}`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
