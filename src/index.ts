export function set(key, data){
    return new Promise((resolve, reject) => {
        window.localStorage.setItem(key, JSON.stringify(data));
        resolve();
    });
}

export function get(key){
    return new Promise((resolve, reject) => {
        let item = window.localStorage.getItem(key);
        if (item == null) {
            resolve(null);
        } else {
            try {
                let jd = JSON.parse(item);
                resolve(jd);
            } catch (e) {
                resolve(item);
            }
        }
    });
}

export function watch(conf) {
    const onStorage = () => {
        let item = window.localStorage.getItem(conf.key);
        if (item == null) {
            conf.onChange(null);
        } else {
            try {
                let jd = JSON.parse(item);
                conf.onChange(jd);
            } catch (e) {
                conf.onChange(item);
            }
        }
    };

    if(conf.onInit){
        onStorage();
    }

    let value = window.localStorage.getItem(conf.key);

    setInterval(() => {
        let currentValue = window.localStorage.getItem(conf.key);

        if (value != currentValue) {
            value = currentValue;

            onStorage();
        }
    }, 1);
}