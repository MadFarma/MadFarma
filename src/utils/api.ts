import { products as localProducts, categories, brands as localBrands, type Product } from '../context/AppContext';

export interface ApiResponse<T> {
  data: T | null;
  error?: string;
}

export const api = {
  products: {
    getAll: async (params?: Record<string, string>): Promise<ApiResponse<Product[]>> => {
      let filtered = [...localProducts];
      
      if (params?.search) {
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(params.search!.toLowerCase()) ||
          p.brand.toLowerCase().includes(params.search!.toLowerCase())
        );
      }
      if (params?.category && params.category !== 'all') {
        filtered = filtered.filter(p => p.category === params.category);
      }
      if (params?.subcategory && params.subcategory !== 'all') {
        filtered = filtered.filter(p => p.subcategory === params.subcategory);
      }
      if (params?.sort === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (params?.sort === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (params?.sort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      }

      return { data: filtered };
    },

    getFeatured: async (): Promise<ApiResponse<Product[]>> => {
      const featured = localProducts.filter(p => p.badge === 'bestseller' || p.badge === 'new').slice(0, 8);
      return { data: featured };
    },

    getOffers: async (): Promise<ApiResponse<Product[]>> => {
      const offers = localProducts.filter(p => p.badge === 'sale' || p.badge === '2x1' || !!p.originalPrice).slice(0, 8);
      return { data: offers };
    },

    getById: async (id: string): Promise<ApiResponse<Product | null>> => {
      const product = localProducts.find(p => p.id === Number(id));
      return { data: product || null };
    },
  },

  categories: {
    getAll: async () => {
      return { data: categories };
    },
  },

  brands: {
    getAll: async () => {
      return { data: localBrands };
    },
  },

  orders: {
    create: async (data: {
      userId: string;
      items: Array<{ id: number; price: number; quantity: number }>;
      total: number;
      shippingAddress: Record<string, unknown>;
      paymentMethod: string;
    }) => {
      const orderId = `ORD-${Date.now()}`;
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const newOrder = {
        id: orderId,
        userId: data.userId,
        items: data.items,
        subtotal: data.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        shipping: 0,
        total: data.total,
        status: 'pending',
        date: new Date().toISOString(),
        paymentMethod: data.paymentMethod,
        shippingAddress: data.shippingAddress,
      };
      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));
      return { data: newOrder };
    },

    getByUser: async (userId: string) => {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const userOrders = orders.filter((o: { userId: string }) => o.userId === userId);
      return { data: userOrders };
    },
  },
  
  checkout: {
    createSession: async (data: {
      items: unknown[];
      userId: string;
      shippingAddress: unknown;
      success_url: string;
      cancel_url: string;
    }) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/checkout/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Error creating checkout session');
      return res.json();
    }
  }
};
