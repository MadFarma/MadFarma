-- Run this in Supabase SQL Editor

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  subcategories JSONB
);

-- Brands table
CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  image TEXT,
  category TEXT,
  subcategory TEXT,
  brand TEXT,
  rating NUMERIC,
  reviews INTEGER,
  stock INTEGER,
  badge TEXT,
  featured BOOLEAN DEFAULT false
);

-- Disable RLS for testing (or configure policies)
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE brands DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Insert data
INSERT INTO categories (id, name, icon, subcategories) VALUES
('bebe-mama', 'Bebé y Mama', '👶', '[{"id":"alimentacion","name":"Alimentación del Bebé"},{"id":"cuidado-bebe","name":"Cuidado del Bebé"},{"id":"higiene-bebe","name":"Higiene Bebé"},{"id":"juguetes","name":"Juguetes"},{"id":"lactancia","name":"Lactancia"}]'),
('cosmetica-belleza', 'Cosmética y Belleza', '💄', '[{"id":"facial","name":"Cuidado Facial"},{"id":"corporal","name":"Cuidado Corporal"},{"id":"cabello","name":"Cabello"},{"id":"manos-unas","name":"Manos y Uñas"},{"id":"perfumes","name":"Perfumes"}]'),
('higiene', 'Higiene', '🧴', '[{"id":"bucal","name":"Higiene Bucal"},{"id":"corporal","name":"Higiene Corporal"},{"id":"intima","name":"Higiene Íntima"}]'),
('dietetica-nutricion', 'Dietética y Nutrición', '💊', '[{"id":"vitaminas","name":"Vitaminas"},{"id":"suplementos","name":"Suplementos"},{"id":"adelgazar","name":"Adelgazar"},{"id":"deportistas","name":"Deportistas"}]'),
('salud-sexual', 'Salud Sexual', '💑', '[{"id":"anticonceptivos","name":"Anticonceptivos"},{"id":"lubricantes","name":"Lubricantes"},{"id":"test-embarazo","name":"Test de Embarazo"}]')
ON CONFLICT (id) DO NOTHING;

INSERT INTO brands (id, name) VALUES
('1', 'La Roche-Posay'), ('2', 'Vichy'), ('3', 'CeraVe'), ('4', 'Bioderma'),
('5', 'Neutrogena'), ('6', 'Nivea'), ('7', 'Listerine'), ('8', 'Colgate'),
('9', 'Aquilea'), ('10', 'Arkopharma')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, description, price, original_price, image, category, subcategory, brand, rating, reviews, stock, badge, featured) VALUES
('1', 'La Roche-Posay Anthelios SPF50+', 'Protector solar facial FPS 50+', 24.90, 29.90, 'https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=500', 'cosmetica-belleza', 'facial', 'La Roche-Posay', 4.8, 2456, 50, 'sale', true),
('2', 'Vichy Mineral 89', 'Sérum hidratante ácido hialurónico', 19.50, NULL, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500', 'cosmetica-belleza', 'facial', 'Vichy', 4.7, 1823, 35, NULL, true),
('3', 'CeraVe Limpiadora Hidratante', 'Limpiadora con ceramidas', 12.95, 15.95, 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500', 'cosmetica-belleza', 'facial', 'CeraVe', 4.9, 3421, 80, 'sale', true),
('4', 'Bioderma Atoderm Intensive', 'Bálsamo emoliente piel atópica', 16.90, NULL, 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=500', 'cosmetica-belleza', 'corporal', 'Bioderma', 4.6, 987, 45, NULL, false),
('5', 'Listerine Colgate Total', 'Colutorio dental con flúor', 6.95, 8.50, 'https://images.unsplash.com/photo-1559594861-c66710ae4c3c?w=500', 'higiene', 'bucal', 'Listerine', 4.5, 2156, 120, 'sale', true),
('6', 'Colgate Sensitive Plus', 'Pasta dental dientes sensibles', 4.50, NULL, 'https://images.unsplash.com/photo-1559594861-c66710ae4c3c?w=500', 'higiene', 'bucal', 'Colgate', 4.4, 1876, 200, NULL, false),
('7', 'Aquilea Sueño Gummies', 'Complemento melatonina y valeriana', 14.90, 17.90, 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500', 'dietetica-nutricion', 'vitaminas', 'Aquilea', 4.3, 543, 60, 'sale', true),
('8', 'Arkopharma Arkocápsulas', 'Complemento a base de plantas', 11.50, NULL, 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500', 'dietetica-nutricion', 'suplementos', 'Arkopharma', 4.2, 321, 40, NULL, false),
('9', 'Nivea Body Lotion', 'Loción corporal hidratante', 8.90, NULL, 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=500', 'cosmetica-belleza', 'corporal', 'Nivea', 4.5, 2341, 90, NULL, false),
('10', 'La Roche-Posay Cicaplast', 'Bálsamo reparador', 9.90, 12.50, 'https://images.unsplash.com/photo-1556228448-59930c2df24a?w=500', 'cosmetica-belleza', 'facial', 'La Roche-Posay', 4.7, 1567, 55, 'sale', true),
('11', 'Leche Infantil', 'Leche continuación 6-12 meses', 18.90, NULL, 'https://images.unsplash.com/photo-1555252333-978fe3c7e824?w=500', 'bebe-mama', 'alimentacion', 'Nutribén', 4.6, 234, 30, NULL, false),
('12', 'Chupete Ortodóncico', 'Chupete silicona bebés', 5.90, 7.90, 'https://images.unsplash.com/photo-1555252333-978fe3c7e824?w=500', 'bebe-mama', 'higiene-bebe', 'Suavinex', 4.4, 567, 75, 'sale', false),
('13', 'Preservativos Durex', 'Caja 12 preservativos', 9.50, 12.90, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500', 'salud-sexual', 'anticonceptivos', 'Durex', 4.5, 3456, 150, 'sale', true),
('14', 'Test de Embarazo Clearblue', 'Test embarazo digital', 14.90, NULL, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500', 'salud-sexual', 'test-embarazo', 'Clearblue', 4.7, 2134, 40, NULL, true),
('15', 'Gel Íntimo Isdin', 'Gel higiene íntima', 8.90, NULL, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500', 'higiene', 'intima', 'Isdin', 4.6, 876, 65, NULL, false)
ON CONFLICT (id) DO NOTHING;

SELECT 'Done!' as result;