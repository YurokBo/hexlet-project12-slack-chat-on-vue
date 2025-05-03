lint-frontend:
	make -C frontend lint

install:
	npm ci

install-frontend:
	cd frontend && npm ci

start-frontend:
	cd frontend && npm start

start-backend:
	npx start-server -s ./frontend/dist

develop:
	make start-backend & make start-frontend

build:
	rm -rf ./frontend/dist && cd frontend && npm run build

start:
	make start-backend
