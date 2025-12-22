
import React, { useState } from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import { Heart, BookOpen, Users, Phone, Calendar, MessageCircle, Download, Star, Flower } from "lucide-react";

const GriefResources: React.FC = () => {
  const { isSpanish } = useTranslation();
  const { toast } = useToast();

  const handleResourceAccess = (resourceName: string) => {
    toast({
      title: isSpanish ? "Accediendo al Recurso" : "Accessing Resource",
      description: isSpanish ? `Abriendo ${resourceName}...` : `Opening ${resourceName}...`,
      duration: 2000
    });
  };

  const handleDownload = (fileName: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: isSpanish ? "Descarga Completada" : "Download Complete",
      description: isSpanish ? `${fileName} descargado exitosamente` : `${fileName} downloaded successfully`,
      duration: 3000
    });
  };

  const griefStagesContent = `
# Understanding the Stages of Grief After Cancer Loss

## The Five Stages of Grief
While everyone grieves differently, many people experience these common stages:

### 1. Denial
- "This can't be happening"
- Feeling numb or in shock
- Difficulty accepting the reality of loss
- May continue normal routines as if nothing has changed

### 2. Anger
- "Why them? Why now?"
- Anger at the disease, doctors, God, or even the deceased
- Feeling frustrated with others who don't understand
- Physical symptoms like tension or restlessness

### 3. Bargaining
- "If only I had done something different"
- Trying to make deals with God or the universe
- Focusing on "what if" scenarios
- Guilt about things said or not said

### 4. Depression
- Deep sadness and longing
- Feeling hopeless or empty
- Loss of interest in activities
- Changes in sleep and appetite

### 5. Acceptance
- Finding peace with the reality
- Ability to remember with more joy than pain
- Beginning to rebuild life
- Finding new meaning and purpose

## Important Reminders
- These stages don't always happen in order
- You may experience multiple stages at once
- It's normal to cycle back through stages
- There's no timeline for grief
- Everyone's journey is unique

Remember: Grief is love with nowhere to go. Allow yourself to feel and heal at your own pace.
`;

  const copingStrategiesContent = `
# Practical Coping Strategies for Cancer Grief

## Daily Coping Techniques

### Morning Rituals
- Start with gentle breathing exercises
- Set one small, achievable goal for the day
- Write three things you're grateful for
- Light a candle in their memory

### Throughout the Day
- Carry a meaningful object that reminds you of them
- Take breaks when emotions feel overwhelming
- Practice the "5-4-3-2-1" grounding technique
- Allow yourself to cry when you need to

### Evening Wind-Down
- Write in a grief journal
- Look at photos and share memories
- Practice gentle stretching or yoga
- Create a bedtime routine that brings comfort

## Healthy Expression of Grief
- Talk to trusted friends or family
- Join a support group
- Create art, music, or poetry
- Plant a garden or tree in their memory
- Volunteer for cancer-related causes

## When to Seek Professional Help
- Persistent thoughts of self-harm
- Inability to function in daily life for extended periods
- Substance abuse as a coping mechanism
- Extreme guilt or self-blame
- Complete isolation from others

## Remember
- Grief is not a problem to solve, but a process to experience
- Healing happens in waves, not straight lines
- Your love for them never dies, it just changes form
- It's okay to have good days and hard days
- Seeking help is a sign of strength, not weakness

You are not alone in this journey. Reach out when you need support.
`;

  return (
    <Page title={isSpanish ? "Recursos para el Duelo" : "Grief Resources"} returnToMain>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-rose-500 mr-3" />
            <h1 className="text-3xl font-bold text-rose-600 dark:text-rose-400">
              {isSpanish ? "Recursos para el Duelo por Cáncer" : "Cancer Grief Resources"}
            </h1>
            <Flower className="h-8 w-8 text-purple-500 ml-3" />
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            {isSpanish 
              ? "Recursos profesionales y apoyo especializado para navegar el proceso único de duelo después de perder a alguien por cáncer."
              : "Professional resources and specialized support for navigating the unique grief process after losing someone to cancer."}
          </p>
        </div>

        <Tabs defaultValue="understanding" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="understanding">{isSpanish ? "Comprender" : "Understanding"}</TabsTrigger>
            <TabsTrigger value="coping">{isSpanish ? "Afrontar" : "Coping"}</TabsTrigger>
            <TabsTrigger value="support">{isSpanish ? "Apoyo" : "Support"}</TabsTrigger>
            <TabsTrigger value="healing">{isSpanish ? "Sanación" : "Healing"}</TabsTrigger>
          </TabsList>

          <TabsContent value="understanding" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-rose-200 dark:border-rose-900/30">
                <CardHeader>
                  <CardTitle className="text-rose-600 dark:text-rose-400 flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    {isSpanish ? "Etapas del Duelo" : "Stages of Grief"}
                  </CardTitle>
                  <CardDescription>
                    {isSpanish 
                      ? "Comprende las etapas normales del proceso de duelo"
                      : "Understand the normal stages of the grief process"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                      onClick={() => handleResourceAccess(isSpanish ? "Etapas del Duelo" : "Stages of Grief")}
                    >
                      {isSpanish ? "Explorar Etapas" : "Explore Stages"}
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-rose-300 text-rose-600 hover:bg-rose-50"
                      onClick={() => handleDownload("Grief_Stages_Guide.txt", griefStagesContent)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {isSpanish ? "Descargar Guía" : "Download Guide"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 dark:border-purple-900/30">
                <CardHeader>
                  <CardTitle className="text-purple-600 dark:text-purple-400 flex items-center">
                    <Star className="mr-2 h-5 w-5" />
                    {isSpanish ? "Duelo Único por Cáncer" : "Unique Cancer Grief"}
                  </CardTitle>
                  <CardDescription>
                    {isSpanish 
                      ? "Aspectos específicos del duelo después de una batalla contra el cáncer"
                      : "Specific aspects of grief after a cancer battle"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• {isSpanish ? "Duelo anticipatorio durante el tratamiento" : "Anticipatory grief during treatment"}</li>
                    <li>• {isSpanish ? "Alivio complejo después del dolor" : "Complex relief after suffering"}</li>
                    <li>• {isSpanish ? "Culpa del sobreviviente" : "Survivor's guilt"}</li>
                    <li>• {isSpanish ? "Trauma del cuidador" : "Caregiver trauma"}</li>
                  </ul>
                  <Button 
                    className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white"
                    onClick={() => handleResourceAccess(isSpanish ? "Duelo por Cáncer" : "Cancer Grief")}
                  >
                    {isSpanish ? "Aprender Más" : "Learn More"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="coping" className="space-y-6">
            <Card className="border-2 border-blue-200 dark:border-blue-900/30">
              <CardHeader>
                <CardTitle className="text-blue-600 dark:text-blue-400">
                  {isSpanish ? "Estrategias de Afrontamiento Diario" : "Daily Coping Strategies"}
                </CardTitle>
                <CardDescription>
                  {isSpanish 
                    ? "Técnicas prácticas para manejar el duelo día a día"
                    : "Practical techniques for managing grief day by day"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => handleResourceAccess(isSpanish ? "Rutinas Matutinas" : "Morning Routines")}
                  >
                    {isSpanish ? "Rutinas Matutinas" : "Morning Routines"}
                  </Button>
                  <Button 
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleResourceAccess(isSpanish ? "Técnicas de Relajación" : "Relaxation Techniques")}
                  >
                    {isSpanish ? "Técnicas de Relajación" : "Relaxation Techniques"}
                  </Button>
                  <Button 
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                    onClick={() => handleResourceAccess(isSpanish ? "Expresión Creativa" : "Creative Expression")}
                  >
                    {isSpanish ? "Expresión Creativa" : "Creative Expression"}
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    onClick={() => handleDownload("Coping_Strategies.txt", copingStrategiesContent)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {isSpanish ? "Descargar Todo" : "Download All"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-green-200 dark:border-green-900/30">
                <CardHeader>
                  <CardTitle className="text-green-600 dark:text-green-400 flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    {isSpanish ? "Grupos de Apoyo" : "Support Groups"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {isSpanish 
                      ? "Conéctate con otros que comprenden tu pérdida"
                      : "Connect with others who understand your loss"}
                  </p>
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleResourceAccess(isSpanish ? "Grupos de Apoyo" : "Support Groups")}
                  >
                    {isSpanish ? "Encontrar Grupos" : "Find Groups"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-indigo-200 dark:border-indigo-900/30">
                <CardHeader>
                  <CardTitle className="text-indigo-600 dark:text-indigo-400 flex items-center">
                    <Phone className="mr-2 h-5 w-5" />
                    {isSpanish ? "Líneas de Crisis" : "Crisis Hotlines"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {isSpanish 
                      ? "Apoyo inmediato disponible 24/7"
                      : "Immediate support available 24/7"}
                  </p>
                  <Button 
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                    onClick={() => handleResourceAccess(isSpanish ? "Líneas de Crisis" : "Crisis Hotlines")}
                  >
                    {isSpanish ? "Ver Números" : "View Numbers"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-teal-200 dark:border-teal-900/30">
                <CardHeader>
                  <CardTitle className="text-teal-600 dark:text-teal-400 flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {isSpanish ? "Terapia Online" : "Online Therapy"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {isSpanish 
                      ? "Consejería profesional especializada en duelo"
                      : "Professional grief counseling"}
                  </p>
                  <Button 
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                    onClick={() => handleResourceAccess(isSpanish ? "Terapia Online" : "Online Therapy")}
                  >
                    {isSpanish ? "Comenzar Terapia" : "Start Therapy"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="healing" className="space-y-6">
            <Card className="border-2 border-amber-200 dark:border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-600 dark:text-amber-400">
                  {isSpanish ? "Camino hacia la Sanación" : "Path to Healing"}
                </CardTitle>
                <CardDescription>
                  {isSpanish 
                    ? "Recursos para encontrar esperanza y propósito después de la pérdida"
                    : "Resources for finding hope and purpose after loss"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-amber-600 dark:text-amber-400">
                      {isSpanish ? "Sanación Gradual" : "Gradual Healing"}
                    </h4>
                    <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                      <li>• {isSpanish ? "Crear nuevas rutinas significativas" : "Create meaningful new routines"}</li>
                      <li>• {isSpanish ? "Honrar su memoria de formas positivas" : "Honor their memory in positive ways"}</li>
                      <li>• {isSpanish ? "Reconstruir la identidad después de la pérdida" : "Rebuild identity after loss"}</li>
                      <li>• {isSpanish ? "Encontrar propósito en el dolor" : "Find purpose in the pain"}</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                      onClick={() => handleResourceAccess(isSpanish ? "Plan de Sanación" : "Healing Plan")}
                    >
                      {isSpanish ? "Crear Plan de Sanación" : "Create Healing Plan"}
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-amber-300 text-amber-600 hover:bg-amber-50"
                      onClick={() => handleResourceAccess(isSpanish ? "Historias de Esperanza" : "Stories of Hope")}
                    >
                      {isSpanish ? "Historias de Esperanza" : "Stories of Hope"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Page>
  );
};

export default GriefResources;
