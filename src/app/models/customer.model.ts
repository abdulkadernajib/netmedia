export class Customer {

    _id?: string
    businessName: string;
    contactPerson: string;
    phone: string;
    phone2: string;
    email: string;
    address: {
        address: string;
        city: string;
        state: string;
        pinCode: number
    };
    compliance: {
        gstNo: string;
        gstType: string;
        panNo: string;
    };
    bankDetails: {
        accountNo: number;
        bankName: string;
        ifsc: string;
        branch: string;
    };
    closingBalance: number = null
    createdOn?: string;
    updatedOn?: string;


}

