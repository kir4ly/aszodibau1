import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home as HomeIcon, Building2, Hammer, ArrowRight, Grid3x3, Paintbrush } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import heroImage from "@/assets/hero-construction.jpg";
import logo from "@/assets/logo.png";
import gallery1 from "@/assets/gallery-1-new.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpg";
const Home = () => {
  const services = [{
    icon: HomeIcon,
    title: "Lakásfelújítás",
    description: "Lakásfelújítás - új élet az otthonban. Egy jól sikerült felújítás nemcsak a lakás megjelenését változtatja meg, hanem az egész életteret felfrissíti. Legyen szó konyháról, fürdőszobáról, burkolásról vagy teljes átalakításról - mi minden részletre odafigyelünk, hogy az elképzelésed valósággá váljon. Minőségi anyagokkal, precíz munkával és megbízható szakemberekkel dolgozunk, mert tudjuk: a lakásfelújítás nem csak munka - ez a Te otthonod. **Ha felújításról van szó, mi minőséget és a megbízhatóságot tartjuk legfontosabbnak!**"
  }, {
    icon: Hammer,
    title: "Kőműves munkák",
    description: "Kőműves munkák - erős alap a biztos jövőhöz. A jó kőműves munka minden építkezés lelke. Legyen szó alapozásról, falazásról, térkövezésről, válaszfalak vagy akár teljes házbővítésről - mi precizen, szakértelemmel és odafigyeléssel dolgozunk. Több éves tapasztalattal, minőségi anyagokkal és pontos kivitelezéssel biztosítjuk, hogy minden építmény tartós, biztonságos és esztétikus legyen. **Ha kőműves munkáról van szó, mi nem csak építünk - mi értéket teremtünk!**"
  }, {
    icon: Building2,
    title: "Homlokzatszigetelés",
    description: "Homlokzatszigetelés - mert az energia a falaknál kezdődik. A jó szigetelés nem luxus, hanem befektetés! Megtartja a meleget télen, a hűvöset nyáron, és jelentősen csökkenti a rezsiköltségeket. Emellett megóvja az épületet a nedvességtől és a penésztől, így otthona nemcsak szebb, hanem tartósabb is lesz. Mi a homlokzatszigetelést **precízen tapasztalattal és minőségi anyagokkal** végezzük - hogy az eredmény ne csak jól nézzen ki, hanem hosszú távon is megtérüljön. **Ha szigetelésről van szó, mi tudjuk, hogyan lesz tökéletes!**"
  }, {
    icon: Grid3x3,
    title: "Burkolás",
    description: "Burkolás - precizitás és tartósság a tökéletes otthonért. A burkolás az egyik legmeghatározóbb eleme egy lakásfelújításnak: nemcsak funkcionális, hanem esztétikai szerepe is kiemelkedő. Legyen szó csempéről, járólapról vagy egyedi mintázatú burkolatról, munkánkat mindig maximális precizitással és odafigyeléssel végezzük. Fontos számunkra a pontos előkészítés, a minőségi anyagok használata és a hibátlan kivitelezés, hogy az elkészült felület hosszú éveken át szép és tartós maradjon. **Célunk, hogy ügyfeleink elképzelései professzionális módon valósuljanak meg, és otthonuk valóban azt az érzést nyújtsa, amit megálmodtak.**"
  }, {
    icon: Paintbrush,
    title: "Festés",
    description: "Friss színek, megújult hangulat. A gondosan elvégzett festés az otthonfelújítás egyik leglátványosabb része: egy jól megválasztott szín, egy precíz ecsetvonás az egész lakás hangulatát képes megváltoztatni. Munkánkat mindig alapos előkészítéssel kezdjük – a falak javításától a megfelelő alapozásig –, hogy a végeredmény tökéletesen egyenletes és tartós legyen. Minőségi festékekkel dolgozunk, odafigyelve a részletekre és az ügyfelek elképzeléseire. **Célunk, hogy a frissen festett terek nemcsak szépek, hanem hosszú éveken át kifogástalanok maradjanak.**"
  }];
  const galleryImages = [{
    src: gallery7,
    alt: "Teljes lakásfelújítás tiszta kivitelezéssel"
  }, {
    src: gallery8,
    alt: "Modern fürdőszoba komplett átalakítás"
  }, {
    src: gallery9,
    alt: "Irodahelyiség kialakítás és felújítás"
  }, {
    src: gallery10,
    alt: "Mennyezeti LED világítás beépítése"
  }, {
    src: gallery11,
    alt: "Indirekt LED világítás kivitelezés"
  }];
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[800px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Aszódi Bau - Modern építőipari megoldások" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-in">
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
              Lakásfelújítástól a burkoláson, festésen és homlokzatszigetelésen át a kőműves munkákig mindent vállalunk,
              amire egy otthon felújításánál szükség lehet.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
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
                Foglalkozunk építőipari munkákkal – a lakásfelújítástól a burkoláson, festésen és homlokzatszigetelésen át
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
              Tekintsd meg legutóbbi munkáinkat – egyszerűen őszintén.
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