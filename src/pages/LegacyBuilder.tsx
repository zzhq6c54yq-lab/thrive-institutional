
import React, { useState } from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import { Star, Heart, BookOpen, Users, Lightbulb, Award, Target, Plus } from "lucide-react";

const LegacyBuilder: React.FC = () => {
  const { isSpanish } = useTranslation();
  const { toast } = useToast();
  
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    goal: "",
    impact: ""
  });

  const legacyTypes = [
    {
      id: "scholarship",
      title: isSpanish ? "Beca Educativa" : "Educational Scholarship",
      description: isSpanish ? "Ayuda estudiantes a lograr sus sueños educativos" : "Help students achieve their educational dreams",
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      examples: isSpanish ? "Beca universitaria, programa de becas de escuela secundaria" : "College scholarship, high school scholarship program"
    },
    {
      id: "research",
      title: isSpanish ? "Fondo de Investigación" : "Research Fund",
      description: isSpanish ? "Apoya la investigación médica para salvar vidas" : "Support medical research to save lives",
      icon: <Target className="h-6 w-6 text-green-500" />,
      examples: isSpanish ? "Investigación del cáncer, estudios de tratamiento" : "Cancer research, treatment studies"
    },
    {
      id: "community",
      title: isSpanish ? "Proyecto Comunitario" : "Community Project",
      description: isSpanish ? "Crea cambios positivos en tu comunidad local" : "Create positive change in your local community",
      icon: <Users className="h-6 w-6 text-purple-500" />,
      examples: isSpanish ? "Jardín comunitario, centro para jóvenes" : "Community garden, youth center"
    },
    {
      id: "foundation",
      title: isSpanish ? "Fundación Benéfica" : "Charitable Foundation",
      description: isSpanish ? "Establece una organización duradera para ayudar a otros" : "Establish a lasting organization to help others",
      icon: <Heart className="h-6 w-6 text-rose-500" />,
      examples: isSpanish ? "Fundación familiar, organización benéfica" : "Family foundation, charitable organization"
    }
  ];

  const handleCreateProject = () => {
    if (!projectData.name.trim()) {
      toast({
        title: isSpanish ? "Campo requerido" : "Required Field",
        description: isSpanish ? "Por favor ingresa un nombre para el proyecto" : "Please enter a project name",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: isSpanish ? "¡Proyecto de Legado Creado!" : "Legacy Project Created!",
      description: isSpanish ? "Tu proyecto ha sido guardado y está listo para desarrollar" : "Your project has been saved and is ready to develop",
      duration: 3000
    });
  };

  return (
    <Page title={isSpanish ? "Constructor de Legados" : "Legacy Builder"} returnToMain>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-amber-500 mr-3" />
            <h1 className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {isSpanish ? "Constructor de Legados" : "Legacy Builder"}
            </h1>
            <Award className="h-8 w-8 text-amber-500 ml-3" />
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            {isSpanish 
              ? "Transforma tu amor en acción. Crea proyectos significativos que honren la memoria de tu ser querido mientras ayudas a otros."
              : "Transform your love into action. Create meaningful projects that honor your loved one's memory while helping others."}
          </p>
        </div>

        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="explore">{isSpanish ? "Explorar Ideas" : "Explore Ideas"}</TabsTrigger>
            <TabsTrigger value="create">{isSpanish ? "Crear Proyecto" : "Create Project"}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="explore" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {legacyTypes.map((type) => (
                <Card key={type.id} className="border-2 border-amber-200 dark:border-amber-900/30 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      {type.icon}
                      <CardTitle className="text-lg">{type.title}</CardTitle>
                    </div>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                          {isSpanish ? "Ejemplos:" : "Examples:"}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{type.examples}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full border-amber-300 text-amber-600 hover:bg-amber-50"
                        onClick={() => {
                          toast({
                            title: isSpanish ? "Inspiración guardada" : "Inspiration saved",
                            description: isSpanish ? `Ideas de ${type.title} añadidas a tu cuaderno` : `${type.title} ideas added to your notebook`,
                            duration: 2000
                          });
                        }}
                      >
                        <Lightbulb className="mr-2 h-4 w-4" />
                        {isSpanish ? "Explorar más" : "Explore More"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-2 border-amber-300 dark:border-amber-700/50">
              <CardHeader>
                <CardTitle className="text-amber-600 dark:text-amber-400 flex items-center">
                  <Heart className="mr-2 h-6 w-6" />
                  {isSpanish ? "Ideas Personalizadas" : "Personalized Ideas"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {isSpanish 
                    ? "¿No estás seguro de por dónde empezar? Responde algunas preguntas sobre tu ser querido y te ayudaremos a encontrar el proyecto perfecto."
                    : "Not sure where to start? Answer a few questions about your loved one and we'll help you find the perfect project."}
                </p>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  {isSpanish ? "Comenzar Cuestionario" : "Start Questionnaire"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card className="border-2 border-amber-200 dark:border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-600 dark:text-amber-400">
                  {isSpanish ? "Detalles del Proyecto" : "Project Details"}
                </CardTitle>
                <CardDescription>
                  {isSpanish 
                    ? "Comparte tu visión para este proyecto de legado"
                    : "Share your vision for this legacy project"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isSpanish ? "Nombre del Proyecto" : "Project Name"}
                  </label>
                  <Input
                    placeholder={isSpanish ? "Ej: Beca Conmemorativa María González" : "e.g., Maria González Memorial Scholarship"}
                    value={projectData.name}
                    onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isSpanish ? "Descripción" : "Description"}
                  </label>
                  <Textarea
                    placeholder={isSpanish 
                      ? "Describe qué hará este proyecto y por qué es importante..."
                      : "Describe what this project will do and why it matters..."}
                    value={projectData.description}
                    onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isSpanish ? "Objetivo Principal" : "Main Goal"}
                  </label>
                  <Input
                    placeholder={isSpanish ? "¿Qué esperas lograr?" : "What do you hope to achieve?"}
                    value={projectData.goal}
                    onChange={(e) => setProjectData(prev => ({ ...prev, goal: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isSpanish ? "Impacto Esperado" : "Expected Impact"}
                  </label>
                  <Textarea
                    placeholder={isSpanish 
                      ? "¿Cómo ayudará este proyecto a otros?"
                      : "How will this project help others?"}
                    value={projectData.impact}
                    onChange={(e) => setProjectData(prev => ({ ...prev, impact: e.target.value }))}
                  />
                </div>

                <Button 
                  onClick={handleCreateProject}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                >
                  <Star className="mr-2 h-4 w-4" />
                  {isSpanish ? "Crear Proyecto de Legado" : "Create Legacy Project"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Page>
  );
};

export default LegacyBuilder;
