
-- Function to increment hearts count
CREATE OR REPLACE FUNCTION increment_hearts(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.support_wall 
  SET hearts = hearts + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement hearts count
CREATE OR REPLACE FUNCTION decrement_hearts(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.support_wall 
  SET hearts = GREATEST(hearts - 1, 0)
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
