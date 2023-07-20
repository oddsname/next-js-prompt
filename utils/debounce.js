
let debounceStorage = {

};

export const debounce = (callback, delay, key='key') => {
    if(debounceStorage[key]) {
        clearInterval(debounceStorage[key]);
    }

    debounceStorage[key] = setTimeout(()  => callback(), delay);
}