export interface NewCartItem {
    email: string | undefined;
    cartItems: any|undefined
    
}
export class MyCartItem{
    _id: string | undefined;
    email: string | undefined;
    cartItems: any | undefined;
}

export interface CartItem{
    _id: string | undefined;
    email: string | undefined;
    cartItems: any|undefined
}

