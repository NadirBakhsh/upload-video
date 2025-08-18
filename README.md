# Next Fullstack ImageKit

A fullstack Next.js application featuring secure authentication, image optimization with ImageKit, and MongoDB integration via Mongoose.

## Features

- **Next.js 15**: Latest React framework for server-side rendering and static site generation.
- **ImageKit Integration**: Efficient image optimization and CDN delivery using `@imagekit/next`.
- **Authentication**: Secure user authentication with [NextAuth.js](https://next-auth.js.org/).
- **MongoDB/Mongoose**: Robust data storage and modeling.
- **Password Hashing**: Secure password storage using `bcryptjs`.
- **TypeScript & ESLint**: Type safety and code quality enforced.
- **Tailwind CSS**: Utility-first CSS for rapid UI development.

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or cloud)
- ImageKit account (for API keys)

### Required Accounts & API Keys

You must create accounts on the following platforms and obtain the required environment variables:

- **MongoDB Atlas**  
  [Create a free MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register) and get your connection string (`MONGODB_URI`).

- **ImageKit**  
  [Sign up for ImageKit.io](https://imagekit.io/dashboard/signup) and get your:
  - Public Key (`IMAGEKIT_PUBLIC_KEY`)
  - Private Key (`IMAGEKIT_PRIVATE_KEY`)
  - URL Endpoint (`IMAGEKIT_URL_ENDPOINT`)

- **NextAuth.js**  
  Generate a strong secret for `NEXTAUTH_SECRET`. You can use `openssl rand -base64 32` or any secure random generator.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NadirBakhsh/upload-video.git
   cd upload-video
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env.local` file in the root directory and add:
   ```
   MONGODB_URI=your_mongodb_connection_string      # From MongoDB Atlas
   NEXTAUTH_SECRET=your_nextauth_secret            # Generate yourself
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key    # From ImageKit dashboard
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key  # From ImageKit dashboard
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint # From ImageKit dashboard
   ```

### Development

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## Scripts

- `dev`: Start development server with Turbopack
- `build`: Build for production
- `start`: Start production server
- `lint`: Run ESLint

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [ImageKit](https://imagekit.io/)
- [Mongoose](https://mongoosejs.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

---
