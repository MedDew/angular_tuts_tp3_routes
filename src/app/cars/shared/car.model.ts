export class Car
{
    private id: number;
    private nbSeats: number;
    private price: number;
    private weight: number;
    private brand: string;
    private model: string;
    private horsePower: number;

    constructor()
    constructor(id : number, nbSeats : number, price : number, weight : number, brand : string, model : string, horsePower :number)
    constructor(id?: number, nbSeats?: number, price?: number, weight?: number, brand?: string, model?: string, horsePower?:number)
    {
        this.id = id;
        this.nbSeats = nbSeats;
        this.price = price;
        this.weight = weight;
        this.brand = brand;
        this.model = model;
        this.horsePower = horsePower;
    }

    public getId() : number
    {
        return this.id;
    }
    
    public setId(id : number) : void
    {
        this.id = id;
    }
    
    public getNbSeats() : number
    {
        return this.nbSeats;
    }
    
    public setNbSeats(nbSeats : number) : void
    {
        this.nbSeats = nbSeats;
    }
    
    public getPrice() : number
    {
        return this.price;
    }
    
    public setPrice(price : number) : void
    {
        this.price = price;
    }
    
    public getWeight() : number
    {
        return this.weight;
    }
    
    public setWeight(weight : number) : void
    {
        this.weight = weight;
    }
    
    public getBrand() : string
    {
        return this.brand;
    }
    
    public setBrand(brand : string) : void
    {
        this.brand = brand;
    }
    
    public getModel() : string
    {
        return this.model;
    }
    
    public setModel(model : string) : void
    {
        this.model = model;
    }
    
    public getHorsePower() : number
    {
        return this.horsePower;
    }
    
    public setHorsePower(horsePower : number) : void
    {
        this.horsePower = horsePower;
    }
}