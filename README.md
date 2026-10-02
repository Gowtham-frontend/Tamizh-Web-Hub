# Tamizh Web Hub - Portfolio + Admin (HTML/CSS/JS + Supabase)

## Run locally (VS Code)
1. Open the folder in VS Code, install the "Live Server" extension.
2. Right-click index.html > Open with Live Server.
   Admin panel: /admin/index.html

## Connect Supabase
1. Create a project at supabase.com.
2. SQL Editor > paste supabase/schema.sql > Run.
3. Authentication > Users > Add user (your admin email + password).
   Authentication > Providers > Email: turn OFF "Allow new users to sign up".
4. Project Settings > API: copy Project URL and anon public key into js/config.js.
5. Set WHATSAPP_NUMBER in js/config.js (country code, no + sign).

Without Supabase keys the site still works: it shows sample projects and the form opens WhatsApp.

## Deploy
Upload the whole folder to Netlify, Vercel or any static host. The anon key is safe to expose because Row Level Security in schema.sql restricts what visitors can do.
