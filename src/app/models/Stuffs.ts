export interface Stuff {
    _id: string | undefined;
    title: string| undefined;
    description: string | undefined;
    imageUrl: string | undefined;
    price: number | undefined;
    email:  string| undefined;
    
}

export class MyStuff{
    _id: string | undefined;
    title: string| undefined;
    description: string | undefined;
    imageUrl: string | undefined;
    price: number | undefined;
    email:  string| undefined;
}

export interface NewStuff {
    title: string | undefined;
    imageUrl: string | undefined;
    price: number | undefined;
    description: string | undefined;
    email:  string| undefined;
    
}
