import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Bookmark, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface QACardProps {
  item: {
    id: string;
    question_text: string;
    category: string;
    answer_text: string;
    published_at: string;
    appreciation_count: number;
  };
  onUpdate: () => void;
}

const QACard: React.FC<QACardProps> = ({ item, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasAppreciated, setHasAppreciated] = useState(false);
  const [hasBookmarked, setHasBookmarked] = useState(false);
  const [appreciationCount, setAppreciationCount] = useState(item.appreciation_count);
  const { toast } = useToast();

  useEffect(() => {
    checkUserInteractions();
  }, [item.id]);

  const checkUserInteractions = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: appreciation } = await supabase
      .from('henry_appreciations')
      .select('id')
      .eq('question_id', item.id)
      .eq('user_id', user.id)
      .maybeSingle();

    const { data: bookmark } = await supabase
      .from('henry_bookmarks')
      .select('id')
      .eq('question_id', item.id)
      .eq('user_id', user.id)
      .maybeSingle();

    setHasAppreciated(!!appreciation);
    setHasBookmarked(!!bookmark);
  };

  const handleAppreciate = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to appreciate posts.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (hasAppreciated) {
        await supabase
          .from('henry_appreciations')
          .delete()
          .eq('question_id', item.id)
          .eq('user_id', user.id);
        
        setAppreciationCount(prev => prev - 1);
        setHasAppreciated(false);
      } else {
        await supabase
          .from('henry_appreciations')
          .insert({
            question_id: item.id,
            user_id: user.id,
          });

        setAppreciationCount(prev => prev + 1);
        setHasAppreciated(true);
        
        toast({
          title: "You earned an Insight Token!",
          description: "Keep engaging to unlock more rewards.",
        });
      }
      onUpdate();
    } catch (error) {
      console.error('Error toggling appreciation:', error);
    }
  };

  const handleBookmark = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to bookmark posts.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (hasBookmarked) {
        await supabase
          .from('henry_bookmarks')
          .delete()
          .eq('question_id', item.id)
          .eq('user_id', user.id);
        
        setHasBookmarked(false);
        toast({
          title: "Bookmark Removed",
          description: "Post removed from your saved items.",
        });
      } else {
        await supabase
          .from('henry_bookmarks')
          .insert({
            question_id: item.id,
            user_id: user.id,
          });

        setHasBookmarked(true);
        toast({
          title: "📖 Post Bookmarked!",
          description: "You earned an Insight Token!",
        });
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <Card className="p-6 hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300 capitalize">
            {item.category}
          </Badge>
          <span className="text-xs text-gray-500">
            {format(new Date(item.published_at), 'MMM d, yyyy')}
          </span>
        </div>

        <div>
          <h4 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-2">
            Q: {item.question_text}
          </h4>
        </div>

        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            <span className="font-serif font-semibold text-amber-600">Henry says:</span>{' '}
            {isExpanded ? item.answer_text : truncateText(item.answer_text, 200)}
          </p>
        </div>

        {item.answer_text.length > 200 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-amber-600 hover:text-amber-700"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                Read Full Answer <ChevronDown className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        )}

        <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAppreciate}
            className={`flex items-center gap-2 ${
              hasAppreciated ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            <Heart className={`w-5 h-5 ${hasAppreciated ? 'fill-red-600' : ''}`} />
            <span>{appreciationCount}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`flex items-center gap-2 ${
              hasBookmarked ? 'text-amber-600' : 'text-gray-600'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${hasBookmarked ? 'fill-amber-600' : ''}`} />
            {hasBookmarked ? 'Saved' : 'Save'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QACard;
