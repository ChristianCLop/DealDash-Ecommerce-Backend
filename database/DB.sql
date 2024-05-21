-- Table: public.Usuarios

-- DROP TABLE IF EXISTS public."Usuarios";

CREATE TABLE IF NOT EXISTS public."Usuarios"
(
    id_usu serial NOT NULL,
    ced_usu character varying(10) COLLATE pg_catalog."default" NOT NULL,
    nom_usu character varying(30) COLLATE pg_catalog."default" NOT NULL,
    ape_usu character varying(30) COLLATE pg_catalog."default" NOT NULL,
    cor_usu character varying(30) COLLATE pg_catalog."default" NOT NULL,
    cel_usu character varying(10) COLLATE pg_catalog."default" NOT NULL,
    ima_usu character varying(255) COLLATE pg_catalog."default" NOT NULL,
    con_usu character varying(30) COLLATE pg_catalog."default" NOT NULL,
    conf_con_usu character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Usuarios_pkey" PRIMARY KEY (id_usu),
    CONSTRAINT ced_usu UNIQUE (ced_usu),
    CONSTRAINT cel_usu UNIQUE (cel_usu),
    CONSTRAINT cor_usu UNIQUE (cor_usu)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Usuarios"
    OWNER to postgres;


-- Table: public.Productos

-- DROP TABLE IF EXISTS public."Productos";

CREATE TABLE IF NOT EXISTS public."Productos"
(
    id_pro serial NOT NULL,
    id_usu integer NOT NULL,
    cat_pro character varying(30) COLLATE pg_catalog."default" NOT NULL,
    nom_pro character varying(20) COLLATE pg_catalog."default" NOT NULL,
    des_pro character varying(35) COLLATE pg_catalog."default" NOT NULL,
    ima_pro character varying(255) COLLATE pg_catalog."default" NOT NULL,
    sto_pro integer NOT NULL,
    cos_pro numeric(10,2) NOT NULL,
    desc_pro numeric(10,2) NOT NULL,
    cos_fin_pro numeric(10,2) NOT NULL,
    cal_pro integer NOT NULL,
    CONSTRAINT "Productos_pkey" PRIMARY KEY (id_pro),
    CONSTRAINT id_usu FOREIGN KEY (id_usu)
        REFERENCES public."Usuarios" (id_usu) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Productos"
    OWNER to postgres;


-- Table: public.Pedido

-- DROP TABLE IF EXISTS public."Pedido";

CREATE TABLE IF NOT EXISTS public."Pedido"
(
    id_ped serial NOT NULL,
    id_pro integer NOT NULL,
    id_usu integer NOT NULL,
    est_ped character varying(35) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Pedido_pkey" PRIMARY KEY (id_ped),
    CONSTRAINT id_pro FOREIGN KEY (id_pro)
        REFERENCES public."Productos" (id_pro) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT id_usu FOREIGN KEY (id_usu)
        REFERENCES public."Usuarios" (id_usu) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Pedido"
    OWNER to postgres;