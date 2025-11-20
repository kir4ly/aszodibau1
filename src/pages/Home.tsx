import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home as HomeIcon, Building2, Hammer, ArrowRight } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import heroImage from "@/assets/hero-building.png";
import logo from "@/assets/logo.png";
import gallery1 from "@/assets/gallery-1-new.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
const Home = () => {
  const services = [{
    icon: HomeIcon,
    title: "Lakásfelújítás",
    description: "Teljes körű lakásfelújítást vállalunk a bontástól a kulcsrakész átadásig. Konyha, fürdőszoba, nappali vagy teljes lakás modernizálása – megtervezzük, elvégezzük, átadjuk."
  }, {
    icon: Building2,
    title: "Homlokzatszigetelés",
    description: "Energiahatékony, korszerű homlokzatszigetelő rendszerek kivitelezése. Segítünk csökkenteni a fűtési költségeket és tartósan megóvni az épületet az időjárástól."
  }, {
    icon: Hammer,
    title: "Kőműves munkák",
    description: "Alapozás, falazás, válaszfalak, átalakítások – precíz, szakszerű kőműves munkák lakásoknál és kisebb épületeknél. Stabil szerkezet, tiszta, rendezett munkaterület."
  }];
  const galleryImages = [{
    src: gallery1,
    alt: "Teljes körű lakásfelújítás Kecskeméten - nappali és konyha"
  }, {
    src: gallery2,
    alt: "Homlokzatszigetelés referencia munka"
  }, {
    src: gallery3,
    alt: "Professzionális kőműves munkák"
  }, {
    src: gallery4,
    alt: "Modern fürdőszoba felújítás"
  }, {
    src: gallery5,
    alt: "Kortárs konyha átalakítás"
  }, {
    src: gallery6,
    alt: "Belső válaszfal építés"
  }];
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[800px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Aszódi Bau - Modern építőipari megoldások" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-in">
          <div className="inline-block bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl mb-8">
            <img src={logo} alt="Aszódi Bau - Haza hoztuk a minőséget" className="w-full max-w-sm mx-auto" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Építsük együtt álmaid otthonát
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Üdvözöljük az Aszódi Bau honlapján! Cégünk az építőiparban tevékenykedik, fő fókuszunk pedig a lakások felújítása. Célunk, hogy minőségi munkánkkal otthonossá és komfortossá tegyük ügyfeleink otthonát.
          </p>
          <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90 text-lg px-8 py-6 font-semibold">
            <Link to="/kapcsolat">Kapcsolatfelvétel</Link>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background" id="szolgaltatasok">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Szolgáltatásaink</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Lakásfelújítástól a homlokzatszigetelésen át a kőműves munkákig mindent vállalunk,
              amire egy otthon felújításánál szükség lehet.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {services.map((service, index) => <div key={index} className="animate-scale-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <ServiceCard {...service} />
              </div>)}
          </div>
        </div>
      </section>

      {/* About Section Preview */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Rólunk – Aszódi Bau</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Foglalkozunk építőipari munkákkal – a lakásfelújítástól a homlokzatszigetelésen át
                a kőműves munkákig. Célunk, hogy megbízható, minőségi kivitelezéssel segítsünk olyan
                otthont kialakítani, ahol valóban jó élni.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Minden projektet úgy kezelünk, mintha a saját otthonunkat újítanánk fel:
                odafigyeléssel, precizitással és korrekt kommunikációval.
              </p>
              <Button asChild variant="outline" size="lg">
                <Link to="/rolunk">
                  Tudj meg többet <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="animate-scale-in">
              <img src={gallery1} alt="Aszódi Bau építőipari referencia munka" className="rounded-lg shadow-xl w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Munkáinkból</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Néhány példa az általunk végzett lakásfelújításokra, homlokzatszigetelési és kőműves
              munkákra. A galériában még több elkészült projektet találsz.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {galleryImages.map((image, index) => <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg animate-scale-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <img src={image.src} alt={image.alt} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"></div>
              </div>)}
          </div>
          <div className="text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-accent">
              <Link to="/kepgaleria">
                Tovább a képgalériához <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <p className="text-sm uppercase tracking-wider mb-4">LÉPJ VELÜNK KAPCSOLATBA!</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Építsük együtt álmaid otthonát!</h2>
              <p className="text-lg mb-8 opacity-90">
                Kérj ajánlatot, egyeztessünk a terveidről, és megmutatjuk, hogyan lesz belőlük valóság.
              </p>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/kapcsolat">Kapcsolatfelvétel</Link>
              </Button>
            </div>
            <div className="space-y-6">
              <div className="bg-white text-foreground p-8 rounded-lg shadow-xl animate-scale-in">
                <h3 className="text-2xl font-bold mb-6 text-primary">Aszódi Bau</h3>
                <div className="space-y-4">
                  <p className="flex items-start">
                    <span className="font-semibold mr-2">Cím:</span>
                    <span>6000 Kecskemét, Kossuth Lajos u. 60.</span>
                  </p>
                  <p className="flex items-start">
                    <span className="font-semibold mr-2">Telefon:</span>
                    <a href="tel:+36304372393" className="hover:text-primary transition-colors">
                      +36 30 437 23 93
                    </a>
                  </p>
                  <p className="flex items-start">
                    <span className="font-semibold mr-2">Email:</span>
                    <a href="mailto:aszodibau@gmail.com" className="hover:text-primary transition-colors">
                      aszodibau@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              
              {/* Map */}
              <Card className="animate-scale-in" style={{
              animationDelay: "0.1s"
            }}>
                <CardContent className="p-0">
                  <iframe src="https://www.google.com/maps?q=Kecskemét,+Kossuth+Lajos+u.+60&output=embed" width="100%" height="300" style={{
                  border: 0
                }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg" title="Aszódi Bau helyszíne - Kecskemét, Kossuth Lajos u. 60"></iframe>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;