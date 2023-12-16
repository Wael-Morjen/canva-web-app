# canva web app

## Overview

Canva web app is a responsive drawing application built with Next.js, offering server-side rendering, automatic code splitting, and a powerful development environment. The application allows users to draw, select various tools, take picture with their device's camera, import images, and save their creations.

### Key Features

- **Responsive Drawing:** Enjoy a smooth drawing experience on various devices.
- **Tool Selection:** Choose from a set of drawing tools, including pencil, eraser, and more.
- **Image Import:** Easily import images from your device or take a snapshot using the camera(mobile devices only).
- **Save Your Artwork:** Save your creations and share them with others.

## Development Choices

### Framework: Next.js

I chose Next.js for several reasons:

- **Server-Side Rendering (SSR):** Next.js provides server-side rendering, improving performance and SEO.
- **Automatic Code Splitting:** Next.js enables automatic code splitting, enhancing page load times.
- **React Support:** Next.js seamlessly integrates with React, allowing us to leverage the power of React components.

### Libraries

#### `react-icons`

I opted for the `react-icons` library for the following reasons:

- **Extensive Icon Set:** `react-icons` offers a comprehensive set of icons, providing flexibility in design.
- **Ease of Use:** Integrating icons into React components is straightforward with `react-icons`.
- **Consistency:** `react-icons` maintains a consistent API, making it easy to switch between different icon sets.

#### `react-webcam`

The `react-webcam` library is used to integrate webcam functionality into the application, allowing users to take snapshots. It enhances the drawing experience on mobile devices.

## Getting Started

### Prerequisites

1. **Node.js:** Ensure that Node.js is installed on your machine. You can download it from [here](https://nodejs.org/).

### Installation

```bash
git clone https://github.com/Wael-Morjen/canva-web-app.git
cd canva-web-app
```

### Install dependencies

```bash
npm install
```

### Deployment (Build the Application)

```bash
npm run build
```

### Start the Application

```bash
npm start
```

### Run Locally

```bash
npm run dev
``` 

Visit http://localhost:3000 in your browser.

### Application already in production on Vercel

Visit [canva web app](https://canva-web-app.vercel.app/)

## Acknowledgments

- [React Icons](https://react-icons.github.io/react-icons/): Used for providing a variety of icons in the application.
- [React Webcam](https://www.npmjs.com/package/react-webcam): Integrated to enable webcam functionality, allowing users to take snapshots.
- [Next.js](https://nextjs.org/): Chosen for building a fast, scalable, and SEO-friendly React application with server-side rendering.
- [Tailwind CSS](https://tailwindcss.com/): Utilized for a utility-first CSS approach to styling components.
- [Jest](https://jestjs.io/): Employed for testing the application and ensuring code quality.
- [ESLint](https://eslint.org/): Used for linting the code and maintaining a consistent coding style.
- [GitHub](https://github.com/): Hosts the project and provides version control.

## Author

- **Wael Morjen** - [GitHub Profile](https://github.com/Wael-Morjen)