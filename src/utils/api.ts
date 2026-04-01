import { supabase } from '../lib/supabase';

export const api = {
  products: {
    getAll: async (params?: Record<string, string>) => {
      let query = supabase
        .from('products')
        .select('*');

      if (params?.category) {
        query = query.eq('category_id', params.category);
      }
      if (params?.subcategory) {
        query = query.eq('subcategory_id', params.subcategory);
      }
      if (params?.search) {
        query = query.ilike('name', `%${params.search}%`);
      }
      if (params?.sort === 'price-asc') {
        query = query.order('price', { ascending: true });
      } else if (params?.sort === 'price-desc') {
        query = query.order('price', { ascending: false });
      } else if (params?.sort === 'rating') {
        query = query.order('rating', { ascending: false });
      } else if (params?.sort === 'reviews') {
        query = query.order('reviews_count', { ascending: false });
      } else {
        query = query.order('id', { ascending: true });
      }

      const { data, error } = await query;
      if (error) throw error;

      return { data: data?.map(mapProduct) ?? [] };
    },

    getFeatured: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .in('badge', ['bestseller', 'new'])
        .limit(8);
      if (error) throw error;
      return { data: data?.map(mapProduct) ?? [] };
    },

    getOffers: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .in('badge', ['sale', '2x1'])
        .not('original_price', 'is', null)
        .limit(8);
      if (error) throw error;
      return { data: data?.map(mapProduct) ?? [] };
    },

    getById: async (id: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return { data: mapProduct(data) };
    },
  },

  categories: {
    getAll: async () => {
      const { data: cats, error: catError } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (catError) throw catError;

      const { data: subs, error: subError } = await supabase
        .from('subcategories')
        .select('*');
      if (subError) throw subError;

      const result = cats?.map(cat => ({
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        subcategories: subs
          ?.filter(s => s.category_id === cat.id)
          .map(s => ({ id: s.id, name: s.name })) ?? [],
      })) ?? [];

      return { data: result };
    },
  },

  brands: {
    getAll: async () => {
      const { data, error } = await supabase.from('brands').select('*');
      if (error) throw error;
      return { data };
    },
  },

  orders: {
    create: async (data: {
      userId: string;
      items: any[];
      total: number;
      shippingAddress: any;
      paymentMethod: string;
    }) => {
      const orderId = `ORD-${Date.now()}`;
      const subtotal = data.items.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      );
      const shipping = subtotal >= 35 ? 0 : 7.9;

      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          id: orderId,
          user_id: data.userId,
          subtotal,
          shipping,
          total: data.total,
          payment_method: data.paymentMethod,
          shipping_address: data.shippingAddress,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;

      const orderItems = data.items.map((item: any) => ({
        order_id: orderId,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      if (itemsError) throw itemsError;

      return { data: order };
    },

    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return { data };
    },
  },
};

// Mapea nombres de columnas de Supabase (snake_case) al formato del frontend (camelCase)
function mapProduct(p: any) {
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.original_price,
    category: p.category_id,
    subcategory: p.subcategory_id,
    brand: p.brand,
    image: p.image,
    badge: p.badge,
    description: p.description,
    descriptionFull: p.description_full,
    points: p.points,
    inStock: p.in_stock,
    stockCount: p.stock_count,
    rating: p.rating,
    reviews: p.reviews_count,
    features: p.features,
    composition: p.composition,
    howToUse: p.how_to_use,
    ageGroup: p.age_group,
    skinType: p.skin_type,
  };
}
