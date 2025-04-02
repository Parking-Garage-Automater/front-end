self.onmessage = async (event) => {
    const { apiUrl } = event.data;

    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl,
                {
                    method: 'GET',
                });
            const result = await response.json();
            self.postMessage(result);
        } catch (error) {
            console.error("Worker fetch error:", error);
        }
    };

    fetchData();
    setInterval(fetchData, 3000);
};
