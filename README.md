# 🎸 Albums and Artists CRUD 🎸


This is the front of a code challenge which is connected to a docker server.

![Screenshot albums list](/home/ari/Documents/prueba-kenjo/src/assets/screenshots-readme/IMG-9053.png)

It is a CRUD of albums and artists and then they're connected to each other in album detail, where you can click the artist and navigate to their detail

![Screenshot albums detail](/home/ari/Documents/prueba-kenjo/src/assets/screenshots-readme/detail.jpg)

## 🎧This is what I was asked to do:

- Required: run our API and communicate with it. ✅
- Required: develop an Angular 2+ app that uses our API and can list, show,
create, update and delete music albums. ✅
- Optional: provide the ability to list, show, create, update and delete artists and
allow us to link an album to an artist. If you don’t have time to code this but you
still want to document a solution, that will be welcome. ✅
- Optional: use a CSS framework or design system if you find it useful. **⚠️ Only PrimeNG to the notifications**
- Optional: use the fields that we have for imageUrls to store photos. ✅
- Optional: provide a database dump to us so we can test it with a set of data that
you find useful. ✅
- 1Extra points: **(I tried my best🙃)**
    - Creativity
    - Good code practices
    - Good UX/UI experience
    - Take the most out of the API & database models
    - Take the most out of the Angular framework

## 🤘🏿Implementations
There is a bus notification service which gives a feedback to the user when the actions are done (or not)

The request by id of albums is implemented but not used  to avoid doing unnecesary requests to the server, so when I get all the albums data, its stored in the LocalStorage and then its filtered by id to get the detail. Same with the artists list and its detail, except when you want to go to Artist detail from the album detail, where the get artist by id request its done.

## 🥁 Things I would have like to do if I had more time

- Improve the style of the notification message, but being a third-party library (primeNG), it was more laborious.
- I could develop stores and use them instead of LocalStorage and rendering could have been reactive.
- Responsive design, the styles are made for desktop resolution only.
- Re use components and styles from albums module in artists module, so I re did the components with the same logic.
- Unit tests

## 🎶 To install and run the app:

Install the dependencies and devDependencies and start the server.

```sh
$ npm install
$ npm start
```

# I hope you like it!