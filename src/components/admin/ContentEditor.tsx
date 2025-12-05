import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Save, Trash2, Plus, Loader2 } from "lucide-react";
import { getContent, saveContent, deleteContent, type ContentItem } from "@/lib/supabase";

const ContentEditor = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [contentKey, setContentKey] = useState("");
  const [contentType, setContentType] = useState<"text" | "html">("text");
  const [contentValue, setContentValue] = useState("");
  const [contentSection, setContentSection] = useState("");

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setIsLoading(true);
    try {
      const data = await getContent();
      setContents(data);
    } catch (error) {
      toast.error("Hiba a tartalom betöltése során");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (content: ContentItem) => {
    setEditingId(content.id);
    setContentKey(content.key);
    setContentType(content.type);
    setContentValue(content.value);
    setContentSection(content.section || "");
  };

  const handleSave = async () => {
    if (!contentKey || !contentValue) {
      toast.error("A kulcs és érték mezők kötelezőek!");
      return;
    }

    setIsSaving(true);

    try {
      await saveContent({
        id: editingId,
        key: contentKey,
        type: contentType,
        value: contentValue,
        section: contentSection || null,
      });

      toast.success("Tartalom sikeresen mentve!");
      resetForm();
      await loadContent();
    } catch (error) {
      toast.error("Hiba a mentés során");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Biztosan törölni szeretnéd ezt a tartalmat?")) {
      return;
    }

    try {
      await deleteContent(id);
      toast.success("Tartalom sikeresen törölve!");
      await loadContent();
    } catch (error) {
      toast.error("Hiba a törlés során");
      console.error(error);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setContentKey("");
    setContentType("text");
    setContentValue("");
    setContentSection("");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? "Tartalom Szerkesztése" : "Új Tartalom Hozzáadása"}
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="content-key">Kulcs *</Label>
              <Input
                id="content-key"
                placeholder="Pl: hero_title, about_description"
                value={contentKey}
                onChange={(e) => setContentKey(e.target.value)}
                disabled={isSaving}
              />
              <p className="text-xs text-gray-500">
                Egyedi azonosító a tartalomhoz
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content-section">Szekció (opcionális)</Label>
              <Input
                id="content-section"
                placeholder="Pl: home, about, contact"
                value={contentSection}
                onChange={(e) => setContentSection(e.target.value)}
                disabled={isSaving}
              />
              <p className="text-xs text-gray-500">
                Az oldal melyik részéhez tartozik
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content-type">Típus</Label>
            <Select value={contentType} onValueChange={(value: "text" | "html") => setContentType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Szöveg</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content-value">Tartalom *</Label>
            <Textarea
              id="content-value"
              placeholder="Add meg a tartalmat..."
              value={contentValue}
              onChange={(e) => setContentValue(e.target.value)}
              disabled={isSaving}
              rows={6}
              className="font-mono text-sm"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={isSaving} className="flex-1">
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Mentés...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {editingId ? "Mentés" : "Hozzáadás"}
                </>
              )}
            </Button>
            {editingId && (
              <Button onClick={resetForm} variant="outline" disabled={isSaving}>
                Mégse
              </Button>
            )}
          </div>
        </div>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-4">Meglévő Tartalmak</h3>
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : contents.length === 0 ? (
          <p className="text-gray-500 text-center p-8">Még nincsenek tartalmak</p>
        ) : (
          <div className="grid gap-4">
            {contents.map((content) => (
              <Card key={content.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-semibold bg-gray-100 px-2 py-1 rounded">
                          {content.key}
                        </span>
                        <span className="text-xs text-gray-500 bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          {content.type}
                        </span>
                        {content.section && (
                          <span className="text-xs text-gray-500 bg-green-50 text-green-700 px-2 py-1 rounded">
                            {content.section}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2 mt-2">
                        {content.value}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(content)}>
                        Szerkesztés
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(content.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentEditor;
