import { ExternalLink, Share2, Car, Wrench, Club, Sun, Moon, Info, History, Recycle, ArrowRight, Globe } from 'lucide-react';
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
      return true; // Default to dark mode
    }
    return true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans transition-colors duration-300">
      <header className="relative overflow-hidden bg-melli-blue dark:bg-gray-800 py-16 px-4 shadow-2xl">
        {/* Theme Toggle Integrated in Hero */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-melli-accent"
            aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {isDarkMode ? <Sun className="w-6 h-6" aria-hidden="true" /> : <Moon className="w-6 h-6" aria-hidden="true" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleShare('https://grupomelliautomocion.com/', 'Grupo Melli Automoción')}
            className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-melli-accent"
            aria-label="Compartir sitio web"
          >
            <Share2 className="w-6 h-6" aria-hidden="true" />
          </motion.button>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 60, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute -top-1/2 -left-1/4"
          >
            <Recycle className="w-[600px] h-[600px]" />
          </motion.div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-20 opacity-20">
              {[Car, Wrench, Recycle, Globe, Club, ExternalLink].map((Icon, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -20, 0],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{ 
                    duration: 4 + i, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <Icon className="w-16 h-16" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="h-24 w-24 md:h-32 md:w-32 mb-8 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center p-4 shadow-xl border border-white/20"
          >
            <img
              src="https://melliautomociongrupo.com/wp-content/uploads/sites/331/2024/07/logo-GRUPO-MELLI-AUTOMOCION-blanco-1024x1024.png"
              alt="Logotipo de Grupo Melli Automoción"
              className="h-full w-auto object-contain drop-shadow-lg"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 drop-shadow-md text-center"
          >
            Grupo Melli Automoción
          </motion.h1>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 text-xs md:text-sm font-bold uppercase tracking-widest"
          >
            {[
              { label: 'Alquiler', color: 'bg-blue-500/20 text-blue-200 border-blue-400/30' },
              { label: 'Recambios', color: 'bg-orange-500/20 text-orange-200 border-orange-400/30' },
              { label: 'Talleres', color: 'bg-green-500/20 text-green-200 border-green-400/30' },
              { label: 'Automóviles', color: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/30' },
              { label: 'Aftermarket', color: 'bg-amber-500/20 text-amber-200 border-amber-400/30' }
            ].map((tag, i) => (
              <motion.span
                key={tag.label}
                animate={{ 
                  y: [0, -3],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  delay: i * 0.3,
                  ease: "easeInOut" 
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.25)",
                  y: 0
                }}
                className={`px-4 py-1.5 rounded-full border backdrop-blur-md transition-all cursor-default ${tag.color}`}
              >
                {tag.label}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-blue-100 mt-6 font-medium text-lg max-w-2xl"
          >
            Líderes en Economía Circular: Soluciones integrales para tu vehículo desde 1980
          </motion.p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 pb-20">
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-20" 
          role="list"
        >
          {links.map((link, index) => (
            <motion.div
              key={link.name}
              role="listitem"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
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
        </motion.section>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="grid gap-12 lg:grid-cols-2 mb-20"
        >
          <motion.section 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 text-melli-blue dark:text-blue-300">
              <Info className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Quiénes Somos</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Grupo Melli Automoción es un referente en el sector automovilístico, ofreciendo soluciones integrales que abarcan desde el mantenimiento preventivo hasta la gestión de recambios y vehículos de ocasión. Nuestro compromiso es la excelencia en el servicio y la satisfacción total del cliente.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Contamos con instalaciones de vanguardia y un equipo de profesionales altamente cualificados dedicados a ofrecer repuestos, mantenimiento, reparación y alquiler de vehículos con la máxima garantía.
            </p>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 text-melli-blue dark:text-blue-300">
              <History className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Nuestra Historia</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Desde nuestra fundación en 1980, hemos evolucionado constantemente para adaptarnos a las necesidades del mercado. Lo que comenzó como un pequeño taller familiar se ha convertido en un grupo empresarial sólido y diversificado.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Más de cuatro décadas de experiencia nos avalan como expertos en el mundo del motor, manteniendo siempre los valores de confianza y cercanía que nos vieron nacer.
            </p>
          </motion.section>
        </motion.div>
      </main>

      <footer className="bg-melli-blue text-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <img
              src="https://melliautomociongrupo.com/wp-content/uploads/sites/331/2024/07/logo-GRUPO-MELLI-AUTOMOCION-blanco-1024x1024.png"
              alt="Logo Grupo Melli"
              className="h-12 w-auto"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="font-bold text-lg">Grupo Melli Automoción</h3>
              <p className="text-blue-200 text-sm">Desde 1980 a tu servicio</p>
            </div>
          </div>
          <div className="text-center md:text-right text-sm text-blue-100">
            <p>© {new Date().getFullYear()} Grupo Melli Automoción. Todos los derechos reservados.</p>
            <p className="mt-1">Soluciones integrales para tu vehículo.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
