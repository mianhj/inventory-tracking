This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# LOCAL SETUP

1. In root directory of the project run `npm i`;
2. create a `.env` file in the root of project and copy contents from .ennv.example
3. replace the values of the variables according to your setup

Then, run the development server:

npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project info

1. click on the products link in the top navbar to see the product listing.

2. you can search the product by typing out the name in the search box above the table on the product listing page.

3. To create, update or delete a product you need first to login

   - click on the login button on top left.
   - enter email "john@example.com"
   - enter password "abcd1234"
   - click Login button

4. To add a new product click on the add button on the product listing page.

   - in the image input enter an image url for you product and you'll see that image apear on the page.
   - fill out the information about the product.
   - click submit and a new product will be created.

5. To Update a product simply click on the black edit button in the product listing table

   - an update product page will appear
   - change the info you desire to chanage
   - click submit and the product will be updated.

6. To Update the Stock of a product, go to the update product page of that specific product.
   - change the number of stock and you'll see an input apear
   - enter the reason for updating the stock then press submit.
   - the stock will be updated and you'll see the stock change history appear immediately on the right section of the edit page.
