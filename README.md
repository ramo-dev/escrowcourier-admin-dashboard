# Escrow Courier Admin Dashboard

This is a web-based admin portal for the Escrow Courier service, designed to manage parcels, agents, and overall operations.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for
development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed on your
machine.

### Installation

1.  Clone the repo ```sh git clone https://github.com/ramo-dev/escrowcourier-admin-dashboard.git ```
2.  Install NPM packages ```sh pnpm install ```

### Running the application

To run the app in the development mode, use the following command:

```sh pnpm dev ```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser. The page will reload
if you make edits.

## Features

-   **Authentication:** Secure login for administrators.
-   **Dashboard:** An overview of key metrics, including statistics on parcels and agent activities.
-   **Parcel Management:** View and manage all parcels within the system.
-   **Agent Management:** View and manage all agents.
-   **Reporting:** Generate and view reports on various aspects of the courier service.
-   **Theming:** Switch between light and dark modes for better user experience.

## Technologies Used

-   **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/),
[Vite](https://vitejs.dev/)
-   **UI:** [shadcn/ui](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)
-   **Routing:** [React Router](https://reactrouter.com/)
-   **State Management:** [React Context](https://reactjs.org/docs/context.html)
