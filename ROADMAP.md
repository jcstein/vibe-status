# Vibe Status Roadmap

## Completed
- [x] Real-time status dashboard with 7 default services
- [x] Island/ocean theme with dark mode
- [x] GitHub OAuth login (Auth.js v5 + Prisma)
- [x] Per-user service customization (up to 7 from catalog of 23)
- [x] Settings page with ServicePicker
- [x] Avatar dropdown menu (Settings, Sign out)
- [x] Pixel-styled Customize button for anonymous users
- [x] Vercel Analytics

## Up Next
- [ ] Fix local dev auth — set up second GitHub OAuth App for localhost
- [ ] Sign out button on settings page
- [ ] Loading/error states — toast or feedback on ServicePicker save
- [ ] Mobile polish — header, avatar dropdown, ServicePicker grid on small screens
- [ ] Speed Insights — add @vercel/speed-insights for Web Vitals
- [x] Add new services (Statuspage-compatible): Supabase, PostHog, Hotjar, ElevenLabs, Dropbox, Resend

## Backlog — Investigate
- [ ] Neon — uses status.io, needs custom fetcher
- [ ] Firebase — Google custom status dashboard, needs custom fetcher
- [ ] Google Analytics — Google Workspace dashboard, needs custom fetcher
- [ ] Google Drive — Google Workspace dashboard, needs custom fetcher
- [ ] Gemini — Google custom status page, needs custom fetcher
- [ ] Firecrawl — uses Better Stack, needs custom fetcher
- [ ] Nano-banana — community wrappers around Gemini image gen, no independent status page

## Ideas
- [ ] Drag-and-drop reordering of services
- [ ] Incident history / timeline view
- [ ] Email or push notifications for status changes
- [ ] Custom status page URL support (bring your own Statuspage)
- [ ] Public shareable dashboard links
- [ ] More auth providers (Google, email magic link)
- [ ] Stripe integration for paid tiers (more services, higher polling frequency, etc.)
