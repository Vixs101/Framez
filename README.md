# Framez - Social Media App

A mobile social application built with React Native and Expo Router.

## 🚀 Features

- User authentication (signup, login, logout)
- Create posts with images and captions
- Real-time feed of all posts
- User profile with personal posts
- Light/Dark theme support
- Responsive design

## 🛠️ Tech Stack

- **Frontend:** React Native, Expo Router, NativeWind (Tailwind CSS)
- **Backend:** Supabase (Auth, Database, Storage)
- **State Management:** React Context API
- **Image Handling:** Expo Image Picker
- **Icons:** Lucide React Native

## 📱 Installation

\`\`\`bash
Clone repository
git clone git@github.com:Vixs101/Framez.git
cd Framez

Install dependencies
npm install

Start development server
npx expo start
\`\`\`

## 🔧 Configuration

1. Create a Supabase project at https://supabase.com
2. Copy `.env.example` to `.env`
3. Add your Supabase credentials:

\`\`\`
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
\`\`\`


## 🎥 Demo Video

[(https://drive.google.com/drive/folders/1WiPFgf6VGDBCterd-QRfzkJBuv8qePZ8?usp=sharing)]

## 🌐 Live Demo

Try it on Appetize.io: [(https://appetize.io/app/b_f4ejajrzcdpoamyeyokf4fqpfa)]

## 👤 Author

Elijah Victor - [@Vixs101]

## 📄 License

MIT License
\`\`\`

---

## 📊 Deployment Checklist

Before final submission:

- [ ] All features work correctly
- [ ] No console errors
- [ ] Images upload successfully
- [ ] Authentication persists
- [ ] Dark mode works
- [ ] APK/IPA built successfully
- [ ] Appetize.io link works
- [ ] Demo video recorded (2-3 min)
- [ ] GitHub repo is public
- [ ] README.md is complete
- [ ] Clean commit history
- [ ] All screenshots added

---

## 🐛 Common Build Issues

### Issue 1: Build fails with "Invalid identifier"
**Fix:** Update bundle identifier in app.json to match your Expo account

### Issue 2: "Environment variables not found"
**Fix:** EAS builds don't use .env files. Add secrets:
```bash
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value your_value
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value your_value
```

### Issue 3: APK too large (>200MB)
**Fix:** Enable Hermes in app.json:
```json
"android": {
  "jsEngine": "hermes"
}
```

### Issue 4: Appetize.io session expires quickly
**Fix:** This is normal for free tier. Share the link, users get 2 min sessions.

---
