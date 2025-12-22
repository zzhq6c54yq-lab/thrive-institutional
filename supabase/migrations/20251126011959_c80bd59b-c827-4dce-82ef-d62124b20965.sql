-- Add promo_code column to therapy_bookings table
ALTER TABLE therapy_bookings 
ADD COLUMN IF NOT EXISTS promo_code TEXT;

-- Add comment for documentation
COMMENT ON COLUMN therapy_bookings.promo_code IS 'Promotional code applied to booking (e.g., ThriveMT for free sessions)';