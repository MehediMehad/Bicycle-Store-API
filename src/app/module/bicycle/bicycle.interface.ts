export type TBicycle = {
    name: string;
    brand:
        | 'Giant'
        | 'Trek'
        | 'Specialized'
        | 'Cannondale'
        | 'Scott'
        | 'Bianchi'
        | 'Merida'
        | 'Duranta'
        | 'Veloce'
        | 'Prince'
        | 'Phoenix'
        | 'Hero'
        | 'Atlas'
        | 'Avon';
    price: number;
    type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
    color: 'Red' | 'Blue' | 'Black' | 'White' | 'Green' | 'Yellow' | 'Gray';
    description: string;
    image?: string;
    quantity: number;
    inStock: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};
