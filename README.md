# CareerCarve

CareerCarve is a mentorship platform that connects students with experienced professionals for career guidance and support.

## Features

- User authentication with Clerk
- Browse and search for mentors
- Schedule mentorship sessions
- View upcoming and past sessions

## Setup

1. Clone the repository
2. Navigate to the client directory:
   ```
   cd client
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the client directory and add the following:
   ```
   VITE_VERCEL_RENDER_API=<your_backend_api_url>
   VITE_VERCEL_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
   ```
5. Start the development server:
   ```
   npm run dev
   ```

## Build

To build the project for production:

```
npm run build
```

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Clerk for authentication
- Axios for API requests

## Project Structure

- `src/components`: Reusable UI components
- `src/pages`: Main application pages
- `src/contexts`: React context for state management
- `src/hooks`: Custom React hooks
- `src/lib`: Utility functions and helpers

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.