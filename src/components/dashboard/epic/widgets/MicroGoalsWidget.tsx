import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Loader2, RefreshCw, CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

interface MicroGoal {
  text: string;
  category: 'breathwork' | 'physical' | 'mindfulness' | 'movement' | 'connection';
  completed?: boolean;
}

const MicroGoalsWidget: React.FC = () => {
  const [goals, setGoals] = useState<MicroGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadMicroGoals();
  }, []);

  const loadMicroGoals = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('generate-micro-goals');

      if (error) throw error;

      const goalsWithCompletion = data.microGoals.map((goal: MicroGoal) => ({
        ...goal,
        completed: false,
      }));

      setGoals(goalsWithCompletion);
    } catch (error: any) {
      console.error('Error loading micro-goals:', error);
      // Fallback goals
      setGoals([
        { text: 'Take 3 deep breaths', category: 'breathwork', completed: false },
        { text: 'Drink a glass of water', category: 'physical', completed: false },
        { text: 'Write down one positive thing', category: 'mindfulness', completed: false },
        { text: 'Do a quick stretch', category: 'movement', completed: false },
        { text: 'Send a kind message', category: 'connection', completed: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadMicroGoals();
    setRefreshing(false);
    toast({
      title: 'New goals generated',
      description: 'Fresh micro-goals based on your current state',
    });
  };

  const handleToggleGoal = (index: number) => {
    const newGoals = [...goals];
    const wasCompleted = newGoals[index].completed;
    newGoals[index].completed = !wasCompleted;
    setGoals(newGoals);

    if (!wasCompleted) {
      // Trigger celebration animation
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E5C5A1', '#B8941F'],
      });

      toast({
        title: '🎉 Nice work!',
        description: newGoals[index].text,
      });
    }
  };

  const completedCount = goals.filter(g => g.completed).length;
  const progress = goals.length > 0 ? (completedCount / goals.length) * 100 : 0;

  if (loading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6 hover:border-[#D4AF37]/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Target className="w-8 h-8 text-[#D4AF37]" />
              {completedCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] rounded-full flex items-center justify-center text-xs font-bold text-black"
                >
                  {completedCount}
                </motion.div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-1">Today's Micro-Goals</h3>
              <p className="text-sm text-muted-foreground">Small steps, big impact</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium text-foreground">{completedCount}/{goals.length}</span>
          </div>
          <div className="h-2 bg-background/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1]"
            />
          </div>
        </div>

        {/* Goals List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {goals.map((goal, index) => (
              <motion.div
                key={`${goal.text}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  goal.completed
                    ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30'
                    : 'bg-background/50 border border-border/30 hover:border-[#D4AF37]/20'
                }`}
                onClick={() => handleToggleGoal(index)}
              >
                {goal.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`text-sm ${goal.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {goal.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 capitalize">{goal.category}</p>
                </div>
                {goal.completed && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Completion Message */}
        {completedCount === goals.length && goals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg text-center"
          >
            <p className="text-sm font-medium text-foreground">
              🎉 Amazing! You completed all your micro-goals today!
            </p>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default MicroGoalsWidget;
