
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Clock, Heart, Coffee, GraduationCap } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const EducatorDashboard: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-800 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome, {user?.email?.split('@')[0] || 'Educator'} 📚
          </h1>
          <p className="text-green-200 text-lg">
            🍎 You shape minds every day. Let's take care of yours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-green-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Coffee className="h-6 w-6 text-green-400" />
              <CardTitle className="text-white ml-2">Burnout Prevention</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Tools to prevent and manage educator burnout symptoms.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Burnout Assessment
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Clock className="h-6 w-6 text-blue-400" />
              <CardTitle className="text-white ml-2">Work-Life Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Strategies for maintaining healthy boundaries as an educator.
              </p>
              <Button variant="outline" className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/10">
                Balance Tools
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Users className="h-6 w-6 text-purple-400" />
              <CardTitle className="text-white ml-2">Educator Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Connect with fellow educators facing similar challenges.
              </p>
              <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10">
                Join Community
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 border-yellow-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <GraduationCap className="h-5 w-5 text-yellow-400 mr-2" />
                Classroom Stress Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                Quick stress relief techniques you can use between classes.
              </p>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-semibold">
                Quick Relief Tools
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-pink-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Heart className="h-5 w-5 text-pink-400 mr-2" />
                Self-Care for Educators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                Remember: You can't pour from an empty cup. Take care of yourself.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full text-pink-400 border-pink-500 hover:bg-pink-500/10">
                  5-Minute Meditation
                </Button>
                <Button variant="outline" className="w-full text-pink-400 border-pink-500 hover:bg-pink-500/10">
                  Gratitude Journal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EducatorDashboard;
