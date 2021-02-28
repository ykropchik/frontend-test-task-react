
export function getCities(callback) {
    let request = new XMLHttpRequest();
    request.open('GET', `https://www.mocky.io/v2/5b34c0d82f00007400376066?mocky-delay=700ms`);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            callback(JSON.parse(request.responseText).cities);
        } else {
            console.assert('getCities error! Request status:', request.status);
        }
    })
    request.send();
}

export function getFreeDates(cityId, callback) {
    let request = new XMLHttpRequest();
    request.open('GET', `https://www.mocky.io/v2/${cityId}?mocky-delay=700ms`);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            let allDates = JSON.parse(request.responseText).data;
            let result = {};

            Object.keys(allDates).forEach(dateKey => {
                let freeTimes = [];
        
                Object.keys(allDates[dateKey]).forEach(timeKey => {
                    if (allDates[dateKey][timeKey]['is_not_free'] != true) {
                        freeTimes.push(allDates[dateKey][timeKey]);
                    }
                })
        
                if (freeTimes.length !== 0) {
                    result[dateKey] = freeTimes;
                }
        
            })

            callback(result);
        } else {
            console.assert('getDates error! Request status:', request.status);
        }
    })
    request.send();
}