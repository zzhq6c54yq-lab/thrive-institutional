-- Insert sample question into henry_questions
INSERT INTO henry_questions (id, question_text, category, is_anonymous, status, created_at, updated_at)
VALUES (
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  'I don''t know where to start anymore. I''m the one everyone comes to when things fall apart — the fixer, the strong one, the voice of reason. But lately, I feel like I''m falling apart quietly in the background while nobody notices.

I smile when I''m supposed to, I show up when I have to, but the truth is… when I get home, I just sit on the edge of my bed staring at the floor, wondering when I stopped feeling like myself. I miss the days when laughter came easy. I''m scared that I''ve become invisible — not to the world, but to myself.

How do I find my way back, Henry?

— The Strong One Who''s Tired',
  'self-esteem',
  true,
  'answered',
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '3 days'
);

-- Insert Henry's answer
INSERT INTO henry_answers (question_id, answer_text, author, published_at, created_at, updated_at)
VALUES (
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  'Dear Strong One,

Your letter hit me right in the chest. You''re not broken — you''re simply tired of carrying everything alone. Strength without rest eventually turns into exhaustion, and it sounds like you''ve been holding the world on your shoulders for a long time.

Sometimes the strongest thing we can do isn''t holding on — it''s letting someone else hold us for a while. You deserve to be comforted, to be asked how you''re doing, and to be reminded that even the ones who light up the room are allowed to dim for a moment.

Try this tonight: before bed, place your hand over your heart and say quietly, "I am still here." That small act of self-recognition matters more than you think. The road back to yourself isn''t about being who you used to be — it''s about remembering that your softness, your tears, and your hope are all part of your strength too.

You haven''t disappeared, my friend. You''ve just been waiting for someone — maybe even you — to finally see you again.

— Henry',
  'Henry',
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '2 days'
);