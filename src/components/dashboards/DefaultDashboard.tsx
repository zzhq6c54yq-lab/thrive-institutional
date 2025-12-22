
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Heart, Users, BookOpen, Calendar, Activity } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const DefaultDashboard: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to Omni Solus, {user?.email?.split('@')[0] || 'Friend'}
          </h1>
          <p className="text-blue-200 text-lg">
            Your journey to better mental health starts here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-blue-500/30 backdrop-blur-sm hover:border-blue-400/50 transition-colors">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Brain className="h-6 w-6 text-blue-400" />
              <CardTitle className="text-white ml-2">AI Journal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Write your thoughts and get personalized AI insights.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Start Journaling
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-green-500/30 backdrop-blur-sm hover:border-green-400/50 transition-colors">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Heart className="h-6 w-6 text-green-400" />
              <CardTitle className="text-white ml-2">Mood Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Track your emotional wellness over time.
              </p>
              <Button variant="outline" className="w-full border-green-500 text-green-400 hover:bg-green-500/10">
                Check Mood
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 transition-colors">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Users className="h-6 w-6 text-purple-400" />
              <CardTitle className="text-white ml-2">Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Connect with others on similar journeys.
              </p>
              <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10">
                Join Community
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-amber-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BookOpen className="h-5 w-5 text-amber-400 mr-2" />
                Learning Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                Explore tools and techniques for mental wellness.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full text-left justify-start text-amber-400 border-amber-500 hover:bg-amber-500/10">
                  Mindfulness Techniques
                </Button>
                <Button variant="outline" className="w-full text-left justify-start text-amber-400 border-amber-500 hover:bg-amber-500/10">
                  Stress Management
                </Button>
                <Button variant="outline" className="w-full text-left justify-start text-amber-400 border-amber-500 hover:bg-amber-500/10">
                  Sleep Hygiene
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-pink-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="h-5 w-5 text-pink-400 mr-2" />
                Therapy Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                Schedule and manage your therapy appointments.
              </p>
              <div className="space-y-2">
                <Button className="w-full bg-pink-600 hover:bg-pink-700">
                  Book Session
                </Button>
                <Button variant="outline" className="w-full text-pink-400 border-pink-500 hover:bg-pink-500/10">
                  View Appointments
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 text-indigo-400 mr-2" />
              Your Wellness Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-400">0</div>
                <div className="text-slate-300 text-sm">Journal Entries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">0</div>
                <div className="text-slate-300 text-sm">Therapy Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">0</div>
                <div className="text-slate-300 text-sm">Days Tracked</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DefaultDashboard;
