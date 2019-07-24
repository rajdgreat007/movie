# Setup instructions

Copy the 'gifted' folder to local machine.

Navigate to 'gifted' folder - `cd gifted`

Run dev server - `npm start`

Navigate to [`http://localhost:3000`](http://localhost:3000) to view the running application

See code coverage - `npm test -- --coverage --watchAll=false`

# Overview of React components created

The project contains following components :

## Home Component

It is responsible for rendering the landing page (Home Page) which has a logo & search box.

## Search Component

While on home page when user enters query in serch box and hits enter, Search page opens up which is powered by Search Component.

It has logo, searchbox & grid of gif images.

In first hit it will load 20 images (which can be configured).

Scroll Pagination - As user scrolls to the bottom of page, it again fetches next 20 images and so on.

## Gif Component

It is responsible for rendering the grid of images on search page.

Gif images are paused by default and it displays the control to play the gif.

## SearchBar Component

It is responsible for rendering search box on Home & Search pages. It can be controlled using keyboard/mouse.

# Any extra works that you made and why it is important.

## Responsive for all screens

## Spinner while the page is loading

for improved user experience

## Scroll Pagination

helps user to effortlessly see content just by scrolling and without clicking any button

## Accessibility

user can navigate with keyboard

## Test Coverage

More than 80%
