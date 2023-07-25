# Tennis Grand Slam Titles Dashboard

[Tennis Grand Slam Titles Dashboard](https://grand-slams-dashboard.vercel.app/)

## Features

- Review all-time grand slam title rankings for both men's and women's (ATP and WTA) in the Open Era.
- Dashboard provides filtering between men's and women's rankings as well as tabs (filters) to single out specific grand slam tournaments (all grand slam tournaments are included).
- Review recent grand slam tournament results with finalists and scorelines.
- Chart of the top ten players with the most amount of titles for all tournaments as well as each individual tournament.
- Toggle between viewing the dashboard in light mode and dark mode.
- Review the total number of grand slam final appearances.

## Tech Stack

This is a modern, responsive full-stack application built with the latest Next.js 13 features, including the app router and new React server/client components.

- Frontend: Next.js 13 (app router), TailwindCSS, shadcd/ui, recharts.
- Backend: Supabase Postgres database for grand slam tournament results (two tables, one for men and one for women).
- Data Source: The initial dataset was exported from data.world (https://data.world/fsd01/tennis-grand-slam-championships-champion-vs-runner-up-men) and only went up to 2021. Additional recent tournaments were manually added to Supabase.

## Feature Roadmap

We have exciting plans for the future of this dashboard:

- Individual Player Routes: Users will be able to drill down on specific players and access detailed data and performance information.
- Expanded Datasets: We aim to find other relevant tennis datasets to include, providing even more comprehensive insights.
- Live Feed: Stay updated with the latest results and information for upcoming tournaments, starting with the US Open.
- Animations: Utilizing Framer Motion for modern animation effects.