import { Brand } from "./brand.model";

export class Model {
    _id?: string;
    brandName: Brand;
    modelName: string;
    color: string;
    countryOfOrigin: string;
    asin: string;
    gstRate: number;
    hsn: string;
    sellingPrice: number;
    createdAt?: string;
    updatedAt?: string;


}
