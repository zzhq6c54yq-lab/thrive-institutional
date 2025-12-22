
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TrendingUp, Users, FileText, Target, Award, Calendar, MessageCircle, Download, BookOpen, Video, Briefcase } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";
import { getModuleRoute, getCourseRoute, getResourceRoute } from "@/utils/careerModuleRoutes";

const CareerCoaching = () => {
  const { isSpanish } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "",
    focusArea: "",
  });

  const handleDownload = (resourceType: string) => {
    toast({
      title: isSpanish ? "Descargando" : "Downloading",
      description: isSpanish ? `Descargando ${resourceType}...` : `Downloading ${resourceType}...`,
      duration: 2000
    });
  };

  const handleContinueModule = (title: string) => {
    const route = getModuleRoute(title);
    navigate(route);
  };

  const handleStartCourse = (title: string) => {
    const route = getCourseRoute(title);
    navigate(route);
  };

  const handleAccessResource = (title: string) => {
    const route = getResourceRoute(title);
    navigate(route);
  };

  const handleBookSession = () => {
    if (!bookingForm.date || !bookingForm.time || !bookingForm.focusArea) {
      toast({
        title: isSpanish ? "Información faltante" : "Missing Information",
        description: isSpanish 
          ? "Por favor completa todos los campos para reservar tu sesión." 
          : "Please complete all fields to book your session.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isSpanish ? "¡Sesión reservada!" : "Session Booked!",
      description: isSpanish 
        ? `Tu sesión de coaching ha sido programada para ${bookingForm.date} a las ${bookingForm.time}.` 
        : `Your coaching session has been scheduled for ${bookingForm.date} at ${bookingForm.time}.`,
    });

    setBookingForm({ date: "", time: "", focusArea: "" });
  };

  const handleRegisterEvent = (eventTitle: string) => {
    toast({
      title: isSpanish ? "¡Registro exitoso!" : "Registration Successful!",
      description: isSpanish 
        ? `Te has registrado para: ${eventTitle}` 
        : `You have registered for: ${eventTitle}`,
    });
  };

  const coachingAreas = [
    {
      title: isSpanish ? "Desarrollo Profesional" : "Career Development",
      description: isSpanish ? "Planifica tu crecimiento profesional a largo plazo" : "Plan your long-term professional growth",
      icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
      modules: 8,
      progress: 65
    },
    {
      title: isSpanish ? "Habilidades de Liderazgo" : "Leadership Skills",
      description: isSpanish ? "Desarrolla habilidades de liderazgo efectivo" : "Develop effective leadership capabilities",
      icon: <Users className="w-6 h-6 text-green-500" />,
      modules: 12,
      progress: 45
    },
    {
      title: isSpanish ? "Preparación de CV" : "Resume Building",
      description: isSpanish ? "Crea un CV profesional que destaque" : "Create a professional resume that stands out",
      icon: <FileText className="w-6 h-6 text-purple-500" />,
      modules: 6,
      progress: 80
    },
    {
      title: isSpanish ? "Establecimiento de Objetivos" : "Goal Setting",
      description: isSpanish ? "Define y alcanza objetivos profesionales claros" : "Define and achieve clear professional goals",
      icon: <Target className="w-6 h-6 text-orange-500" />,
      modules: 5,
      progress: 30
    }
  ];

  const resources = [
    {
      title: isSpanish ? "Evaluación de Carrera Completa" : "Complete Career Assessment",
      description: isSpanish ? "Evaluación integral de 45 minutos de tus fortalezas y objetivos" : "Comprehensive 45-minute assessment of your strengths and goals",
      type: "assessment",
      downloadable: isSpanish ? "Informe de Evaluación" : "Assessment Report"
    },
    {
      title: isSpanish ? "Biblioteca de Plantillas" : "Template Library",
      description: isSpanish ? "Más de 20 plantillas profesionales para CV, cartas y portafolios" : "20+ professional templates for resumes, cover letters, and portfolios",
      type: "templates",
      downloadable: isSpanish ? "Pack de Plantillas" : "Template Pack"
    },
    {
      title: isSpanish ? "Simulador de Entrevistas" : "Interview Simulator",
      description: isSpanish ? "Practica con más de 100 preguntas reales de entrevistas" : "Practice with 100+ real interview questions",
      type: "simulator",
      downloadable: isSpanish ? "Guía de Entrevistas" : "Interview Guide"
    },
    {
      title: isSpanish ? "Planificador de Objetivos 90 Días" : "90-Day Goal Planner",
      description: isSpanish ? "Sistema estructurado para alcanzar objetivos en 90 días" : "Structured system to achieve goals in 90 days",
      type: "planner",
      downloadable: isSpanish ? "Planificador PDF" : "Planner PDF"
    }
  ];

  const upcomingEvents = [
    {
      title: isSpanish ? "Masterclass: Networking Efectivo" : "Masterclass: Effective Networking",
      date: isSpanish ? "15 Ene, 2:00 PM" : "Jan 15, 2:00 PM",
      type: isSpanish ? "Masterclass" : "Masterclass",
      duration: "90 min"
    },
    {
      title: isSpanish ? "Sesión Individual de CV" : "1:1 Resume Review",
      date: isSpanish ? "18 Ene, 10:00 AM" : "Jan 18, 10:00 AM",
      type: isSpanish ? "Consulta Individual" : "One-on-One",
      duration: "60 min"
    },
    {
      title: isSpanish ? "Taller: Negociación Salarial" : "Workshop: Salary Negotiation",
      date: isSpanish ? "22 Ene, 3:00 PM" : "Jan 22, 3:00 PM",
      type: isSpanish ? "Taller Interactivo" : "Interactive Workshop",
      duration: "120 min"
    },
    {
      title: isSpanish ? "Panel: Líderes de la Industria" : "Panel: Industry Leaders",
      date: isSpanish ? "25 Ene, 6:00 PM" : "Jan 25, 6:00 PM",
      type: isSpanish ? "Panel de Expertos" : "Expert Panel",
      duration: "75 min"
    }
  ];

  const courses = [
    {
      title: isSpanish ? "Fundamentos del Liderazgo" : "Leadership Fundamentals",
      lessons: 15,
      duration: "4 hours",
      level: isSpanish ? "Principiante" : "Beginner"
    },
    {
      title: isSpanish ? "Comunicación Estratégica" : "Strategic Communication",
      lessons: 12,
      duration: "3.5 hours",
      level: isSpanish ? "Intermedio" : "Intermediate"
    },
    {
      title: isSpanish ? "Gestión de Equipos Remotos" : "Remote Team Management",
      lessons: 18,
      duration: "5 hours",
      level: isSpanish ? "Avanzado" : "Advanced"
    }
  ];

  return (
    <Page title={isSpanish ? "Orientación Profesional" : "Career Coaching"}>
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <TrendingUp className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {isSpanish ? "Centro de Orientación Profesional" : "Career Coaching Center"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isSpanish 
              ? "Tu plataforma integral para el desarrollo profesional con herramientas, recursos y coaching personalizado."
              : "Your comprehensive platform for professional development with tools, resources, and personalized coaching."
            }
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button 
            variant={activeTab === "dashboard" ? "default" : "outline"}
            onClick={() => setActiveTab("dashboard")}
          >
            {isSpanish ? "Panel Principal" : "Dashboard"}
          </Button>
          <Button 
            variant={activeTab === "courses" ? "default" : "outline"}
            onClick={() => setActiveTab("courses")}
          >
            {isSpanish ? "Cursos" : "Courses"}
          </Button>
          <Button 
            variant={activeTab === "resources" ? "default" : "outline"}
            onClick={() => setActiveTab("resources")}
          >
            {isSpanish ? "Recursos" : "Resources"}
          </Button>
          <Button 
            variant={activeTab === "coaching" ? "default" : "outline"}
            onClick={() => setActiveTab("coaching")}
          >
            {isSpanish ? "Coaching 1:1" : "1:1 Coaching"}
          </Button>
          <Button 
            variant={activeTab === "events" ? "default" : "outline"}
            onClick={() => setActiveTab("events")}
          >
            {isSpanish ? "Eventos" : "Events"}
          </Button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coachingAreas.map((area, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {area.icon}
                      {area.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{area.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>{area.modules} {isSpanish ? "módulos" : "modules"}</span>
                        <span>{area.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: `${area.progress}%`}}></div>
                      </div>
                    </div>
                    <Button size="sm" className="w-full" onClick={() => handleContinueModule(area.title)}>
                      {isSpanish ? "Continuar" : "Continue"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {isSpanish ? "Tu Progreso Profesional" : "Your Professional Progress"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">7</div>
                    <p className="text-gray-600">
                      {isSpanish ? "Objetivos completados" : "Goals completed"}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">12</div>
                    <p className="text-gray-600">
                      {isSpanish ? "Cursos completados" : "Courses completed"}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                    <p className="text-gray-600">
                      {isSpanish ? "Sesiones de coaching" : "Coaching sessions"}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">85%</div>
                    <p className="text-gray-600">
                      {isSpanish ? "Progreso general" : "Overall progress"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      {course.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>{course.lessons} {isSpanish ? "lecciones" : "lessons"}</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {course.level}
                      </div>
                      <Button className="w-full" onClick={() => handleStartCourse(course.title)}>
                        {isSpanish ? "Comenzar Curso" : "Start Course"}
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => handleDownload(`${course.title} Material`)}>
                        <Download className="mr-2 h-4 w-4" />
                        {isSpanish ? "Descargar Material" : "Download Materials"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === "resources" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => handleAccessResource(resource.title)}>
                      {isSpanish ? "Acceder" : "Access"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleDownload(resource.downloadable)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Coaching Tab */}
        {activeTab === "coaching" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                  {isSpanish ? "Reservar Sesión de Coaching" : "Book Coaching Session"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input 
                    placeholder={isSpanish ? "Seleccionar fecha" : "Select date"} 
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                  />
                  <select 
                    className="w-full p-2 border rounded"
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                  >
                    <option value="">{isSpanish ? "Seleccionar hora" : "Select time"}</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                  </select>
                  <Textarea 
                    placeholder={isSpanish ? "Describe tus objetivos para la sesión..." : "Describe your goals for the session..."}
                    value={bookingForm.focusArea}
                    onChange={(e) => setBookingForm({ ...bookingForm, focusArea: e.target.value })}
                  />
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleBookSession}>
                    {isSpanish ? "Reservar Sesión" : "Book Session"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isSpanish ? "Próximas Sesiones" : "Upcoming Sessions"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-800">
                      {isSpanish ? "Revisión de Objetivos Trimestrales" : "Quarterly Goals Review"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {isSpanish ? "Mañana, 10:00 AM" : "Tomorrow, 10:00 AM"}
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-800">
                      {isSpanish ? "Estrategia de Networking" : "Networking Strategy"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {isSpanish ? "Viernes, 2:00 PM" : "Friday, 2:00 PM"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-indigo-500" />
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>{event.date}</span>
                        <span>{event.duration}</span>
                      </div>
                      <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">
                        {event.type}
                      </span>
                      <div className="flex gap-2">
                        <Button className="flex-1" onClick={() => handleRegisterEvent(event.title)}>
                          {isSpanish ? "Registrarse" : "Register"}
                        </Button>
                        <Button variant="outline" onClick={() => handleDownload(`${event.title} Agenda`)}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};

export default CareerCoaching;
