# user-practitioner-online-class

Web app for end users and practitioners of **Online Class Booking (Sanara Wellness)**. Users find and book wellness classes. Practitioners set up a profile and studio, and later manage classes, attendees and payouts.

This is one of three apps:

| App | Role |
| --- | --- |
| `api-online-class` | Server, database, login, email, SMS, payments |
| `admin-online-class` | Admin web panel |
| `user-practitioner-online-class` (this repo) | End-user and practitioner web app |

## Status

About a quarter of the planned scope is built. Login, sign-up, verification, password change, class and modality lists, class detail (read only) and the practitioner first-time profile wizard are connected to the API. Booking, checkout, My Bookings, journal, reviews, favorites, quiz, packages, gift cards, referrals, the practitioner dashboard and payouts are missing or use sample data. It is a responsive website, not yet an installable app (PWA). Several security faults must be fixed before launch. See [Known bugs](#known-bugs) and [Pending work](#pending-work).

## Tech stack

- Next.js 15 (pages router, Turbopack for development), React 18
- TypeScript (strict mode)
- MUI 7
- next-auth 4 (credentials login against the API), JWT session of 2 hours
- axios
- No Node version is set in the project.

## Setup

1. Start the API first (see `api-online-class`). Run its migrations and seed.
2. Install packages: `npm install`
3. Create a `.env` file in this folder with the variables in the next section. There is no `.env.example`.
4. Start: `npm run dev`. It runs on port 3000 by default. If the admin app also runs on your machine, use another port: `npm run dev -- -p 3001`.
5. Open the app, choose a role (user or practitioner) and create an account.

Production: `npm run build` then `npm start`. The build is expected to fail until the type errors in [Known bugs](#known-bugs) are fixed.

## Environment variables

Names only. Never commit values.

| Variable | Meaning |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Address of the API, with **no `/api` at the end**, for example `http://localhost:3002`. It is visible in the browser. |
| `NEXTAUTH_URL` | Public address of this app |
| `NEXTAUTH_SECRET` | Secret for the login cookie. Use a long random value. |
| `APP_URL` | Public address of this app |

In production use `https` for all of these. Over plain `http`, passwords, codes and tokens travel unprotected.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server (`next dev --turbopack`) |
| `npm run build` | Production build |
| `npm start` | Starts the built app |
| `npm run lint` | `next lint` |

There are no tests.

## Screens

| Route | State |
| --- | --- |
| `/` | Landing page. The Google and Facebook buttons do nothing. |
| `/role-selection`, `/create-account/[role]` | Sign-up works. Company name for practitioners is dropped. Terms, Privacy and Waiver are checkboxes with no text shown. |
| `/login` | Works |
| `/verification`, `/verify-account/[type]` | Email and phone code entry works. "Resend" on the phone screen calls the email route. |
| `/forgot-password`, `/reset-password/[token]` | Screens work, but the reset step is unsafe (see B2). |
| `/dashboard` | Stub. Two fixed sample sessions. Several buttons have no action. |
| `/class` | Real class lists (all, upcoming, recommended). No filters or paging. Not linked from the menu. |
| `/class/[id]` | Class detail. No map, spots left, reviews or policy. The **Book** button only shows an alert. |
| `/find-session`, `/calendar`, `/session-detail` | Sample data only |
| `/modalities`, `/modalities/[id]` | List and detail work. A modality page does not list its classes. |
| `/practitioner` | Real list. The filters do nothing. There is no search. |
| `/practitioner/[id]` | Public practitioner page. Always shows "not found". |
| `/practitioners` | Old sample page |
| `/practitioner/complete-profile` | 3-step wizard (modalities, bio, certifications, studio). It asks the practitioner for a commission rate, which must be admin only. |
| `/practitioner-dashboard`, `/upcoming-sessions` | Placeholder pages |
| `/profile` | Name and ZIP. The API ignores ZIP, so the save message is wrong. No photo or preferred location. |
| `/change-password` | Works |
| `/bookings` | Three fixed sample rows. The API is not called. |
| `/payment-success`, `/payment-failed` | Static pages |
| `/wellness-quiz` | Fixed questions. Calls two routes that do not exist. Not linked. |
| `/coming-soon` | Leftover page |
| `/settings`, `/booking` | Linked from the app but the pages do not exist |

## Project structure

```
pages/                Screens (see the table above)
pages/api/            Server routes that forward calls to the API, plus next-auth
components/           Header, BottomNavigation, SessionCard, Calendar, FilterComponent,
                      class/, common/, modality/, practitioner/ (onboarding steps)
utils/api/            Functions that call the API
utils/validations/    Form checks
utils/helpers.ts      Date helper
lib/theme.ts          MUI theme
types/                Shared types and next-auth types
middleware.ts         Route middleware (see bugs)
next.config.ts        Empty apart from strict mode
public/               Static assets
```

How a call flows: the browser calls a route in `pages/api/`, which adds the login token and calls the API. A few pages call the API directly from `getServerSideProps` or from the browser.

## Known bugs

Fix these first. IDs match the Final Audit Report.

| ID | Pri | Bug |
| --- | --- | --- |
| B2 | P0 | The reset page sends only email and new password, with no token (`pages/reset-password/[token].tsx`, `pages/api/auth/reset-password.ts`). The API also accepts that. |
| B12 | P0 | The API token is visible to browser scripts: it is in the session, in page data, in request headers and in the change-password request body. |
| B13 | P0 | `middleware.ts` treats every path as public (a `startsWith("/")` test), so nothing is protected at the edge, and logged-in users are redirected away from most pages. Only 7 pages check the login on the server. |
| B24 | P1 | The public practitioner page always says "not found" (the data call is commented out). Directory filters do nothing. The quiz calls missing routes. Phone "resend" calls the email route. Studio create fails when the logo is empty (`pages/api/studio/create.ts`). |
| | P1 | The production build fails the type check with 7 errors: `components/class/RecommendedSection.tsx`, `pages/practitioners.tsx`, `pages/session-detail.tsx` (duplicate keys), `pages/practitioner.tsx`, and a missing `@types/lodash` for `pages/wellness-quiz.tsx`. ESLint also reports 8 errors. The build itself was not run. |
| | P1 | API errors are hidden: an expired login or a server error shows as an empty list. |
| | P1 | Practitioner onboarding lets the practitioner type their own commission rate and a Stripe ID. |
| | P2 | 7 packages are installed but not used. Sample data is left in 7 pages. Leftover starter files remain. |

## Pending work

Booking and checkout with Stripe, seat picker, confirmation with a reference number, calendar download, real My Bookings, cancel; practitioner class form, class dashboard, attendee list, rooms, studio edit; class search and filters with paging and nearby results; practitioner public page; journal screens; reviews; favorites; notification settings and in-app reminders; AI quiz; packages, gift cards, coupons and referrals; Stripe Connect payouts and earnings; Google Calendar; social login; profile photo upload; settings and account deletion; installable app (manifest, icons, service worker, push); tests.

Many of these need new API routes first.

## Related

The API address is set in `NEXT_PUBLIC_API_URL`. The password reset email link opens this app.
