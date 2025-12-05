import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, Trash2, Loader2 } from "lucide-react";
import { uploadImage, getImages, deleteImage, type GalleryImage } from "@/lib/supabase";

const ImageUploader = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setIsLoading(true);
    try {
      const data = await getImages();
      setImages(data);
    } catch (error) {
      toast.error("Hiba a képek betöltése során");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Válassz ki egy képet!");
      return;
    }

    setIsUploading(true);

    try {
      await uploadImage(selectedFile, imageTitle, imageDescription);
      toast.success("Kép sikeresen feltöltve!");

      setSelectedFile(null);
      setImageTitle("");
      setImageDescription("");
      const fileInput = document.getElementById("image-file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      await loadImages();
    } catch (error) {
      toast.error("Hiba a kép feltöltése során");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Biztosan törölni szeretnéd ezt a képet?")) {
      return;
    }

    try {
      await deleteImage(id, imageUrl);
      toast.success("Kép sikeresen törölve!");
      await loadImages();
    } catch (error) {
      toast.error("Hiba a kép törlése során");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleUpload} className="space-y-4 p-6 bg-white rounded-lg border">
        <div className="space-y-2">
          <Label htmlFor="image-file">Kép Kiválasztása</Label>
          <Input
            id="image-file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image-title">Cím (opcionális)</Label>
          <Input
            id="image-title"
            type="text"
            placeholder="Pl: Családi ház Budapesten"
            value={imageTitle}
            onChange={(e) => setImageTitle(e.target.value)}
            disabled={isUploading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image-description">Leírás (opcionális)</Label>
          <Input
            id="image-description"
            type="text"
            placeholder="Pl: 2024-ben befejezett projekt"
            value={imageDescription}
            onChange={(e) => setImageDescription(e.target.value)}
            disabled={isUploading}
          />
        </div>

        <Button type="submit" disabled={isUploading || !selectedFile} className="w-full">
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Feltöltés...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Kép Feltöltése
            </>
          )}
        </Button>
      </form>

      <div>
        <h3 className="text-lg font-semibold mb-4">Feltöltött Képek</h3>
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : images.length === 0 ? (
          <p className="text-gray-500 text-center p-8">Még nincsenek feltöltött képek</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={image.image_url}
                    alt={image.title || "Galéria kép"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  {image.title && (
                    <h4 className="font-semibold text-sm">{image.title}</h4>
                  )}
                  {image.description && (
                    <p className="text-xs text-gray-600">{image.description}</p>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(image.id, image.image_url)}
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Törlés
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
