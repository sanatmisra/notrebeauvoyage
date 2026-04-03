# Notre Beau Voyage

Invitation and travel itinerary site for Sanat and Sneha's vow renewal trip across the French Riviera.

## Run Locally

1. Use Node 22:

```bash
nvm use
```

2. Install dependencies:

```bash
npm install
```

3. Start the local dev server:

```bash
npm run dev
```

The custom dev script clears stale `.next` output before startup to avoid broken local chunk references after branch changes or interrupted reloads.

## Deploy To Vercel

1. Push your branch to GitHub.
2. Import the repository into Vercel.
3. Keep the framework preset as `Next.js`.
4. Use Node 22 in the Vercel project settings.
5. Deploy `main` for production or another branch for preview deployments.

## Connect `notrebeauvoyage.com` On Vercel

1. Open your Vercel project.
2. Go to `Settings` → `Domains`.
3. Add `notrebeauvoyage.com`.
4. Add the DNS records Vercel provides at your DNS host.
5. Wait for verification and SSL provisioning.
6. Optionally add `www.notrebeauvoyage.com` and redirect it to the apex domain.

## Replace Placeholder Images

Image library structure:

- `public/images/couple/` for relationship and archive photos
- `public/images/trip/` for Riviera and destination photos

The Hero collage already includes replacement comments in `src/components/Hero.tsx`.
Swap the `src` values to your chosen files inside `public/images/...`.

## Update Trip Content

Most editable content lives in:

- `src/app/page.tsx` for navigation labels, itinerary items, and gallery items
- `src/components/Hero.tsx` for the hero captions and overlay text
- `src/components/Invitation.tsx`, `src/components/OurStory.tsx`, `src/components/GuestInfo.tsx` for story and trip copy

Update the text arrays and section copy directly, then run:

```bash
npm run build
```
