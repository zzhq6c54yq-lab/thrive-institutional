import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface MostLovedItem {
  id: string;
  question_text: string;
  answer_text: string;
  category: string;
  appreciation_count: number;
}

const MostLovedCarousel: React.FC = () => {
  const [items, setItems] = useState<MostLovedItem[]>([]);

  useEffect(() => {
    fetchMostLoved();
  }, []);

  const fetchMostLoved = async () => {
    const { data } = await supabase
      .from('henry_qa_feed')
      .select('*')
      .order('appreciation_count', { ascending: false })
      .limit(10);

    setItems(data || []);
  };

  if (items.length === 0) return null;

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
            <Card className="p-6 h-full bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-amber-900/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-red-600">
                    <Heart className="w-4 h-4 fill-red-600" />
                    <span className="text-sm font-bold">{item.appreciation_count}</span>
                  </div>
                </div>

                <h4 className="font-serif font-bold text-gray-900 dark:text-white line-clamp-2">
                  {item.question_text}
                </h4>

                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-4">
                  {item.answer_text}
                </p>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default MostLovedCarousel;
