async function httpGet(url, pageNr) {
    const newUrl = `${url}&page=${pageNr}`;
    let items = await fetch(newUrl).then(resp => resp.json())
        .then(result => {
            return result.results || [];
        });
    return items;
}

export { httpGet };