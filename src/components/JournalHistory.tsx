
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";

interface Entry {
  id: string;
  mood: string;
  notes: string;
  created_at: string;
}

const JournalHistory: React.FC<{ userId: string }> = ({ userId }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEntries() {
      setLoading(true);
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (!error && data) {
        setEntries(data as Entry[]);
      }
      setLoading(false);
    }
    fetchEntries();
  }, [userId]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Journal History</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-3">
          {entries.length === 0 && <div className="text-gray-500">No entries yet.</div>}
          {entries.map(entry => (
            <Card key={entry.id}>
              <CardContent>
                <div className="font-bold">{entry.mood}</div>
                <div className="text-sm text-gray-700 whitespace-pre-wrap">{entry.notes}</div>
                <div className="text-xs text-gray-500">
                  {new Date(entry.created_at).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalHistory;
