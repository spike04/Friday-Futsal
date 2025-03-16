# Friday Futsal

Friday Futsal is a web application that allows users to generate and share their Friday Futsal matches. It provides a simple and intuitive interface for creating and sharing matches, with the ability to add and remove players, teams, and match information.

## Features

- Generate and share Friday Futsal matches
- Add and remove players, teams, and match information
- Save matches to a database
- Share matches via URL

## Getting Started

To get started with the Friday Futsal application, follow these steps:

1. Clone the repository
2. Install dependencies
3. Server is created with `json-server` hence to run server run the following command
```bash
npx json-server --watch db.json --port 3000
```
Server Reference is done on port 3000

4. To run frontend server, run the following command
```bash
npm run dev
```