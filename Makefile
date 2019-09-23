install:
	sudo npm link

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

watchAll:
	npm run watchAll	

lint:
	npx eslint .

local:
	npm publish --dry-run

.PHONY: test
