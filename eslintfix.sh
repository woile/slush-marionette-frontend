eslint -c .eslintrc.json $(find . -type f -name '*.js' ! -path './node_modules/*') --fix  --no-ignore
