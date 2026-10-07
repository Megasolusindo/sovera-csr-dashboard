// Demo mode is off unless the build says otherwise (NEXT_PUBLIC_DEMO_MODE=true). Only in demo mode may the
// app log in as a built-in role without the API, switch roles from the top bar, or show the quick-login
// buttons. In every other build a login the API refuses is refused, and nothing is signed in locally.
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
