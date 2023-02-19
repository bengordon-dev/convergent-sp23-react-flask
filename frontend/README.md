# Front-End Overview

[React](https://reactjs.org/) is the front-end framework used for this forum website. See below for info about getting started with React.

## Setup

```node
npm install
```

## Directory Structure

```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.js
│   ├── App.test.js
│   ├── components
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Main.js
│   │   ├── Navbar.js
│   │   ├── PostsSection.js
│   │   ├── Signup.js
│   │   └── ThreadsSection.js
│   ├── index.css
│   ├── index.js
│   ├── reportWebVitals.js
│   └── setupTests.js
└── tailwind.config.js
```

The ```src``` folder contains the bulk of the application. The ```components``` folder presents the standalone pages as well as other elements like _Navbar_, _PostsSection_, & _ThreadsSection_ that contribute to its modularity. Routing is presented in ```App.js``` facilitating navigation across different pages.

## CSS Framework

[TailwindCSS](https://tailwindcss.com/) is a utility-first framework that is used to style all pages and components for the front-end side of this application. Configuration files for this setup can be found in ```tailwind.config.js```. Step-by-step guide for integrating this library with React can be found [here](https://tailwindcss.com/docs/guides/create-react-app).
