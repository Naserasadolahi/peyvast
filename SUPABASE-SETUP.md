# راه‌اندازی Backend با Supabase (گام‌به‌گام)

## ۱) ساخت پروژه رایگان

1. برو به: https://supabase.com
2. Sign up / Login
3. **New Project** بزن
4. اسم پروژه مثلاً `peyvast`
5. یک Database Password قوی بگذار و **یادداشت کن**
6. Region نزدیک (مثلاً Frankfurt) انتخاب کن
7. صبر کن تا پروژه آماده شود (۱–۲ دقیقه)

## ۲) اجرای اسکیمای دیتابیس

1. در منوی چپ: **SQL Editor**
2. **New query**
3. محتوای فایل `supabase-schema.sql` داخل پروژه را کامل کپی کن و Paste کن
4. دکمه **Run** بزن
5. باید پیام موفقیت ببینی

## ۳) خاموش کردن تأیید ایمیل (برای تست راحت)

1. **Authentication** → **Providers** → **Email**
2. گزینه **Confirm email** را **خاموش** کن
3. Save

## ۴) کپی کردن کلیدها

1. **Project Settings** (آیکون چرخ‌دنده) → **API**
2. این دو را کپی کن:
   - **Project URL**
   - **anon public** key

## ۵) ساخت فایل `.env` در ریشه پروژه

کنار `package.json` فایل جدید بساز به نام `.env` با این محتوا:

```
VITE_SUPABASE_URL=آدرس_Project_URL
VITE_SUPABASE_ANON_KEY=کلید_anon
```

مثال:

```
VITE_SUPABASE_URL=https://abcdefgh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
```

## ۶) نصب و اجرا

```bash
npm install
npm run dev
```

صفحه ورود باید پیام سبز **متصل به Supabase** نشان دهد.

## ۷) حساب مدیر

با همین مشخصات ثبت‌نام/ورود کن:

- نام کاربری: `naser.asadolahi`
- رمز: `@Naser41167`

نقش admin در کد برای این نام کاربری تنظیم می‌شود.

## نکته مهم

- بدون فایل `.env` اپ در **حالت دمو** با `localStorage` کار می‌کند.
- با `.env` صحیح، داده‌ها روی سرور Supabase ذخیره می‌شوند و بین دستگاه‌ها مشترک‌اند.
