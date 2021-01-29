declare namespace RNStorage {

    /**
     * Sets item in storage with key
     * @param {string} key - Storage key
     * @param data - Data to store
     * @returns resolves promise when item was set
     */

    export function set(key: string, data: Object): Promise<void>;

    /**
     * Returns 'key' change in storage
     * @param {string} key - Storage key
     * @returns Promise that returns storage content of `key`. If it doesn't exists it'll return null
     */

    export function get(key: string): Promise<any>;

    /**
     * Watches 'key' change in storage
     * @param {string} conf.key - Storage key
     * @param {string} conf.onChange - Callback when change detected
     * @param {string} conf.error - Error callback
     * @param {string} [conf.onInit] - Fire callback when watch is initiated
     */

    export function watch(conf: {
        key: string,
        onChange: Function,
        error: Function,
        onInit?: boolean
    }): void;
}