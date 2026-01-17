# 🚀 Tez Boshlash Qo'llanmasi

## 1 Daqiqada Boshlash

### Qadam 1: Loyihani Ichiga Kirish
```bash
cd kahoot-clone
```

### Qadam 2: Server-ni Boshlash
```bash
npm run dev
```

### Qadam 3: Brauzerda Ochish
```
http://localhost:3000
```

✅ **Tayyor! Server http://localhost:3000 da ishga tushdi**

---

## 🔐 Test Hisob

Hisob-kitob:
- **Email**: admin@example.com
- **Parol**: password

OR

- **Email**: teacher@example.com  
- **Parol**: password

---

## 🎮 Demodan O'tish

### 1. Home Sahifasi (Bosh Sahifa)
```
http://localhost:3000
```
- Logo, Heading, Features ni ko'ring
- 3 ta quvnoch button mavjud

### 2. Dashboard
```
http://localhost:3000/dashboard
```
- "Mening Testlarim" ro'yxati (3 ta mock test)
- "Yangi Test" tugmasi
- Her bir test uchun "O'yin Boshlash" tugmasi

### 3. Test Yaratish
```
http://localhost:3000/quiz/create
```
- Test nomi, tavsif kiritish
- Savollar qo'shish interfeysi
- Javoblar bilan ishlash

### 4. O'yinga Qo'shilish
```
http://localhost:3000/join-game
```
- O'yin kodi (6 raqam) kiritish
- Taxallus kiritish
- O'yinchiga qo'shilish

### 5. O'yin Xonasi (Host)
```
http://localhost:3000/game/host/1
```
- O'yin kodi ko'rsatish
- Ishtirokchilar ro'yxati
- Jonli reytinglar

### 6. O'yin (Participant)
```
http://localhost:3000/game/participant/123456?nickname=Foydalanuvchi
```
- Savol ko'rsatish
- 4 rangli javob tugmalari
- Vaqt hisoblagich
- Ball to'plash

### 7. Natijalar
```
http://localhost:3000/results
```
- Podium (1-3 o'rin)
- Yozuv taxtasi
- Batafsil statistika

---

## 📁 Fayl Tuzilmasi

```
kahoot-clone/
├── src/
│   ├── app/                    # Sahifalar va API
│   ├── components/             # Qayta ishlatilgan komponentlar
│   ├── config/                 # Tema va konfiguratsiya
│   ├── lib/                    # Utility va API funksiyalari
│   ├── store/                  # Zustand state management
│   └── types/                  # TypeScript type definitions
├── prisma/                     # Database schema
├── public/                     # Statik fayllar
├── .env.example                # Environment o'zgaruvchilari
├── next.config.ts              # Next.js konfiguratsiya
├── tailwind.config.ts          # Tailwind CSS konfiguratsiya
├── tsconfig.json               # TypeScript konfiguratsiya
└── package.json                # Bog'liqliklar
```

---

## 🛠️ Asosiy Komandalari

```bash
# Development server
npm run dev

# Production build
npm run build

# Production serverini ishga tushirish
npm start

# ESLint tekshirish
npm run lint

# TypeScript tekshirish
npm run type-check
```

---

## 🎨 Design System

### Ranglar (Tailwind Color Names)
```
primary: #1368CE (blue-700)
secondary: #D81B60 (pink-600)
success: #43A047 (green-600)
error: #E53935 (red-600)
warning: #FFA000 (orange-500)
```

### Komponantlar

#### Button
```jsx
<Button variant="primary" size="lg">
  Boshlash
</Button>
```

#### Card
```jsx
<Card onClick={() => {}}>
  <h3>Test Nomi</h3>
</Card>
```

#### Input
```jsx
<Input 
  label="Nomi"
  placeholder="..."
  error="Xato xabari"
/>
```

#### GameButton
```jsx
<GameButton 
  optionNumber={1}
  text="Javob Matni"
  isSelected={true}
/>
```

---

## 📊 Mock Data

### Testlar
- Geometriya Asoslari
- JavaScript Basics
- Ingliz Tili Grammatikasi

### Savollar
- 3 ta asosiy savol
- Multiple choice va true/false turlari
- 20-30 soniya vaqt chegarasi

### Ishtirokchilar
- 5 ta mock o'yinchi
- Turli balllar
- Turli natijalar

---

## 🔧 Konfiguratsiya

### .env.local (Hozir ixtiyoriy)

```env
# Database (WIP)
DATABASE_URL="postgresql://..."

# Authentication (WIP)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev-secret-key"

# API
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

---

## 🐛 Debugging

### DevTools
1. Browser-ni oching
2. F12 => Network tab
3. API chaqiruvlarini ko'ring

### Next.js Logs
```bash
npm run dev -- --debug
```

### TypeScript Errors
```bash
npm run type-check
```

---

## 📝 Qo'llanmalar

- **README_UZ.md** - O'zbek tilidagi to'liq qo'llanma
- **DEPLOYMENT.md** - Joylashtirish qo'llanmasi
- **PROJECT_SUMMARY.md** - Loyiha xulasasi

---

## 🎯 Keyingi Qadamlar

1. **Real Database Sozlash**
   ```bash
   # PostgreSQL o'rnatish
   # DATABASE_URL o'rnatish
   # Prisma migration bajarish
   npx prisma migrate dev --name init
   ```

2. **Authentication Integratsiyasi**
   ```bash
   # NextAuth.js setup
   # Login/Register sayfalarini vaqtingiz
   ```

3. **Real-time Features**
   ```bash
   # Socket.io integratsiyasi
   # Real-time leaderboard
   # Live notifications
   ```

4. **AI Test Generatori**
   ```bash
   # Gemini API integratsiyasi
   # PDF/DOCX parser
   # Auto-generated tests
   ```

---

## 💡 Maslahatlar

- Mock data `src/lib/mockData.ts` da joylashgan
- API routes `src/app/api` da
- Komponentlar `src/components` da
- Ranglar/Tema `src/config/theme.ts` da
- Store (state) `src/store/index.ts` da

---

## 🤝 Qo'llab-Quvvatlash

Muammolar yoki savollar uchun:
- GitHub Issues ochish
- Dokumentatsiyani o'qish
- Kodni debugging qilish

---

## ✨ Xulosa

Loyiha **TAYYOR** va **ISHLAYDI**! 🎉

- ✅ Barcha sahifalar implement
- ✅ Komponentlar va UI tayyor
- ✅ Mock data mavjud
- ✅ Development server ishga tushgan

**Quvonch bilan o'rin, do'stlari bilan raqobatda!** 🎮🏆

---

**Oxirgi yangilash:** 2024-2025
