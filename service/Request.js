class Request{
    _base_url = "http://127.0.0.1:5500//data";

    async fetchData(endpoint) {
        try {
            const request = await fetch(`${this._base_url}/${endpoint}`,{
                method : 'get'
            });

            const data =  await request.json();

            return data;

        } catch (error) {
            /* Show error if occured */
            console.error("Fetch Data Error : ", error);
        }
    }
}
