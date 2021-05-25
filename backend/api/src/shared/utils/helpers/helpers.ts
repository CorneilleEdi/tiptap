import * as nanoid from 'nanoid';

export class Helpers {
    static alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    static referenceAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    static numbers = '0123456789';

    // Check if array is empty by looking at his length
    static isEmpty(array: any): boolean {
        return !(array.length > 0);
    }

    // Check is array is empty istring only

    static isEmptyStringArray(array: any[]): boolean {
        if (Helpers.isEmpty(array)) {
            return true;
        } else {
            return Helpers.isEmpty(array.filter((element) => element));
        }
    }

    // Get name from email
    static getNameFromEmail = (email: string) => email.split('@')[0];

    // Generate a id
    static generateUid = () => nanoid.customAlphabet(Helpers.alphabet, 22)();
    static generateReference = (size = 4) =>
        nanoid.customAlphabet(Helpers.referenceAlphabet, size)();

    static generateNumber = (size = 8) => nanoid.customAlphabet(Helpers.numbers, size)();
    static generateString = (size = 8) => nanoid.customAlphabet(Helpers.alphabet, size)();
}
