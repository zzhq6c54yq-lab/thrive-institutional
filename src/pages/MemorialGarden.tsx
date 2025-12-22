
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import { Flower, Heart, Star, Upload, Save, Share2 } from "lucide-react";

const MemorialGarden: React.FC = () => {
  const { isSpanish } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [memorialData, setMemorialData] = useState({
    name: "",
    dates: "",
    tribute: "",
    favoriteMemory: "",
    personalMessage: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setMemorialData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveMemorial = () => {
    if (!memorialData.name.trim()) {
      toast({
        title: isSpanish ? "Campo requerido" : "Required Field",
        description: isSpanish ? "Por favor ingresa un nombre" : "Please enter a name",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: isSpanish ? "Memorial Guardado" : "Memorial Saved",
      description: isSpanish ? "Tu tributo ha sido guardado en el jardín memorial" : "Your tribute has been saved to the memorial garden",
      duration: 3000
    });
  };

  const handleShareMemorial = () => {
    toast({
      title: isSpanish ? "Enlace Copiado" : "Link Copied",
      description: isSpanish ? "El enlace del memorial ha sido copiado al portapapeles" : "Memorial link has been copied to clipboard",
      duration: 2000
    });
  };

  return (
    <Page title={isSpanish ? "Jardín Memorial Virtual" : "Virtual Memorial Garden"} returnToMain>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Flower className="h-8 w-8 text-rose-500 mr-3" />
            <h1 className="text-3xl font-bold text-rose-600 dark:text-rose-400">
              {isSpanish ? "Jardín Memorial Virtual" : "Virtual Memorial Garden"}
            </h1>
            <Star className="h-8 w-8 text-amber-500 ml-3" />
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {isSpanish 
              ? "Crea un espacio sagrado y hermoso para honrar la memoria de tu ser querido"
              : "Create a beautiful, sacred space to honor the memory of your loved one"}
          </p>
        </div>

        <div className="bg-gradient-to-r from-rose-50 to-purple-50 dark:from-rose-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-rose-200 dark:border-rose-800/30 mb-8">
          <p className="text-gray-700 dark:text-gray-300 italic text-center text-lg leading-relaxed">
            {isSpanish 
              ? "\"Un jardín memorial es un lugar donde los recuerdos florecen eternamente, donde el amor trasciende el tiempo y donde cada flor representa un momento precioso compartido.\""
              : "\"A memorial garden is a place where memories bloom eternally, where love transcends time, and where every flower represents a precious moment shared.\""}
          </p>
        </div>

        <Card className="border-2 border-rose-200 dark:border-rose-900/30">
          <CardHeader>
            <CardTitle className="text-rose-600 dark:text-rose-400 flex items-center">
              <Heart className="h-6 w-6 mr-2" />
              {isSpanish ? "Crear Tributo Memorial" : "Create Memorial Tribute"}
            </CardTitle>
            <CardDescription>
              {isSpanish 
                ? "Comparte recuerdos hermosos y honra la vida de tu ser querido"
                : "Share beautiful memories and honor your loved one's life"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isSpanish ? "Nombre completo" : "Full Name"}
                </label>
                <Input
                  placeholder={isSpanish ? "Nombre de tu ser querido" : "Your loved one's name"}
                  value={memorialData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isSpanish ? "Fechas" : "Dates"}
                </label>
                <Input
                  placeholder={isSpanish ? "Ej: 1950 - 2024" : "e.g., 1950 - 2024"}
                  value={memorialData.dates}
                  onChange={(e) => handleInputChange('dates', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {isSpanish ? "Tributo Personal" : "Personal Tribute"}
              </label>
              <Textarea
                placeholder={isSpanish 
                  ? "Escribe unas palabras hermosas sobre quién era esta persona..."
                  : "Write beautiful words about who this person was..."}
                value={memorialData.tribute}
                onChange={(e) => handleInputChange('tribute', e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {isSpanish ? "Recuerdo Favorito" : "Favorite Memory"}
              </label>
              <Textarea
                placeholder={isSpanish 
                  ? "Comparte un recuerdo especial que atesoras..."
                  : "Share a special memory you treasure..."}
                value={memorialData.favoriteMemory}
                onChange={(e) => handleInputChange('favoriteMemory', e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {isSpanish ? "Mensaje Personal" : "Personal Message"}
              </label>
              <Textarea
                placeholder={isSpanish 
                  ? "Un mensaje final de amor y despedida..."
                  : "A final message of love and farewell..."}
                value={memorialData.personalMessage}
                onChange={(e) => handleInputChange('personalMessage', e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="border-2 border-dashed border-rose-300 dark:border-rose-700 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-rose-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {isSpanish ? "Sube fotos especiales" : "Upload special photos"}
              </p>
              <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                {isSpanish ? "Seleccionar fotos" : "Select Photos"}
              </Button>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                onClick={handleSaveMemorial}
                className="bg-rose-500 hover:bg-rose-600 text-white flex-1"
              >
                <Save className="mr-2 h-4 w-4" />
                {isSpanish ? "Guardar Memorial" : "Save Memorial"}
              </Button>
              <Button 
                onClick={handleShareMemorial}
                variant="outline"
                className="border-rose-500 text-rose-600 hover:bg-rose-50 flex-1"
              >
                <Share2 className="mr-2 h-4 w-4" />
                {isSpanish ? "Compartir" : "Share"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="border-rose-200 dark:border-rose-900/30">
            <CardContent className="p-6 text-center">
              <Flower className="h-8 w-8 mx-auto text-rose-500 mb-3" />
              <h3 className="font-semibold text-rose-600 dark:text-rose-400 mb-2">
                {isSpanish ? "Flores Virtuales" : "Virtual Flowers"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isSpanish 
                  ? "Deja flores virtuales en memoria"
                  : "Leave virtual flowers in memory"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-rose-200 dark:border-rose-900/30">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto text-pink-500 mb-3" />
              <h3 className="font-semibold text-pink-600 dark:text-pink-400 mb-2">
                {isSpanish ? "Libro de Condolencias" : "Condolence Book"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isSpanish 
                  ? "Mensajes de amor y apoyo"
                  : "Messages of love and support"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-rose-200 dark:border-rose-900/30">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto text-amber-500 mb-3" />
              <h3 className="font-semibold text-amber-600 dark:text-amber-400 mb-2">
                {isSpanish ? "Galería de Recuerdos" : "Memory Gallery"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isSpanish 
                  ? "Fotos y videos especiales"
                  : "Special photos and videos"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Page>
  );
};

export default MemorialGarden;
