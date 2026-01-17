# Onlayn Jamoaviy Test O'yini (Kahoot Clone)

Quvonch bilan o'rin, do'stlari bilan raqobatda! 🎮

## Loyihaning Ta'svifi

Ushbu loyiha Kahoot.com uslubida yaratilgan Onlayn Jamoaviy Test O'yini (Quiz Game) ilovasi. Foydalanuvchilar testlar yarata oladi, jamoaviy o'yinlarga o'tkazishi mumkin va real vaqtda raqobatda bolishi mumkin.

## Asosiy Xususiyatlar

- ✨ **Test Yaratish**: Savollar va javoblar bilan testlar yaratish
- 🎮 **Jamoaviy O'yin**: Real vaqtda millarda o'zlashganidan raqobatda
- 🏆 **Teisinlash Tizimi**: Topning birinchi 3 o'yinchisiga medal
- 📊 **Jonli Reytinglar**: O'yin davomida hajmi qayta yangilanadigan leaderboard
- 🤖 **AI Test Generatori**: PDF/DOCX fayllardan avtomatik testlar yaratish
- 📱 **Responsiv Dizayn**: Barcha qurilmalarda ishlaydi
- 🎨 **Yorqin Interfeys**: Zamonaviy minimalizm uslubida

## Rang Palitasi

- **Asosiy**: #1368CE (Moviy)
- **Ikkinchi**: #D81B60 (Pushti)
- **To'g'ri Javob**: #43A047 (Yashil)
- **Noto'g'ri Javob**: #E53935 (Qizil)
- **Yutuqlar**: #FFA000 (Oltin)
- **Fon**: #F5F5F5 (Och kulrang)

## Ma'lumotlar Bazasi Tuzilmasi

### Jadvallar

1. **users** - Foydalanuvchilar
2. **quizzes** - Testlar
3. **questions** - Savollar
4. **answers** - Javoblar
5. **game_sessions** - O'yin Sessiyalari
6. **participants** - Ishtirokchilar
7. **participant_answers** - Ishtirokchi Javoblari

## Texnologiyalar

### Frontend
- Next.js 16 (React)
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Socket.io Client (Real-time Communication)
- Framer Motion (Animations)
- Lucide React & React Icons

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- NextAuth.js (Authentication)

### AI & Tools
- Gemini 2.5 Pro (Test Generation)
- Image Generation API

## O'rnatish

### Oldindan Shartlar
- Node.js 18+
- PostgreSQL
- npm yoki yarn

### O'rnatish Jarayoni

```bash
# 1. Loyihani klonlang
git clone <repository-url>
cd kahoot-clone

# 2. Bog'liqliklarni o'rnatish
npm install

# 3. Environment o'zgaruvchilarini o'rnatish
cp .env.example .env.local

# 4. DATABASE_URL ni .env.local ga kiritish
# PostgreSQL ulanishning string'i kerak

# 5. Prisma migratsiyalarni bajarish
npx prisma migrate dev --name init

# 6. Seed ma'lumotlari kiritish (ixtiyoriy)
npx prisma db seed

# 7. Ishga tushirish
npm run dev
```

## Ishga Tushirish

### Development rejimida
```bash
npm run dev
# http://localhost:3000 da ochiladi
```

### Production rejimida
```bash
npm run build
npm start
```

## API Routes

### Authentication
- `POST /api/auth/register` - Ro'yxatdan o'tish
- `POST /api/auth/login` - Kirish
- `POST /api/auth/logout` - Chiqish
- `GET /api/auth/me` - Joriy foydalanuvchi

### Quizzes
- `GET /api/quizzes` - Barcha testlar
- `GET /api/quizzes/:id` - Testning tafsilotlari
- `POST /api/quizzes` - Yangi test yaratish
- `PUT /api/quizzes/:id` - Testni tahrirlash
- `DELETE /api/quizzes/:id` - Testni o'chirish

### Game Sessions
- `POST /api/game-sessions` - O'yin sessiyasi yaratish
- `GET /api/game-sessions/:id` - Sessiya tafsilotlari
- `POST /api/game-sessions/join` - O'yinga qo'shilish
- `POST /api/game-sessions/:id/start` - O'yinni boshlash
- `POST /api/game-sessions/:id/next-question` - Keyingi savol
- `POST /api/game-sessions/:id/end` - O'yinni tugatish
- `GET /api/game-sessions/:id/leaderboard` - Leaderboard

### Participants
- `POST /api/participants/answer` - Javob yuborish
- `GET /api/participants/:id/stats` - Ishtirokchi statistikasi

## Loyiha Tuzilmasi

```
kahoot-clone/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── dashboard/
│   │   ├── auth/
│   │   ├── game/
│   │   └── api/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── GameButton.tsx
│   ├── config/
│   │   └── theme.ts
│   ├── lib/
│   │   ├── api.ts
│   │   ├── utils.ts
│   │   └── mockData.ts
│   ├── store/
│   │   └── index.ts
│   └── types/
│       └── index.ts
├── prisma/
│   └── schema.prisma
├── public/
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Rivojlanish Bosqichlari

- [x] Loyiha tuzilmasi
- [x] Design system va theme
- [x] Prisma schema
- [x] Core komponentlar
- [x] Utility funktsiyalar
- [ ] Authentication sistema
- [ ] Dashboard sahifasi
- [ ] Test yaratish sahifasi
- [ ] O'yin xonasi
- [ ] Leaderboard
- [ ] AI Test Generatori
- [ ] Real-time WebSocket
- [ ] Testing

## Konfiguratsiya

### .env.local Namunasi

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/kahoot_clone"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# API
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# AI Models
GEMINI_API_KEY="your-gemini-api-key"

# Images
IMAGE_GENERATION_API_KEY="your-image-api-key"
```

## Debugging

### Database-ga Bog'lanish

```bash
# Prisma Studio-da ma'lumotlarni ko'rish
npx prisma studio
```

### Logs

```bash
# Development logs
npm run dev -- --debug
```

## Yo'l-Xaritalari

- Lokalizatsiya (uz, en, ru)
- Offline rejim
- Export test natijolari
- Advanced analytics
- Marketplace

## Mualliflar

- Development Team 2024

## Litsenziya

MIT

## Qo'llab-quvvatlash

Savollar yoki muammolar uchun [Issues](issues) yarating.

---

**Quvonch bilan o'rin, do'stlari bilan raqobatda!** 🎮🏆
