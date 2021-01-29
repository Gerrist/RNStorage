export function set(key: string, data: Object): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        window.localStorage.setItem(key, JSON.stringify(data));
        resolve();
    });
}

export function get(key: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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

/**
 * Assign the project to an employee.
 * @param {string} conf.key - RNStorage key
 * @param {string} conf.onChange - Callback when change detected
 * @param {string} conf.error - Error callback
 * @param {string} [conf.onInit] - Fire callback when watch is initiated
 */

export function watch(conf: {
    key: string,
    onChange: Function,
    error: Function,
    onInit?: boolean
}) {
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

    let value = window.localStorage.getItem(conf.key);

    setInterval(() => {
        let currentValue = window.localStorage.getItem(conf.key);

        if (value != currentValue) {
            value = currentValue;

            onStorage();
        }
    }, 1);
}