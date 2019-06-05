export const fetchJson = (url) => {
    return fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log('received: ', json); // eslint-disable-line no-console
            return json;
        })
        .catch((e) => {
            console.error('Error loading feature geojson', e); // eslint-disable-line no-console
        });
};
