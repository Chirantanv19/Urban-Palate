export interface Category {
    id: string;
    name: string;
    slug: string;
    display_order: number;
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category_id: string;
    image_url: string;
    is_popular: boolean;
    is_available: boolean;
    is_vegetarian: boolean;
    is_spicy: boolean;
    categories?: Category;
}

export interface Reservation {
    id: string;
    customer_name: string;
    email: string;
    phone: string;
    reservation_date: string;
    reservation_time: string;
    guests: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    special_requests?: string;
}