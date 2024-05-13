export class ProspectModel {


    public id: number;
    public name: string;
    public document: string;
    public birth: Date;
    public city: string;
    
    constructor(data: any = {}) {
        if (!data) {
            data = {}
        }

        this.id = data.id;
        this.name = data.name;
        this.document = data.document;
        this.birth = data.birth;
        this.city = data.city;
    }

}