import { ExternalLink, Share2, Car, Wrench, Club, Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const links = [
  { name: 'Rentacar', url: 'https://www.alandalusrentacar.com/', icon: Car },
  { name: 'Club Melli', url: 'https://clubmelliautomocion.com/', icon: Club },
  { name: 'Talleres Melli', url: 'https://talleresmelli.es/', icon: Wrench },
  { name: 'Desguaces Melli', url: 'https://desguacesmelli.com/', icon: Wrench },
  { name: 'Automoviles Melli', url: 'https://automovilesmelli.com/', icon: Car },
  { name: 'Espauner', url: 'https://embudo-espauner.vercel.app/', icon: ExternalLink },
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleShare = async (url: string, title: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Enlace copiado al portapapeles");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-end mb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-900 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-melli-blue dark:focus:ring-blue-400"
          aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {isDarkMode ? <Sun className="w-6 h-6" aria-hidden="true" /> : <Moon className="w-6 h-6" aria-hidden="true" />}
        </motion.button>
      </div>

      <header className="mb-12 text-center">
        <div className="mx-auto h-20 w-20 md:h-24 md:w-24 mb-6 bg-melli-blue rounded-xl flex items-center justify-center p-3 shadow-md">
          <img
            src="https://melliautomociongrupo.com/wp-content/uploads/sites/331/2024/07/logo-GRUPO-MELLI-AUTOMOCION-blanco-1024x1024.png"
            alt="Logotipo de Grupo Melli Automoción"
            className="h-full w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-melli-blue dark:text-blue-300 tracking-tight animate-glow">Grupo Melli Automoción</h1>
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mt-2 font-medium">Soluciones integrales para tu vehículo desde 1980</p>
      </header>

      <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto" role="list">
        {links.map((link) => (
          <motion.div
            key={link.name}
            role="listitem"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-melli-accent flex flex-col justify-between transition-colors"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-melli-blue/10 dark:bg-melli-blue/20 rounded-lg" aria-hidden="true">
                <link.icon className="w-8 h-8 text-melli-blue dark:text-blue-300" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{link.name}</h2>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => window.open(link.url, '_blank')}
                className="flex-1 bg-melli-blue dark:bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-melli-blue/90 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-melli-blue dark:focus:ring-blue-400"
                aria-label={`Visitar sitio web de ${link.name}`}
              >
                Visitar
              </button>
              <button
                onClick={() => handleShare(link.url, link.name)}
                className="p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-melli-blue dark:focus:ring-blue-400"
                aria-label={`Compartir enlace de ${link.name}`}
              >
                <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        ))}
      </main>
    </div>
  );
}
