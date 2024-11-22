export type TBicycle = {
    name: string;
    brand: string;
    price: number;
    type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX';
    description: string;
    quantity: number;
    inStock: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};
