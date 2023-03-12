CREATE TABLE "tasks" (
	"id" serial primary key,
	"task" varchar(220) not null,
	"complete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks" ("task", "complete")
VALUES ('Load the Dishwasher', 'false'), ('Clean Litter Box', 'false'), ('Fold the Laundry', 'false'); 

SELECT * FROM "tasks" ORDER BY "id";

SELECT * FROM "tasks" WHERE id= 1;

UPDATE "tasks" SET "complete" = TRUE 
WHERE "id"= 3