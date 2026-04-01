
-- Crear tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    phone TEXT,
    points INTEGER DEFAULT 100,
    total_points INTEGER DEFAULT 100,
    level TEXT DEFAULT 'Bronce',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS para 'users'
CREATE POLICY "Usuarios pueden ver su propio perfil." ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuarios pueden actualizar su propio perfil." ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Permitir insertar perfil al registrarse." ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Trigger para crear perfil automáticamente al registrarse (opcional, pero recomendado)
-- Lo haremos manual en el código por ahora para controlar los datos adicionales como el nombre/teléfono

