-- Crear secuencia para roles
CREATE SEQUENCE IF NOT EXISTS roles_id_seq START 1;

-- Tabla roles
CREATE TABLE IF NOT EXISTS roles (
    id integer NOT NULL DEFAULT nextval('roles_id_seq'),
    name character varying(255) NOT NULL,
    CONSTRAINT roles_pkey PRIMARY KEY (id)
);

-- Crear secuencia para users
CREATE SEQUENCE IF NOT EXISTS users_id_seq START 1;

-- Tabla users
CREATE TABLE IF NOT EXISTS users (
    id integer NOT NULL DEFAULT nextval('users_id_seq'),
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    rol_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_rol_id_fkey FOREIGN KEY (rol_id)
        REFERENCES roles (id) ON UPDATE CASCADE ON DELETE SET NULL
);

-- Crear secuencia para categories
CREATE SEQUENCE IF NOT EXISTS categories_id_seq START 1;

-- Tabla categories
CREATE TABLE IF NOT EXISTS categories (
    id integer NOT NULL DEFAULT nextval('categories_id_seq'),
    name character varying(255) NOT NULL,
    image character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT categories_pkey PRIMARY KEY (id),
    CONSTRAINT categories_name_key UNIQUE (name)
);

-- Crear secuencia para products
CREATE SEQUENCE IF NOT EXISTS products_id_seq START 1;

-- Tabla products
CREATE TABLE IF NOT EXISTS products (
    id integer NOT NULL DEFAULT nextval('products_id_seq'),
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    stock integer NOT NULL,
    image character varying(255) NOT NULL,
    category_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT products_pkey PRIMARY KEY (id),
    CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id)
        REFERENCES categories (id) ON UPDATE CASCADE ON DELETE SET NULL
);

-- Crear secuencia para orders
CREATE SEQUENCE IF NOT EXISTS orders_id_seq START 1;

-- Tabla orders
CREATE TABLE IF NOT EXISTS orders (
    id integer NOT NULL DEFAULT nextval('orders_id_seq'),
    user_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT orders_pkey PRIMARY KEY (id),
    CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES users (id) ON UPDATE CASCADE ON DELETE SET NULL
);

-- Crear secuencia para order_items
CREATE SEQUENCE IF NOT EXISTS order_items_id_seq START 1;

-- Tabla order_items
CREATE TABLE IF NOT EXISTS order_items (
    id integer NOT NULL DEFAULT nextval('order_items_id_seq'),
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    CONSTRAINT order_items_pkey PRIMARY KEY (id),
    CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id)
        REFERENCES orders (id) ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id)
        REFERENCES products (id) ON UPDATE CASCADE ON DELETE SET NULL
);
