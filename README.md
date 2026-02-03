# Christina's portfolio

Hello, world! This website was created for IAT 355 - Intro to Data Visualization. The goal was to create a personal website using HTML, CSS, and JavaScript. It shows my skills, education, experience, and interests.

This portfolio was hosted on vercel because my GitHub pages already has the portfolio I use to apply for design roles >.<

## What I built

This website is built using HTML and CSS. It has been hosted with Vercel. The website is accessible through the link https://christinaraganit.vercel.app/. Hyperlinks to my contact methods (namely X (Twitter), LinkedIn, and email) are available in the website. As of the time of submission, the only other accessible page in the website is https://christinaraganit.vercel.app/visualizations.

The following is the structure of the site. I took some flexibility with the recommended folder structure and decided to organize the visualizations-related pages in its own folder so that it can be acessible through my website on /visualizations, rather than /visualizations.html.

```
assets/                 Houses all images
├── asana.jpeg
├── bcit.jpeg
├── cookie.svg
├── ea.jpeg
├── felix.jpeg
├── google.jpeg
├── sap.jpeg
├── sfu.jpeg
├── svsd.jpeg
└── thumbnail.png
visualizations/         Accessible in /visualizations
├── index.html
├── vis.css
└── vis.js
index.html              Main page
styles.css              Styling for main page
main.js                 JS for main page
README.md -> For
```

## Challenges faced & solutions

1. The primary challenge I faced was positioning elements accurately in SVG. Understanding how cx, cy, and radius work together to control the placement and size of circle elements was difficult at first but after looking at multiple examples online and reading the documentation, I was able to grasp the concept and eventually ended up making a chocolate chip cookie using only SVG shapes, which was really fun.
2. Another challenge I faced was that as I was coding it was really hard to keep track of styling, like managing colors efficiently. At one point I realized I was using 7 different colors for text and I kept getting the HEX codes mixed up, so I looked into using CSS variables so that I could easily maintain the styling in the codebase. Unfortunately that resulted in my needing to type longer variable names but it's a worthy tradeoff.
3. Another problem that I ran into is, the visualizations displayed great when I was running the website locally but wasn't rendering when I hosted it. At first I thought the issue was the placement of my script tag or perhaps I wasn't loading the SVGs into the correct DOM elements, but I eventually ended up solving this by reading the error messages in the browser console. I saw a 404 error on the script, and suspected that the browser couldn't locate my JavasScript file at the path. I learned that when hosting online, it's important to make sure to have an understanding of relative vs. absolute paths.
