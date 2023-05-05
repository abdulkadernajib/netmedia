export class Customer {

    businessName: String;
    contactPerson: String;
    phone: String;
    phone2: String;
    email: String;
    address: {
        address: String;
        city: String;
        state: String;
        pinCode: Number
    };
    compliance: {
        gstNo: String;
        gstType: String;
        panNo: String;
    };
    bankDetails: {
        accountNo: Number;
        bankName: String;
        ifsc: String;
        branch: String;
    };
    closingBalance: number = null


}

