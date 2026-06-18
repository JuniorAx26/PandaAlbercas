# Setup — PandaAlbercas (Triana's clean)

Pasos para dejar el sitio guardando cotizaciones en Supabase y con `/admin`
funcional. Todo está pensado para ser cuestión de 10 minutos.

---

## 1. Crear el proyecto Supabase

Opción A (recomendado): **supabase.com** directo.

1. Entra a <https://supabase.com> e inicia sesión.
2. New project → región: `us-east-1` o más cercana a Tampico.
3. Anota:
   - Project URL (`https://xxxxxxxx.supabase.co`)
   - `anon` public key
   - `service_role` secret key
4. SQL Editor → pega TODO el archivo `supabase/migrations/0001_init.sql` → Run.
   La migración es idempotente: puedes correrla varias veces sin problema.

Opción B: **Lovable Cloud** (igual que Fumix).

1. Si ya tienes un workspace de Lovable, crea un nuevo proyecto vacío.
2. Activa Cloud y pídele al chat AI: "ejecuta este SQL en mi DB" y pega el
   contenido de `supabase/migrations/0001_init.sql`.
3. Backend → Project Settings → API: copia URL + anon key + service_role.

---

## 2. Setear las variables en Vercel

```bash
cd PandaAlbercas
printf "https://xxxxxxxx.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production
printf "eyJxxxx...anon..." | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
printf "eyJxxxx...service_role..." | vercel env add SUPABASE_SERVICE_ROLE production
vercel deploy --prod --yes
```

O por dashboard: <https://vercel.com> → proyecto pandaalbercas → Settings →
Environment Variables.

> ⚠️ El `service_role` NUNCA debe ir como `NEXT_PUBLIC_*`. Solo como server-side.

---

## 3. Crear tu cuenta admin

1. Vé a `https://pandaalbercas.vercel.app/admin`.
2. Escribe tu correo → "Magic link" → Supabase te manda un enlace al correo.
3. Confirma desde el correo y vuelve a `/admin` — entras como usuario normal.
4. Ahora promueve tu cuenta a admin con este SQL en Supabase:

```sql
update auth.users
   set raw_app_meta_data = jsonb_set(
         coalesce(raw_app_meta_data, '{}'::jsonb),
         '{role}',
         '"admin"'::jsonb
       )
 where email = 'TU_CORREO@dominio.com';
```

5. Cierra sesión en `/admin` y vuelve a entrar. El nuevo JWT incluirá el claim
   y podrás ver la tabla `quotes`.

---

## 4. Probar el flujo completo

1. Abre `/` en producción.
2. Llena el formulario y dale "Enviar por WhatsApp".
3. Deberías ver:
   - Banner verde "¡Cotización registrada!" con una referencia tipo `ab12cd34`.
   - WhatsApp abre con el mensaje prearmado al número configurado (default:
     `525655867604`, tu línea temporal de prueba).
4. Vé a `/admin` y la cotización aparece arriba del listado con status `nuevo`.
5. Cambia el status desde el dropdown — se actualiza al instante en Supabase.

---

## 5. Pasar a producción real

Cuando el dueño de Triana's clean confirme su línea oficial:

```bash
printf "528xxxxxxxxx" | vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER production --force
printf "0" | vercel env add NEXT_PUBLIC_TEST_MODE production --force
vercel deploy --prod --yes
```

Eso:
- Apunta los wa.me al número real.
- Quita el banner amarillo de "modo prueba".
- Deja de agregar `[PRUEBA]` al final del mensaje prefill.

---

## Troubleshooting

| Síntoma | Causa probable | Fix |
|---|---|---|
| Formulario funciona pero no veo cotizaciones en `/admin` | Tu cuenta no tiene `app_metadata.role='admin'` | Corre el SQL del paso 3.4 y vuelve a entrar |
| `/admin` muestra "Falta configurar Supabase" | Env vars no aplicadas | Redeploy después de setear env vars |
| Error 401 en Supabase al insertar | RLS bloqueando porque no se usa service_role | Confirma que `SUPABASE_SERVICE_ROLE` está en Vercel (sin `NEXT_PUBLIC_`) |
| `Rate limit` al probar muchas veces | Defensa anti-spam por IP | Espera 60 segundos |
