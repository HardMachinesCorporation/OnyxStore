CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"price" integer NOT NULL,
	"description" varchar,
	"category" varchar,
	"brand" varchar,
	"model" varchar,
	"color" varchar,
	"discount" integer,
	"image" varchar
);
