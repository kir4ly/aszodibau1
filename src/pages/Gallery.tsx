import { useState } from "react";
import { Button } from "@/components/ui/button";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpg";

const Gallery = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const galleryItems = [
    {
      src: gallery7,
      alt: "Teljes lakásfelújítás tiszta kivitelezéssel",
      category: "renovation",
      caption: "Komplett szobafestés és padlóburkolat cseréje.",
    },
    {
      src: gallery8,
      alt: "Modern fürdőszoba komplett átalakítás",
      category: "renovation",
      caption: "Fahatású csempe burkolat és modern zuhanyzó kialakítás.",
    },
    {
      src: gallery9,
      alt: "Irodahelyiség kialakítás és felújítás",
      category: "renovation",
      caption: "Teljes körű felújítás irodai környezethez, beépített bútorokkal.",
    },
    {
      src: gallery10,
      alt: "Mennyezeti LED világítás beépítése",
      category: "renovation",
      caption: "Modern LED szalagos mennyezet világítás kialakítása.",
    },
    {
      src: gallery11,
      alt: "Indirekt LED világítás kivitelezés",
      category: "renovation",
      caption: "Elegáns kerületi LED világítás szobákhoz.",
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
