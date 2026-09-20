# پیوست (Peyvast)

پلتفرم تأمین نیازمندی‌های پروژه — نسخه بازسازی‌شده با React + Vite + TypeScript + Tailwind CSS.

این پروژه یک بازسازی تمیز و نزدیک به ظاهر سایت اصلی `https://peyvast-yqsj.whacka.app/` است که روی پلتفرم Whacka ساخته شده بود.

## ویژگی‌ها

- طراحی دارک‌تم کامل RTL فارسی
- سایدبار دسکتاپ + هدر موبایل
- هیرو اسلایدر با اسلایدهای اصلی، ماژول‌ها و آگهی‌ها
- ۵ ماژول تأمین (نیروی انسانی، پیمانکاران، ماشین‌آلات، کالا، تکنیکال)
- صفحه لیست آگهی‌ها با فیلتر و جستجو
- صفحه جزئیات آگهی
- فونت‌های Vazirmatn و Lalezar
- آیکون‌های Lucide
- داده‌های نمونه (mock)

## نصب و اجرا

```bash
cd peyvast
npm install
npm run dev
```

سپس مرورگر را روی `http://localhost:5173` باز کنید.

## ساختار پروژه

```
src/
  components/
    HeroSlider.tsx      # اسلایدر صفحه اصلی
    Icons.tsx           # آیکون‌ها
    ListingCard.tsx     # کارت آگهی
    MobileHeader.tsx
    Sidebar.tsx
  pages/
    Home.tsx
    ModulePage.tsx
    ListingDetail.tsx
    Placeholder.tsx
  data.ts               # داده‌های نمونه و تعریف ماژول‌ها
  types.ts
  App.tsx
  main.tsx
  index.css             # Tailwind + تم سفارشی
```

## نکات توسعه

- برای اتصال به backend واقعی (مثل Supabase) می‌توانید `data.ts` را با API جایگزین کنید.
- رنگ‌های ماژول‌ها در `data.ts` تعریف شده‌اند.
- مسیریابی با `react-router-dom` انجام می‌شود.

## لایسنس

این کد برای استفاده شخصی و توسعه پروژه پیوست ارائه شده است.

## Backend (Supabase)

راهنمای کامل: فایل `SUPABASE-SETUP.md`

بدون تنظیم `.env` اپ با localStorage کار می‌کند (دمو).
