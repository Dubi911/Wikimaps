## Warnings & Tips

- Do not edit the `layout.css` file directly, it is auto-generated by `layout.scss`
- Split routes into their own resource-based file names, as demonstrated with `users.js` and `widgets.js`
- Split database schema (table definitions) and seeds (inserts) into separate files, one per table. See `db` folder for pre-populated examples. 
- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 
  - It runs through each of the files, in order, and executes them against the database. 
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x

# Wiki Maps 

A web app that allows users to collaboratively create maps which list multiple "points". For example: "Best Places to Eat Around Town" or "Locations of Movie Scenes".
Requirements:

* users can see a list of the available maps
* users can view a map
* a map can contain many points
* each point can have: a title, description, and image
* authenticated users can create maps
* authenticated users can modify maps (add, edit, remove points)
* users can favourite a map
* users have profiles, indicating their favourite maps and maps they've contributed to
* use http://leafletjs.com/ or https://developers.google.com/maps/

## Optional Requirements
* SPA (Single-Page Application) Behaviour
* Hosting: **Netlify**

## Goal

* Build a web app from start to finish using the tech and approaches learned to date
* Turn requirements into a working product
* Practice architecting an app in terms of UI/UX, Routes/API and Database
* Manage a multi-developer project with git
* Simulate the working world where you do not always get to completely cherry pick your team, stack or product features
* Practice demoing an app to help prepare for the final project and employer interviews

## Stack Requirements

Your projects must use:

* ES6 for server-side (NodeJS) code
* NodeJS
* Express
    * RESTful routes
* One or more CSS or [UI "framework"s](https://github.com/troxler/awesome-css-frameworks): **(Bootstrap)**
* jQuery
* A CSS preprocessor [**SASS**]()-- or CSS Custom properties and no CSS preprocessor
* PostgreSQL and `pg` (with promises) for DBMS
* git for version control
* **No EJS** *by Lucas*
