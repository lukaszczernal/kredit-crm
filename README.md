# KreditCrm

Project contains CRU for customers (no posibility to delete one).

## Set up

1. npm install
2. ng serve

## Authentication
I did not implement a login page although an authorization verification exists. If your authorization token expirs the you will be redirected to /login page (empty one)

In order to authenticate properly you need edit customer.service.ts file (line 27) and update token there.
