import { useState } from "react";
import { Button } from "@/components/ui/button";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const Gallery = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const galleryItems = [
    {
      src: gallery1,
      alt: "Teljes körű lakásfelújítás Kecskeméten - nappali és konyha átalakítása",
      category: "renovation",
      caption: "Teljes körű lakásfelújítás Kecskeméten – nappali és konyha átalakítása.",
    },
    {
      src: gallery2,
      alt: "Homlokzatszigetelés referencia munka",
      category: "insulation",
      caption: "Energiahatékony homlokzatszigetelés modern technikával.",
    },
    {
      src: gallery3,
      alt: "Professzionális kőműves munkák",
      category: "masonry",
      caption: "Precíz kőműves munka lakásépítésnél.",
    },
    {
      src: gallery4,
      alt: "Modern fürdőszoba felújítás",
      category: "renovation",
      caption: "Teljes fürdőszoba felújítás kortárs stílusban.",
    },
    {
      src: gallery5,
      alt: "Kortárs konyha átalakítás",
      category: "renovation",
      caption: "Modern konyha kialakítás egyedi bútorokkal.",
    },
    {
      src: gallery6,
      alt: "Belső válaszfal építés",
      category: "masonry",
      caption: "Belső terek átalakítása új válaszfalakkal.",
    },
    {
      src: gallery1,
      alt: "Nappali felújítás modern berendezéssel",
      category: "renovation",
      caption: "Nappali teljes körű felújítása és berendezése.",
    },
    {
      src: gallery2,
      alt: "Külső hőszigetelés munkálatok",
      category: "insulation",
      caption: "Homlokzatszigetelés kivitelezés folyamatban.",
    },
    {
      src: gallery3,
      alt: "Kőműves falazási munkák",
      category: "masonry",
      caption: "Alapozási és falazási munkák szakszerűen.",
    },
    {
      src: gallery4,
      alt: "Fürdőszoba csempézés",
      category: "renovation",
      caption: "Professzionális csempézési munkák fürdőszobában.",
    },
    {
      src: gallery5,
      alt: "Konyha komplett átalakítás",
      category: "renovation",
      caption: "Konyha teljes átalakítása új elrendezéssel.",
    },
    {
      src: gallery6,
      alt: "Belső építési munkák",
      category: "masonry",
      caption: "Belső terek átalakítása és modernizálása.",
    },
  ];

  const filters = [
    { id: "all", label: "Összes projekt" },
    { id: "renovation", label: "Lakásfelújítás" },
    { id: "insulation", label: "Homlokzatszigetelés" },
    { id: "masonry", label: "Kőműves munkák" },
  ];

  const filteredItems =
    selectedFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedFilter);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Képgaléria – Referenciáink</h1>
            <p className="text-xl md:text-2xl opacity-90">
              Válogatás az elkészült munkáinkból. Lakásfelújítások, homlokzatszigetelés és kőműves
              munkák Kecskeméten és környékén. A képek valós projekteket mutatnak be, ahol az
              Aszódi Bau csapata dolgozott.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                onClick={() => setSelectedFilter(filter.id)}
                className={
                  selectedFilter === filter.id
                    ? "bg-primary hover:bg-accent"
                    : "hover:bg-secondary"
                }
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg animate-scale-in"
                style={{ animationDelay: `${(index % 6) * 0.1}s` }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-sm font-medium">{item.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center animate-fade-in">
            <p className="text-xl text-muted-foreground mb-6">
              Tetszik, amit látsz? Lépj kapcsolatba velünk, és beszéljük meg a Te projektedet is!
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-accent">
              <a href="/kapcsolat">Ajánlatkérés</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
