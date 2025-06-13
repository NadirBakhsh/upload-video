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

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/next-fullstack-imagekit.git
   cd next-fullstack-imagekit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env.local` file in the root directory and add:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
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

## License

This project is private. For usage or licensing, please contact the author.

---
