-- Add mood column to whispers table
ALTER TABLE whispers ADD COLUMN mood text CHECK (mood IN ('calm', 'sad', 'angry', 'anxious', 'hopeful'));

-- Add user_id column to track hearts (while keeping posts anonymous)
ALTER TABLE whispers ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Enable realtime for tables that aren't already added
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE whispers;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE replies;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END;
END $$;