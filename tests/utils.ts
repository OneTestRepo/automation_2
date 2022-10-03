export class Utils {
    static checkBrandInResponce(data: Array<any>, brand: string) {
        for (const item of data) {
            if (item.brand != brand) {
                return false;
            }
        }
        return true;
    }
}