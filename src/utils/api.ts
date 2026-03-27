const API_URL = import.meta.env.VITE_API_URL || '/api';

export const api = {
  products: {
    getAll: async (params?: Record<string, string>) => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      const res = await fetch(`${API_URL}/products${query}`);
      return res.json();
    },
    getFeatured: async () => {
      const res = await fetch(`${API_URL}/products/featured`);
      return res.json();
    },
    getOffers: async () => {
      const res = await fetch(`${API_URL}/products/offers`);
      return res.json();
    },
    getById: async (id: string) => {
      const res = await fetch(`${API_URL}/products/${id}`);
      return res.json();
    }
  },
  categories: {
    getAll: async () => {
      const res = await fetch(`${API_URL}/categories`);
      return res.json();
    }
  },
  brands: {
    getAll: async () => {
      const res = await fetch(`${API_URL}/brands`);
      return res.json();
    }
  },
  promotions: {
    getAll: async () => {
      const res = await fetch(`${API_URL}/promotions`);
      return res.json();
    },
    validate: async (code: string, total: number) => {
      const res = await fetch(`${API_URL}/promotions/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, total })
      });
      return res.json();
    }
  },
  users: {
    login: async (email: string, password: string) => {
      const res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return res.json();
    },
    register: async (data: { email: string; password: string; name: string; phone: string }) => {
      const res = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return res.json();
    }
  },
  orders: {
    create: async (data: { userId: string; items: any[]; total: number; shippingAddress: any; paymentMethod: string }) => {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return res.json();
    },
    getByUser: async (userId: string) => {
      const res = await fetch(`${API_URL}/orders?userId=${userId}`);
      return res.json();
    }
  }
};
