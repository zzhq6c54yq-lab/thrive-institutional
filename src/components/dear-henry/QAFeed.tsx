import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import QACard from './QACard';
import { Loader2 } from 'lucide-react';

interface QAFeedProps {
  selectedCategory: string | null;
}

interface QAItem {
  id: string;
  question_text: string;
  category: string;
  is_anonymous: boolean;
  created_at: string;
  answer_id: string;
  answer_text: string;
  author: string;
  published_at: string;
  appreciation_count: number;
}

const QAFeed: React.FC<QAFeedProps> = ({ selectedCategory }) => {
  const [items, setItems] = useState<QAItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQAs();
  }, [selectedCategory]);

  const fetchQAs = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('henry_qa_feed')
        .select('*')
        .order('published_at', { ascending: false });

      if (selectedCategory) {
        query = query.eq('category', selectedCategory as any);
      }

      const { data, error } = await query.limit(20);

      if (error) throw error;

      setItems(data || []);
    } catch (error) {
      console.error('Error fetching Q&As:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No questions answered yet in this category.</p>
        <p className="text-sm mt-2">Be the first to ask Henry a question!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <QACard item={item} onUpdate={fetchQAs} />
        </motion.div>
      ))}
    </div>
  );
};

export default QAFeed;
