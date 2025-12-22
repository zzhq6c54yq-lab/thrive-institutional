
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Calendar, Heart, Star, MessageCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const AdolescentDashboard: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Hey {user?.email?.split('@')[0] || 'Friend'} 👋
          </h1>
          <p className="text-purple-200 text-lg">
            Your mental health journey matters. You're not alone in this.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-pink-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Heart className="h-6 w-6 text-pink-400" />
              <CardTitle className="text-white ml-2">Mood Check-in</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                How are you feeling today? Track your emotions safely.
              </p>
              <Button className="w-full bg-pink-600 hover:bg-pink-700">
                Quick Mood Check
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Users className="h-6 w-6 text-blue-400" />
              <CardTitle className="text-white ml-2">Peer Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Connect with other teens who understand your experiences.
              </p>
              <Button variant="outline" className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/10">
                Join Teen Community
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-green-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Star className="h-6 w-6 text-green-400" />
              <CardTitle className="text-white ml-2">Daily Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Fun activities designed to boost your mental wellness.
              </p>
              <Button variant="outline" className="w-full border-green-500 text-green-400 hover:bg-green-500/10">
                View Challenges
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BookOpen className="h-5 w-5 text-purple-400 mr-2" />
                Safe Space Journal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                Write freely in your private journal. No judgment, just support.
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Start Writing
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-orange-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MessageCircle className="h-5 w-5 text-orange-400 mr-2" />
                Crisis Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                24/7 support when you need someone to talk to immediately.
              </p>
              <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700 mb-2">
                I Need Help Now
              </Button>
              <p className="text-xs text-slate-400 text-center">
                Crisis Text Line: Text HOME to 741741
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdolescentDashboard;
