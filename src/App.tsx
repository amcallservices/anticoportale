import { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, ChevronDown, Star, Menu, X, Utensils, Heart, Users, MessageCircle } from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    document.querySelectorAll('section[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const menuItems = [
    {
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663499907442/P3pB2yNJeADn5bdCC3zARU/RISOTTOANTICOPORTALE_0c860b0e.jpeg',
      category: 'Primi Piatti',
      name: 'Risotto alla barbabietola',
      description: 'Risotto cremoso alla barbabietola con caprino fresco e semi di zucca tostati. Un piatto elegante e raffinato.',
    },
    {
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663499907442/P3pB2yNJeADn5bdCC3zARU/TAGLIATAANTICOPORTALE_aae8d60e.jpeg',
      category: 'Secondi Piatti',
      name: 'Tagliata di controfiletto',
      description: 'Controfiletto di qualità superiore, tagliato al momento, finito con sale Maldon e olio extravergine toscano.',
    },
    {
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663499907442/P3pB2yNJeADn5bdCC3zARU/DOLCEANTICOPORTALE_a1642393.jpeg',
      category: 'Dolci',
      name: 'Torta di mele alle mandorle',
      description: 'Torta morbida con mele fresche e mandorle, crema inglese vellutata e gelato artigianale alla vaniglia.',
    },
  ];

  const testimonials = [
    {
      text: 'Cena fantastica, torneremo sicuramente! I pappardelle al cinghiale erano semplicemente indimenticabili. Servizio attento e ambiente bellissimo.',
      author: 'Marco e Laura',
    },
    {
      text: 'Qualità incredibile e servizio perfetto. Siamo venuti per il nostro anniversario e ci hanno fatto sentire davvero speciali. La bistecca alla fiorentina era eccezionale.',
      author: 'Federico e Sara',
    },
    {
      text: 'Uno dei migliori ristoranti che abbiamo provato in Toscana. Atmosfera romantica, ingredienti freschissimi e un tiramisù da sogno. Torneremo presto!',
      author: 'Alessandro',
    },
    {
      text: 'Finalmente un ristorante che non delude! Ogni piatto era una sorpresa piacevole. Il personale è gentilissimo e professionale. Consiglio vivamente.',
      author: 'Giulia',
    },
    {
      text: 'Abbiamo festeggiato il compleanno di mia moglie qui e tutto era perfetto. Dalla prenotazione al dessert finale, un\'esperienza da 10 e lode.',
      author: 'Roberto',
    },
  ];

  const problems = [
    {
      title: 'Servizio lento e disattento',
      description: 'Aspetti mezz\'ora per ordinare, il cameriere sembra non vederti. La serata si trasforma in una prova di pazienza.',
    },
    {
      title: 'Qualità non all\'altezza',
      description: 'Ingredienti mediocri, piatti che sembrano usciti da un surgelato. Paghi tanto per ricevere poco.',
    },
    {
      title: 'Atmosfera deludente',
      description: 'Luci al neon, tavoli troppo vicini, rumore assordante. Impossibile godersi una cena tranquilla.',
    },
  ];

  const promises = [
    {
      icon: <Utensils className="w-8 h-8" />,
      title: 'Ingredienti selezionati',
      description: 'Prodotti locali e stagionali, scelti ogni mattina dai migliori fornitori della zona. La qualità si sente ad ogni boccone.',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Cucina con esperienza',
      description: 'Ricette della tradizione toscana reinterpretate con cura e passione. Ogni piatto racconta una storia.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Atmosfera unica',
      description: 'Un ambiente caldo e accogliente, perfetto per ogni occasione: dalla cena romantica alla serata in famiglia.',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a
            href="#"
            className={`font-serif text-2xl font-bold transition-colors ${
              isScrolled ? 'text-stone-900' : 'text-white'
            }`}
          >
            Antico Portale
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['Problemi', 'Promessa', 'Menu', 'Recensioni', 'Prenota'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace('è', 'e'))}
                className={`text-sm font-medium transition-colors hover:opacity-70 ${
                  isScrolled ? 'text-stone-600 hover:text-stone-900' : 'text-white/90 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 ${isScrolled ? 'text-stone-900' : 'text-white'}`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-xl transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {['Problemi', 'Promessa', 'Menu', 'Recensioni', 'Prenota'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace('è', 'e'))}
                className="block w-full text-left text-stone-700 hover:text-stone-900 font-medium py-2"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663499907442/P3pB2yNJeADn5bdCC3zARU/tavolo-romantico-FU7pUZcufZ3n5i4Mw9Qsio.webp')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/60 to-stone-900/90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-6 animate-fade-in-up">
            Capannole, Arezzo — Dal cuore della Toscana
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Scopri uno dei ristoranti
            <br />
            <span className="text-amber-400">più apprezzati</span> della zona
          </h1>
          <p className="text-stone-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Posti limitati — Prenota ora la tua serata indimenticabile
          </p>
          <button
            onClick={() => scrollToSection('prenota')}
            className="inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-600/30"
          >
            Prenota il tuo tavolo
          </button>
        </div>

        <button
          onClick={() => scrollToSection('problemi')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* Problems Section */}
      <section id="problemi" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('problemi') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 mb-6">
              Ti è mai capitato?
            </h2>
            <p className="text-stone-600 text-xl max-w-2xl mx-auto">
              Quante volte hai scelto un ristorante e sei rimasto deluso?
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <div
                key={index}
                className={`bg-stone-50 rounded-2xl p-8 border border-stone-200 hover:border-amber-300 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
                  visibleSections.has('problemi') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-amber-700 font-serif text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-stone-900 mb-4">{problem.title}</h3>
                <p className="text-stone-600 leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>

          <div
            className={`text-center mt-16 transition-all duration-1000 delay-500 ${
              visibleSections.has('problemi') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="font-serif text-2xl sm:text-3xl text-stone-900 italic">
              "Non deve essere così. Esiste un posto diverso."
            </p>
          </div>
        </div>
      </section>

      {/* Image Break */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663499907442/P3pB2yNJeADn5bdCC3zARU/tavolo-romantico-FU7pUZcufZ3n5i4Mw9Qsio.webp')`,
          }}
        >
          <div className="absolute inset-0 bg-stone-900/40" />
        </div>
      </section>

      {/* Promise Section */}
      <section id="promessa" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('promessa') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 mb-6">
              La nostra promessa
            </h2>
            <p className="text-stone-600 text-xl max-w-2xl mx-auto">
              Qui trovi un'esperienza diversa, pensata per farti tornare
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {promises.map((promise, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group ${
                  visibleSections.has('promessa') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                  {promise.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold text-stone-900 mb-4">{promise.title}</h3>
                <p className="text-stone-600 leading-relaxed">{promise.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('menu') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 mb-6">
              Il nostro menù
            </h2>
            <p className="text-stone-600 text-xl">Piatti che parlano da soli</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 ${
                  visibleSections.has('menu') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 bg-white">
                  <p className="text-amber-600 text-sm font-medium tracking-wide uppercase mb-2">
                    {item.category}
                  </p>
                  <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">{item.name}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`text-center mt-12 transition-all duration-1000 delay-500 ${
              visibleSections.has('menu') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <button
              onClick={() => scrollToSection('prenota')}
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
            >
              Scopri il menu completo
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="recensioni" className="py-24 bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('recensioni') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Cosa dicono i nostri clienti
            </h2>
            <p className="text-stone-400 text-xl">Parole che ci rendono orgogliosi</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-stone-800/50 backdrop-blur-sm rounded-2xl p-8 border border-stone-700/50 hover:border-amber-600/30 transition-all duration-500 ${
                  visibleSections.has('recensioni') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-stone-300 leading-relaxed mb-6">"{testimonial.text}"</p>
                <p className="text-amber-400 font-medium">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Break */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663499907442/P3pB2yNJeADn5bdCC3zARU/tavolo-romantico-FU7pUZcufZ3n5i4Mw9Qsio.webp')`,
          }}
        >
          <div className="absolute inset-0 bg-stone-900/30" />
        </div>
      </section>

      {/* Booking Section */}
      <section id="prenota" className="py-24 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 ${
              visibleSections.has('prenota') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 mb-6">
              Prenota il tuo tavolo
            </h2>
            <p className="text-stone-600 text-xl mb-12 max-w-2xl mx-auto">
              Posti limitati — Prenota subito la tua serata indimenticabile
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-stone-600 mb-10">
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Risposta immediata garantita
              </span>
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Nessuna carta di credito
              </span>
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Cancellazione gratuita
              </span>
            </div>

            <a
              href="tel:0559361217"
              className="inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white px-10 py-5 rounded-full font-semibold text-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-600/30"
            >
              <Phone className="w-6 h-6" />
              Chiama: 055 9361217
            </a>

            <p className="text-stone-500 mt-6">
              Oppure contattaci su WhatsApp: <a href="https://wa.me/393936328095" className="text-amber-600 hover:text-amber-700 font-medium">393 632 8095</a>
            </p>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/393936328095"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        aria-label="Contattaci su WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-stone-800 px-4 py-2 rounded-lg shadow-md text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Scrivici su WhatsApp
        </span>
      </a>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-4">Antico Portale</h3>
              <p className="text-stone-400 leading-relaxed">
                Un'esperienza culinaria autentica nel cuore della Toscana. Cucina tradizionale con ingredienti selezionati e un'atmosfera unica.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Dove siamo</h4>
              <div className="space-y-3 text-stone-400">
                <a
                  href="https://www.google.com/maps/search/Via+della+Bottega+37/A+Capannole+AR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-amber-400 transition-colors"
                >
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Via della Bottega 37/A<br />52021 Capannole, AR</span>
                </a>
                <a href="tel:0559361217" className="flex items-center gap-3 hover:text-amber-400 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>055 9361217</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Orari di apertura</h4>
              <div className="space-y-2 text-stone-400">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Mercoledì – Sabato</p>
                    <p>Solo cena</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Domenica</p>
                    <p>Pranzo e cena</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Lunedì – Martedì</p>
                    <p>Chiuso</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-800 mt-12 pt-8 text-center text-stone-500">
            <p>&copy; 2025 Antico Portale — Via della Bottega 37/A, 52021 Capannole (AR) — Tutti i diritti riservati</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
