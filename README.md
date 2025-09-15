# 📖 e-Tymology

e-Tymology is an interactive web application that lets you explore the **origin and meaning of words** in an engaging way. Simply type a word (or let the app *surprise you* with a random one), and e-Tymology will reveal its modern meaning, century of origin, detailed etymology, and even a fun fact.  

---

## 🚀 Features

- 🔍 **Word Lookup** – Enter any word or phrase to discover its story.  
- 🎲 **Surprise Me Button** – Get a random word when you’re feeling curious.  
- 📝 **History Bar** – Keeps track of previously searched words.  
  - Select a past word to view its explanation again.  
  - Clear history or remove individual entries.  
- 🎨 **Light/Dark Mode** – Toggle between themes for comfortable reading.  
- ⏳ **Typing Effect** – Answers appear as if they are being typed in real time.  
- 📱 **Responsive Design** – Works seamlessly on mobile, tablet, and desktop.  

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js (App Router)](https://nextjs.org/) + [React](https://react.dev/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)  
- **Storage**: LocalStorage for saving history  
- **Backend**: Next.js API Route (`/api/chat`) – connects to your language/etymology service  

---

## 📂 Project Structure

e-tymology/
│
├── app/
│ ├── page.js # Main home page
│ ├── api/
│ │ └── chat/route.js # API endpoint for word lookup
│ └── components/
│ ├── Header.js # App header with title & dark mode toggle
│ ├── HistoryBar.js # Sidebar with word history
│
├── utils/
│ └── randomWord.js # Fetches a random word
│
├── public/ # Static assets
├── styles/ # Tailwind styles
└── README.md

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   git clone https://github.com/your-username/e-tymology.git
   cd e-tymology
2. **Run the development server:**
   npm run dev
3. **Open your browser:**
   http://localhost:3000
