import React, { useState } from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Droplets, Users, Award, Plus, Minus, Target, TrendingUp } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import { useCompassionateToast } from "@/hooks/useCompassionateToast";

const WaterSystem = () => {
  const { isSpanish } = useTranslation();
  const { showSuccess } = useCompassionateToast();
  const [glasses, setGlasses] = useState(0);
  const dailyGoal = 8;
  const progress = Math.min((glasses / dailyGoal) * 100, 100);

  const addWater = () => {
    if (glasses < 12) {
      setGlasses(prev => prev + 1);
      if (glasses + 1 >= dailyGoal) {
        showSuccess(
          isSpanish ? "¡Meta alcanzada!" : "Goal reached!", 
          isSpanish ? "Has bebido suficiente agua hoy. ¡Sigue así!" : "You've had enough water today. Keep it up!"
        );
      }
    }
  };

  const removeWater = () => {
    if (glasses > 0) {
      setGlasses(prev => prev - 1);
    }
  };

  return (
    <Page title={isSpanish ? "Sistema de Agua" : "Water System"}>
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <Droplets className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {isSpanish ? "Sistema de Agua Thrive" : "Thrive Water System"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {isSpanish 
              ? "Un enfoque innovador para el bienestar a través de la hidratación consciente."
              : "An innovative approach to wellness through mindful hydration."
            }
          </p>
        </div>

        {/* Daily Tracker */}
        <Card className="mb-8 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Target className="w-6 h-6" />
              {isSpanish ? "Tu Progreso de Hoy" : "Today's Progress"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {glasses} / {dailyGoal}
              </div>
              <p className="text-muted-foreground">
                {isSpanish ? "vasos de agua" : "glasses of water"}
              </p>
            </div>

            <Progress value={progress} className="h-4 bg-blue-100 dark:bg-blue-900" />

            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={removeWater}
                disabled={glasses === 0}
                className="border-blue-300 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-900"
              >
                <Minus className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                onClick={addWater}
                disabled={glasses >= 12}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8"
              >
                <Plus className="w-5 h-5 mr-2" />
                {isSpanish ? "Añadir Vaso" : "Add Glass"}
              </Button>
            </div>

            {glasses >= dailyGoal && (
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-green-600 dark:text-green-400 font-medium">
                  🎉 {isSpanish ? "¡Excelente! Has alcanzado tu meta diaria." : "Excellent! You've reached your daily goal."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-blue-100 dark:border-blue-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="w-6 h-6 text-blue-500" />
                {isSpanish ? "Seguimiento Diario" : "Daily Tracking"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {isSpanish 
                  ? "Registra tu consumo diario de agua y recibe recordatorios personalizados."
                  : "Track your daily water intake and receive personalized reminders."
                }
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-100 dark:border-green-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-green-500" />
                {isSpanish ? "Desafíos Comunitarios" : "Community Challenges"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {isSpanish 
                  ? "Participa en desafíos de hidratación con otros miembros de la comunidad."
                  : "Participate in hydration challenges with other community members."
                }
              </p>
            </CardContent>
          </Card>

          <Card className="border-yellow-100 dark:border-yellow-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-500" />
                {isSpanish ? "Logros y Recompensas" : "Achievements & Rewards"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {isSpanish 
                  ? "Gana insignias y recompensas por mantener buenos hábitos de hidratación."
                  : "Earn badges and rewards for maintaining good hydration habits."
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-center text-xl text-blue-800 dark:text-blue-200 flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {isSpanish ? "Consejos de Hidratación" : "Hydration Tips"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-blue-700 dark:text-blue-300">
              <li className="flex items-start gap-2">
                <span>💧</span>
                <span>{isSpanish ? "Bebe un vaso de agua al despertar." : "Drink a glass of water when you wake up."}</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🍽️</span>
                <span>{isSpanish ? "Bebe agua antes de cada comida." : "Drink water before each meal."}</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🏃</span>
                <span>{isSpanish ? "Aumenta tu consumo durante el ejercicio." : "Increase intake during exercise."}</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🍋</span>
                <span>{isSpanish ? "Añade limón o frutas para más sabor." : "Add lemon or fruits for flavor."}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
};

export default WaterSystem;
