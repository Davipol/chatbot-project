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

```
e-Tymology/
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
```
---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/e-Tymology.git
   cd e-Tymology
2. **Run the development server**
   ```bash
   npm run dev
3. **Open your browser**
   ```bash
   http://localhost:3000

## 🌱 Environment Variables

Create a `.env.local` file in the root directory and add your API keys or environment-specific variables. Example:
```bash
OPENROUTER_API_KEY=your_api_key_here
```
---

## 🔧 Usage

- Type a word or phrase in the input field.  
- Click **Ask** to fetch the word’s etymology.  
- Click **Surprise Me** to get a random word.  
- Use the **History Bar** to revisit past searches or clear them.  
- Toggle between **Light/Dark Mode** with the button in the header.

---

## 🌐 Live Deployment

The e-Tymology app is deployed and accessible online. You can try it without installing anything locally:

[Visit e-Tymology Live](https://e-tymology.vercel.app)

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork the repository.**

2. **Create a new branch** for your feature or bugfix:

   ```bash
   git checkout -b feature/your-feature-name
3. **Make your changes and commit them:**
   ```bash
   git commit -m "Add some feature"
4. **Push to your branch:**

   ```bash
   git push origin feature/your-feature-name
5. **Open a Pull Request** in the original repository.
   Please follow standard GitHub practices for commits and PR descriptions.

## 📄 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for more details.
