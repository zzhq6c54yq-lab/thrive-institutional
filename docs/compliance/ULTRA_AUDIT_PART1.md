# ThriveMT Ultra-Detailed Audit Checklist - Part 1
## Feature & Workflow Testing (Rows 1-750)

**Version:** 1.0  
**Last Updated:** 2025-01-15  
**Scope:** Core Wellness, Henry AI, Coaching/Therapy, Specialized Portals, Community & Engagement

---

## Instructions

- **Pass/Fail:** Mark ✅ (Pass), ❌ (Fail), ⏳ (Pending), 🔄 (In Progress)
- **Backend Log Check:** Verify corresponding audit_logs, auth_user_audit, or PHI logs exist
- **Frontend/UI Check:** Verify UI feedback (toasts, state changes, navigation)
- **Tester:** Initial of person performing test
- **Date:** Date test was performed

---

## Section 1: Core Wellness Toolkit (Rows 1-150)

### 1.1 Breathing Exercises

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 1 | Breathing | Start Session | User clicks "Start" on 4-7-8 pattern | Timer begins, animation plays | breathing_sessions INSERT | Animation visible, timer counting | | | | |
| 2 | Breathing | Complete Session | User completes full breathing cycle | Session logged, points awarded | breathing_sessions record, points_history | Completion toast, confetti | | | | |
| 3 | Breathing | Pause Session | User pauses mid-session | Timer pauses, state preserved | No log until complete | Pause button visible, timer stopped | | | | |
| 4 | Breathing | Resume Session | User resumes paused session | Timer continues from pause point | No additional log | Animation resumes | | | | |
| 5 | Breathing | Cancel Session | User exits before completion | No session logged | No breathing_sessions INSERT | Navigate back, no error | | | | |
| 6 | Breathing | Pattern Selection | User selects Box Breathing | Correct pattern timing loads | N/A | 4-4-4-4 pattern displayed | | | | |
| 7 | Breathing | Pattern Selection | User selects Relaxing Breath | Correct pattern timing loads | N/A | 4-7-8 pattern displayed | | | | |
| 8 | Breathing | Pattern Selection | User selects Energizing Breath | Correct pattern timing loads | N/A | Fast pattern displayed | | | | |
| 9 | Breathing | Audio Toggle | User toggles guidance audio on | Audio plays with breathing cues | N/A | Audio indicator visible | | | | |
| 10 | Breathing | Audio Toggle | User toggles guidance audio off | Audio stops | N/A | Audio indicator hidden | | | | |
| 11 | Breathing | Multiple Sessions | User completes 3 sessions in one day | All 3 logged separately | 3 breathing_sessions records | Each completion acknowledged | | | | |
| 12 | Breathing | Session History | User views breathing history | Past sessions displayed | breathing_sessions SELECT | History list renders | | | | |
| 13 | Breathing | Streak Tracking | User completes 7 consecutive days | Streak badge awarded | feature_achievements INSERT | Badge notification | | | | |
| 14 | Breathing | Mobile Landscape | User rotates device during session | Animation adapts to orientation | N/A | No UI break | | | | |
| 15 | Breathing | Background Tab | User switches tabs mid-session | Session pauses or continues based on setting | N/A | State preserved on return | | | | |

### 1.2 Meditation Studio

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 16 | Meditation | Browse Library | User opens meditation studio | All meditations listed | content_analytics action='view' | Grid/list of meditations | | | | |
| 17 | Meditation | Play Audio | User starts guided meditation | Audio plays from beginning | content_analytics action='play' | Play button → Pause, progress bar | | | | |
| 18 | Meditation | Pause Audio | User pauses meditation | Audio pauses, position saved | N/A | Pause button → Play | | | | |
| 19 | Meditation | Resume Audio | User resumes paused meditation | Audio continues from pause point | N/A | Progress bar continues | | | | |
| 20 | Meditation | Seek Forward | User drags progress bar forward | Audio jumps to new position | N/A | Progress bar updates | | | | |
| 21 | Meditation | Seek Backward | User drags progress bar backward | Audio jumps to earlier position | N/A | Progress bar updates | | | | |
| 22 | Meditation | Complete Session | User listens to full meditation | Session logged, points awarded | content_analytics action='complete' | Completion message | | | | |
| 23 | Meditation | Volume Control | User adjusts volume slider | Audio volume changes | N/A | Volume indicator updates | | | | |
| 24 | Meditation | Favorite Toggle | User favorites a meditation | Favorite saved to profile | User preference saved | Heart icon fills | | | | |
| 25 | Meditation | Unfavorite Toggle | User removes favorite | Favorite removed | User preference deleted | Heart icon empties | | | | |
| 26 | Meditation | Filter by Category | User filters by "Sleep" category | Only sleep meditations shown | N/A | Filtered list displays | | | | |
| 27 | Meditation | Search | User searches "anxiety" | Matching meditations shown | N/A | Search results display | | | | |
| 28 | Meditation | No Results | User searches gibberish | Empty state displayed | N/A | "No results" message | | | | |
| 29 | Meditation | Background Play | User minimizes app during meditation | Audio continues playing | N/A | Audio persists | | | | |
| 30 | Meditation | Lock Screen | User locks phone during meditation | Audio continues | N/A | Lock screen controls work | | | | |

### 1.3 Binaural Beats

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 31 | Binaural | Start Session | User starts Alpha waves | Binaural beat plays | binaural_sessions INSERT | Audio plays, visualization | | | | |
| 32 | Binaural | Frequency Selection | User selects Theta (4-8 Hz) | Correct frequency plays | N/A | Theta selected indicator | | | | |
| 33 | Binaural | Frequency Selection | User selects Delta (0.5-4 Hz) | Correct frequency plays | N/A | Delta selected indicator | | | | |
| 34 | Binaural | Frequency Selection | User selects Beta (12-30 Hz) | Correct frequency plays | N/A | Beta selected indicator | | | | |
| 35 | Binaural | Frequency Selection | User selects Gamma (30-100 Hz) | Correct frequency plays | N/A | Gamma selected indicator | | | | |
| 36 | Binaural | Duration Selection | User sets 15-minute timer | Session ends at 15 minutes | binaural_sessions duration_minutes=15 | Timer countdown | | | | |
| 37 | Binaural | Duration Selection | User sets 30-minute timer | Session ends at 30 minutes | binaural_sessions duration_minutes=30 | Timer countdown | | | | |
| 38 | Binaural | Duration Selection | User sets 60-minute timer | Session ends at 60 minutes | binaural_sessions duration_minutes=60 | Timer countdown | | | | |
| 39 | Binaural | Favorite Frequency | User favorites Delta waves | Favorite saved | binaural_favorites INSERT | Star icon fills | | | | |
| 40 | Binaural | Unfavorite | User removes favorite | Favorite removed | binaural_favorites DELETE | Star icon empties | | | | |
| 41 | Binaural | Volume Control | User adjusts beat volume | Volume changes | N/A | Volume slider moves | | | | |
| 42 | Binaural | Background Sounds | User adds rain sounds | Rain ambient mixed with beats | N/A | Rain toggle active | | | | |
| 43 | Binaural | Complete Session | User completes full timer | Points awarded, logged | binaural_sessions, points_history | Completion toast | | | | |
| 44 | Binaural | Early Exit | User stops before timer ends | Partial session logged | binaural_sessions (partial) | Exit confirmation | | | | |
| 45 | Binaural | Headphone Warning | User starts without headphones | Warning displayed | N/A | Headphone recommendation shown | | | | |

### 1.4 Art Therapy

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 46 | Art | Open Canvas | User opens art therapy | Blank canvas displayed | N/A | Canvas ready, tools visible | | | | |
| 47 | Art | Draw Line | User draws with brush tool | Line appears on canvas | N/A | Stroke visible | | | | |
| 48 | Art | Change Color | User selects new color | Brush color changes | N/A | Color picker updates | | | | |
| 49 | Art | Change Brush Size | User adjusts brush size | Stroke width changes | N/A | Size slider updates | | | | |
| 50 | Art | Eraser Tool | User uses eraser | Strokes removed | N/A | Canvas cleared where erased | | | | |
| 51 | Art | Undo | User taps undo | Last stroke removed | N/A | Previous state restored | | | | |
| 52 | Art | Redo | User taps redo | Undone stroke restored | N/A | Stroke reappears | | | | |
| 53 | Art | Clear Canvas | User clears entire canvas | All strokes removed | N/A | Blank canvas | | | | |
| 54 | Art | Save Artwork | User saves creation | Image saved to gallery | art_therapy_gallery INSERT | Save confirmation | | | | |
| 55 | Art | Title Artwork | User adds title to saved art | Title saved with image | art_therapy_gallery title | Title visible in gallery | | | | |
| 56 | Art | Add Description | User adds mood/description | Description saved | art_therapy_gallery description | Description visible | | | | |
| 57 | Art | View Gallery | User opens art gallery | Past artworks displayed | art_therapy_gallery SELECT | Gallery grid renders | | | | |
| 58 | Art | Delete Artwork | User deletes saved art | Art removed from gallery | art_therapy_gallery DELETE | Art removed from view | | | | |
| 59 | Art | Share Artwork | User shares to community | Art posted publicly | art_therapy_gallery is_shared=true | Shared indicator | | | | |
| 60 | Art | Download Artwork | User downloads as image | Image downloaded to device | N/A | File download triggered | | | | |

### 1.5 Music Therapy

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 61 | Music | Browse Instruments | User opens music therapy | Instrument selection visible | N/A | Instrument grid displayed | | | | |
| 62 | Music | Play Piano | User taps piano keys | Piano sounds play | N/A | Key press visual feedback | | | | |
| 63 | Music | Play Drums | User taps drum pads | Drum sounds play | N/A | Pad press feedback | | | | |
| 64 | Music | Play Guitar | User strums guitar | Guitar sounds play | N/A | String vibration visual | | | | |
| 65 | Music | Record Session | User starts recording | Recording begins | N/A | Record indicator visible | | | | |
| 66 | Music | Stop Recording | User stops recording | Recording saved | music_recordings INSERT | Recording saved message | | | | |
| 67 | Music | Play Recording | User plays back recording | Audio plays | N/A | Playback controls work | | | | |
| 68 | Music | Delete Recording | User deletes recording | Recording removed | music_recordings DELETE | Recording removed from list | | | | |
| 69 | Music | Volume Control | User adjusts instrument volume | Volume changes | N/A | Volume slider moves | | | | |
| 70 | Music | Guided Session | User follows guided prompt | Prompts display in sequence | N/A | Prompt cards visible | | | | |

### 1.6 Video Diary

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 71 | Video Diary | Start Recording | User starts video recording | Camera activates, recording | N/A | Record button active, timer | | | | |
| 72 | Video Diary | Stop Recording | User stops recording | Recording saved locally | N/A | Preview available | | | | |
| 73 | Video Diary | Preview Recording | User previews before saving | Video plays back | N/A | Video player controls | | | | |
| 74 | Video Diary | Save Entry | User confirms save | Video uploaded to storage | video_diary INSERT, storage upload | Save confirmation | | | | |
| 75 | Video Diary | Add Title | User adds title to entry | Title saved with video | video_diary title | Title visible in list | | | | |
| 76 | Video Diary | Add Mood Tag | User tags mood for entry | Mood saved | video_diary mood_tag | Mood indicator visible | | | | |
| 77 | Video Diary | View History | User opens diary history | Past entries listed | video_diary SELECT | Entry list renders | | | | |
| 78 | Video Diary | Play Entry | User plays past entry | Video plays | N/A | Video player works | | | | |
| 79 | Video Diary | Delete Entry | User deletes entry | Video removed | video_diary DELETE, storage delete | Entry removed from list | | | | |
| 80 | Video Diary | Camera Switch | User switches front/back camera | Camera view changes | N/A | Camera flips | | | | |
| 81 | Video Diary | Max Duration | User records past 5-minute limit | Recording auto-stops | N/A | Max duration enforced | | | | |
| 82 | Video Diary | Storage Full | User tries to save with no storage | Error handled gracefully | N/A | Storage error message | | | | |

### 1.7 Sleep Tracker

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 83 | Sleep | Log Sleep | User logs 7 hours sleep | Sleep entry saved | sleep_logs INSERT | Entry confirmation | | | | |
| 84 | Sleep | Log Quality | User rates sleep quality 4/5 | Quality saved with entry | sleep_logs quality | Quality indicator | | | | |
| 85 | Sleep | Add Notes | User adds sleep notes | Notes saved | sleep_logs notes | Notes visible | | | | |
| 86 | Sleep | View History | User views sleep history | Past entries displayed | sleep_logs SELECT | History chart/list | | | | |
| 87 | Sleep | Weekly Summary | User views weekly summary | Average calculated | N/A | Weekly stats displayed | | | | |
| 88 | Sleep | Monthly Summary | User views monthly summary | Monthly trends shown | N/A | Monthly chart displayed | | | | |
| 89 | Sleep | Edit Entry | User edits past entry | Entry updated | sleep_logs UPDATE | Updated values shown | | | | |
| 90 | Sleep | Delete Entry | User deletes entry | Entry removed | sleep_logs DELETE | Entry removed from view | | | | |
| 91 | Sleep | Sleep Goal | User sets 8-hour goal | Goal saved | user_goals INSERT | Goal indicator visible | | | | |
| 92 | Sleep | Goal Progress | User views goal progress | Progress calculated | N/A | Progress bar/percentage | | | | |

### 1.8 Journaling

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 93 | Journal | Create Entry | User creates new journal entry | Entry saved | journal_entries INSERT | Save confirmation | | | | |
| 94 | Journal | Rich Text | User applies bold/italic | Formatting applied | journal_entries content | Text styled correctly | | | | |
| 95 | Journal | Add Mood | User tags entry with mood | Mood saved | journal_entries mood | Mood indicator visible | | | | |
| 96 | Journal | Add Tags | User adds custom tags | Tags saved | journal_entries tags | Tags displayed | | | | |
| 97 | Journal | Auto-Save | User types, no save click | Entry auto-saved | journal_entries (debounced) | Auto-save indicator | | | | |
| 98 | Journal | View History | User browses past entries | Entries listed | journal_entries SELECT | Entry list renders | | | | |
| 99 | Journal | Search Entries | User searches by keyword | Matching entries shown | N/A | Search results display | | | | |
| 100 | Journal | Filter by Mood | User filters by "Happy" mood | Filtered entries shown | N/A | Filtered list | | | | |
| 101 | Journal | Filter by Date | User filters by date range | Filtered entries shown | N/A | Date range applied | | | | |
| 102 | Journal | Edit Entry | User edits past entry | Entry updated | journal_entries UPDATE | Updated content shown | | | | |
| 103 | Journal | Delete Entry | User deletes entry | Entry removed | journal_entries DELETE | Entry removed | | | | |
| 104 | Journal | Prompt Suggestions | User views writing prompts | Prompts displayed | N/A | Prompt cards visible | | | | |
| 105 | Journal | Use Prompt | User starts entry from prompt | Prompt text included | N/A | Prompt in entry | | | | |
| 106 | Journal | Share with Therapist | User shares entry | Entry marked shared | journal_entries shared_with_therapist | Share indicator | | | | |
| 107 | Journal | Unshare Entry | User unshares entry | Share removed | journal_entries shared_with_therapist=false | Share indicator removed | | | | |

### 1.9 Mood Tracking / Daily Check-ins

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 108 | Mood | Log Mood | User logs current mood | Mood saved | daily_check_ins INSERT | Mood logged toast | | | | |
| 109 | Mood | Select Mood Level | User selects 1-5 scale | Score saved | daily_check_ins mood_score | Selected level highlighted | | | | |
| 110 | Mood | Add Note | User adds context note | Note saved | daily_check_ins note | Note attached | | | | |
| 111 | Mood | Add Tags | User adds activity tags | Tags saved | daily_check_ins tags | Tags displayed | | | | |
| 112 | Mood | Multiple Daily | User logs 3 moods in one day | All 3 saved | 3 daily_check_ins records | All entries visible | | | | |
| 113 | Mood | View Trends | User views mood trends | Chart displayed | daily_check_ins SELECT | Trend chart renders | | | | |
| 114 | Mood | Weekly Average | User views weekly average | Average calculated | N/A | Average displayed | | | | |
| 115 | Mood | Monthly View | User views monthly calendar | Calendar with mood colors | N/A | Calendar renders | | | | |
| 116 | Mood | Edit Check-in | User edits past check-in | Check-in updated | daily_check_ins UPDATE | Updated values | | | | |
| 117 | Mood | Delete Check-in | User deletes check-in | Check-in removed | daily_check_ins DELETE | Entry removed | | | | |
| 118 | Mood | Streak Display | User views check-in streak | Streak count shown | N/A | Streak number visible | | | | |
| 119 | Mood | Pattern Detection | Low mood 3+ days | Alert/suggestion shown | N/A | Support suggestion | | | | |
| 120 | Mood | Share with Therapist | User enables therapist sharing | Preference saved | profiles therapist_sharing | Toggle enabled | | | | |

### 1.10 Goals & Progress

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 121 | Goals | Create Goal | User creates wellness goal | Goal saved | user_goals INSERT | Goal added to list | | | | |
| 122 | Goals | Set Target Date | User sets goal deadline | Date saved | user_goals target_date | Date displayed | | | | |
| 123 | Goals | Add Milestones | User adds milestones | Milestones saved | goal_milestones INSERT | Milestones visible | | | | |
| 124 | Goals | Complete Milestone | User marks milestone done | Milestone updated | goal_milestones completed | Checkmark shown | | | | |
| 125 | Goals | Goal Progress | User views goal progress | Progress calculated | N/A | Progress bar updates | | | | |
| 126 | Goals | Complete Goal | User marks goal complete | Goal completed | user_goals completed_at | Celebration UI | | | | |
| 127 | Goals | Edit Goal | User edits goal details | Goal updated | user_goals UPDATE | Updated info shown | | | | |
| 128 | Goals | Delete Goal | User deletes goal | Goal removed | user_goals DELETE | Goal removed from list | | | | |
| 129 | Goals | Goal Categories | User filters by category | Filtered goals shown | N/A | Category filter works | | | | |
| 130 | Goals | Overdue Goals | User has overdue goal | Overdue indicator shown | N/A | Visual warning | | | | |

### 1.11 Games & Quizzes

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 131 | Games | Open Games Section | User navigates to games | Game grid displayed | N/A | All games visible | | | | |
| 132 | Games | Start Memory Game | User starts memory match | Game initializes | N/A | Cards displayed face-down | | | | |
| 133 | Games | Complete Memory Game | User completes game | Score saved, points awarded | game_sessions INSERT | Score displayed | | | | |
| 134 | Games | Start Word Game | User starts word puzzle | Puzzle loads | N/A | Word grid visible | | | | |
| 135 | Games | Complete Word Game | User solves puzzle | Points awarded | game_sessions INSERT | Completion message | | | | |
| 136 | Games | Start Trivia | User starts wellness trivia | Questions load | N/A | Question displayed | | | | |
| 137 | Games | Answer Trivia | User submits answer | Answer evaluated | N/A | Correct/incorrect feedback | | | | |
| 138 | Games | Complete Trivia | User finishes trivia | Final score shown | game_sessions INSERT | Score summary | | | | |
| 139 | Games | Mood Challenge | User starts mood challenge | Challenge begins | N/A | Challenge prompts shown | | | | |
| 140 | Games | View Leaderboard | User views game leaderboard | Rankings shown | N/A | Leaderboard renders | | | | |
| 141 | Games | Daily Challenge | User completes daily challenge | Daily reward given | N/A | Daily completion marked | | | | |

### 1.12 Workshops

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 142 | Workshops | Browse Workshops | User views workshop list | All 12 workshops shown | N/A | Workshop cards display | | | | |
| 143 | Workshops | Start Workshop | User starts workshop | Workshop content loads | workshop_progress INSERT | First section visible | | | | |
| 144 | Workshops | Watch Video | User watches embedded video | Video plays | N/A | Video player works | | | | |
| 145 | Workshops | Complete Section | User completes section | Progress saved | workshop_progress UPDATE | Section marked done | | | | |
| 146 | Workshops | Download Worksheet | User downloads worksheet | PDF downloads | N/A | File download triggered | | | | |
| 147 | Workshops | Resume Workshop | User returns to in-progress | Continues from last section | workshop_progress SELECT | Correct section loads | | | | |
| 148 | Workshops | Complete Workshop | User finishes all sections | Certificate generated | workshop_progress completed | Completion celebration | | | | |
| 149 | Workshops | AI Narration | User enables AI narration | Audio narration plays | N/A | Audio controls visible | | | | |
| 150 | Workshops | View Certificate | User views earned certificate | Certificate displayed | N/A | Certificate renders | | | | |

---

## Section 2: Henry AI Companion (Rows 151-250)

### 2.1 Henry Chat Interface

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 151 | Henry | Open Chat | User opens Henry chat | Chat interface loads | henry_conversations SELECT | Chat window visible | | | | |
| 152 | Henry | Send Message | User sends text message | Message sent, response received | henry_messages INSERT | Messages appear | | | | |
| 153 | Henry | Receive Response | Henry generates response | AI response displayed | henry_messages (assistant) | Response renders | | | | |
| 154 | Henry | Response Loading | User waits for response | Loading indicator shown | N/A | Typing indicator visible | | | | |
| 155 | Henry | Long Message | User sends 2000+ character message | Message accepted | henry_messages | Full message saved | | | | |
| 156 | Henry | Empty Message | User tries to send empty | Submission prevented | N/A | Send button disabled | | | | |
| 157 | Henry | Conversation History | User scrolls up | Past messages load | henry_messages SELECT | History visible | | | | |
| 158 | Henry | New Conversation | User starts new conversation | New thread created | henry_conversations INSERT | Fresh chat starts | | | | |
| 159 | Henry | Continue Conversation | User reopens existing | Previous context maintained | henry_conversations SELECT | Context preserved | | | | |
| 160 | Henry | Delete Conversation | User deletes conversation | Thread removed | henry_conversations DELETE | Conversation removed | | | | |

### 2.2 Henry Modes

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 161 | Henry | Mental Health Mode | User selects companion mode | Henry responds as MH companion | henry_conversations mode | Mode indicator shown | | | | |
| 162 | Henry | AA Sponsor Mode | User selects AA sponsor | Henry responds as sponsor | henry_conversations mode='aa_sponsor' | Sponsor persona | | | | |
| 163 | Henry | NA Sponsor Mode | User selects NA sponsor | Henry responds as NA sponsor | henry_conversations mode='na_sponsor' | Sponsor persona | | | | |
| 164 | Henry | Crisis Mode | Crisis detected in message | Henry escalates appropriately | crisis_escalations INSERT | Crisis resources shown | | | | |
| 165 | Henry | Wellness Mode | User selects general wellness | Henry gives wellness tips | henry_conversations mode='wellness' | Wellness responses | | | | |
| 166 | Henry | Mode Switch | User switches modes mid-chat | Context adapts to new mode | henry_conversations UPDATE | New mode active | | | | |
| 167 | Henry | Mode Persistence | User returns next day | Previous mode remembered | henry_conversations mode | Same mode loads | | | | |

### 2.3 Henry Quick Actions

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 168 | Henry | Mood Boost | User clicks "Get Mood Boost" | Mood boost dialog opens | N/A | Modal with content | | | | |
| 169 | Henry | Daily Wisdom | User clicks "Daily Wisdom" | Wisdom dialog opens | N/A | Modal with quote | | | | |
| 170 | Henry | Play Game | User clicks "Play a Game" | Game interface opens | N/A | Game starts | | | | |
| 171 | Henry | Quick Check-in | User uses quick check-in | Check-in flow starts | daily_check_ins INSERT | Check-in UI | | | | |

### 2.4 Henry Context Awareness

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 172 | Henry | Time Awareness | User chats at 2 AM | Henry acknowledges late hour | N/A | Time-relevant response | | | | |
| 173 | Henry | Time Awareness | User chats at 7 AM | Henry gives morning greeting | N/A | Morning greeting | | | | |
| 174 | Henry | Mood Context | User logged sad mood earlier | Henry references mood state | daily_check_ins SELECT | Contextual empathy | | | | |
| 175 | Henry | Activity Context | User completed meditation | Henry acknowledges activity | N/A | Activity reference | | | | |
| 176 | Henry | Streak Context | User on 7-day streak | Henry celebrates streak | N/A | Streak acknowledgment | | | | |
| 177 | Henry | Pattern Recognition | Low mood trend detected | Henry suggests resources | N/A | Supportive suggestion | | | | |
| 178 | Henry | Anniversary | User's signup anniversary | Henry acknowledges milestone | profiles created_at | Anniversary message | | | | |

### 2.5 Henry Edge Function

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 179 | Henry | JWT Verification | Request without token | 401 Unauthorized | Edge function log | Error handled | | | | |
| 180 | Henry | JWT Verification | Request with valid token | Request processed | Edge function log | Response received | | | | |
| 181 | Henry | JWT Verification | Request with expired token | 401 Unauthorized | Edge function log | Re-auth prompted | | | | |
| 182 | Henry | Input Validation | Invalid JSON body | 400 Bad Request | Edge function log | Error message | | | | |
| 183 | Henry | Input Validation | Missing required fields | 400 Bad Request | Edge function log | Validation error | | | | |
| 184 | Henry | Rate Limiting | Rapid-fire messages | Rate limit applied | Edge function log | Throttle message | | | | |
| 185 | Henry | API Fallback | Primary AI fails | Fallback provider used | Edge function log | Response still works | | | | |
| 186 | Henry | Timeout Handling | AI response timeout | Graceful timeout | Edge function log | Timeout message | | | | |
| 187 | Henry | Cost Optimization | Short query | Fast model used | Edge function log | Quick response | | | | |
| 188 | Henry | Cost Optimization | Complex query | Quality model used | Edge function log | Quality response | | | | |

### 2.6 Dear Henry (Letters)

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 189 | Dear Henry | Write Letter | User writes letter to Henry | Letter interface loads | N/A | Letter paper UI | | | | |
| 190 | Dear Henry | Send Letter | User sends letter | Letter saved, response queued | henry_letters INSERT | Send confirmation | | | | |
| 191 | Dear Henry | Receive Response | Henry responds to letter | Response letter appears | henry_letters response | Response visible | | | | |
| 192 | Dear Henry | View History | User views past letters | Letter history shown | henry_letters SELECT | Letters listed | | | | |
| 193 | Dear Henry | Delete Letter | User deletes letter | Letter removed | henry_letters DELETE | Letter removed | | | | |

### 2.7 Henry Substance Abuse Sponsor

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 194 | Sponsor | AA Mode | User selects AA sponsor | 12-step focused responses | henry_conversations mode | AA language | | | | |
| 195 | Sponsor | NA Mode | User selects NA sponsor | NA-specific responses | henry_conversations mode | NA language | | | | |
| 196 | Sponsor | Sobriety Counter | User logs sobriety date | Counter displayed | sobriety_tracking INSERT | Days counted | | | | |
| 197 | Sponsor | Relapse Support | User mentions relapse | Supportive, non-judgmental | N/A | Compassionate response | | | | |
| 198 | Sponsor | Meeting Finder | User asks for meetings | Meeting resources shared | N/A | Meeting links | | | | |
| 199 | Sponsor | Daily Reflection | User requests daily reflection | AA/NA reflection shared | N/A | Reflection content | | | | |
| 200 | Sponsor | Sponsor Unavailable | Service temporarily down | Graceful fallback | N/A | Fallback message | | | | |

### 2.8 Crisis Detection

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 201 | Crisis | Suicide Mention | User mentions suicide | Crisis protocol activated | crisis_escalations INSERT | Crisis resources | | | | |
| 202 | Crisis | Self-Harm Mention | User mentions self-harm | Crisis protocol activated | crisis_escalations INSERT | Crisis resources | | | | |
| 203 | Crisis | Harm to Others | User mentions harming others | Crisis protocol activated | crisis_escalations INSERT | Crisis resources | | | | |
| 204 | Crisis | Severe Depression | Extreme hopelessness detected | Escalation triggered | crisis_escalations INSERT | Support resources | | | | |
| 205 | Crisis | False Positive | Song lyrics mentioning death | Not escalated | N/A | Normal response | | | | |
| 206 | Crisis | Resource Display | Crisis detected | Hotline numbers shown | N/A | 988, Crisis Text visible | | | | |
| 207 | Crisis | Therapist Alert | Crisis for assigned user | Therapist notified | cross_dashboard_notifications | Notification sent | | | | |
| 208 | Crisis | Admin Alert | Severe crisis | Admin notified | crisis_escalations severity='high' | Admin notification | | | | |

### 2.9 Henry Session Summaries

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 209 | Summaries | Generate Summary | Long conversation ends | Summary generated | ai_session_summaries INSERT | Summary available | | | | |
| 210 | Summaries | Key Topics | Summary includes topics | Topics extracted | ai_session_summaries key_topics | Topics listed | | | | |
| 211 | Summaries | Mood Trend | Summary includes mood | Mood analyzed | ai_session_summaries mood_trend | Mood noted | | | | |
| 212 | Summaries | Risk Flags | Risk detected | Flags recorded | ai_session_summaries risk_flags | Flags visible | | | | |
| 213 | Summaries | Therapist Review | Therapist views summary | Summary displayed | ai_session_summaries reviewed_at | Review UI | | | | |
| 214 | Summaries | Summary History | User views summaries | Past summaries listed | ai_session_summaries SELECT | Summary list | | | | |

### 2.10 Mini Session (Between-Session Companion)

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 215 | Mini Session | Start Session | User opens mini session | Warm greeting displayed | N/A | Henry greeting | | | | |
| 216 | Mini Session | Ground & Scan | User completes grounding | Grounding logged | N/A | Grounding UI | | | | |
| 217 | Mini Session | Focus Selection | User selects focus area | Focus saved | N/A | Focus cards visible | | | | |
| 218 | Mini Session | Journaling Space | User writes reflection | Text saved | N/A | Letter-paper UI | | | | |
| 219 | Mini Session | Henry's Thoughts | Henry responds | Personal letter displayed | N/A | Response visible | | | | |
| 220 | Mini Session | Complete Session | User finishes session | Session logged | mini_sessions INSERT | Completion UI | | | | |

---

## Section 3: Coaching & Therapy Features (Rows 221-420)

### 3.1 Therapist Booking

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 221 | Booking | View Therapist | User views Dr. Chris Hopkins | Profile displayed | N/A | Photo, bio, credentials | | | | |
| 222 | Booking | Select Time Slot | User picks available slot | Slot selected | N/A | Slot highlighted | | | | |
| 223 | Booking | No Available Slots | All slots booked | "No availability" message | N/A | Empty state | | | | |
| 224 | Booking | Payment Step | User reaches payment | Payment form shown | N/A | Stripe elements | | | | |
| 225 | Booking | Apply Promo Code | User enters "ThriveMT" | 100% discount applied | N/A | $0.00 total | | | | |
| 226 | Booking | Invalid Promo | User enters wrong code | Error shown | N/A | Invalid code message | | | | |
| 227 | Booking | Confirm Booking | User confirms | Booking created | therapy_bookings INSERT | Confirmation page | | | | |
| 228 | Booking | Email Confirmation | Booking confirmed | Email sent | N/A (Resend) | Email received | | | | |
| 229 | Booking | Calendar Entry | Booking confirmed | Added to schedule | therapy_bookings | Appears in calendar | | | | |
| 230 | Booking | Reschedule | User reschedules | New time saved | therapy_bookings UPDATE | Updated confirmation | | | | |
| 231 | Booking | Cancel Booking | User cancels | Booking cancelled | therapy_bookings status='cancelled' | Cancellation confirmed | | | | |
| 232 | Booking | Cancellation Policy | User cancels <24hrs | Policy enforced | N/A | Policy message | | | | |

### 3.2 Video Session (Client Side)

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 233 | Video | Join Session | Client clicks "Join" | Video interface loads | video_sessions UPDATE | Video UI visible | | | | |
| 234 | Video | Camera Permission | Browser requests camera | Permission granted | N/A | Camera feed visible | | | | |
| 235 | Video | Camera Denied | User denies camera | Graceful handling | N/A | Audio-only option | | | | |
| 236 | Video | Mic Permission | Browser requests mic | Permission granted | N/A | Mic active indicator | | | | |
| 237 | Video | Mic Denied | User denies mic | Graceful handling | N/A | Error message | | | | |
| 238 | Video | See Therapist | Therapist joins | Therapist video visible | N/A | Remote video renders | | | | |
| 239 | Video | Mute/Unmute | User toggles mute | Audio state changes | N/A | Mute icon updates | | | | |
| 240 | Video | Camera On/Off | User toggles camera | Video state changes | N/A | Camera icon updates | | | | |
| 241 | Video | End Call | User ends call | Session ends | video_sessions ended_at | Return to dashboard | | | | |
| 242 | Video | Connection Quality | Poor network | Quality indicator shown | N/A | 1-4 bar indicator | | | | |
| 243 | Video | Reconnect | Temp disconnect | Auto-reconnect attempts | N/A | Reconnecting message | | | | |
| 244 | Video | Chat Panel | User opens chat | In-session chat visible | N/A | Chat panel opens | | | | |
| 245 | Video | Send Chat | User sends message | Message delivered | video_session_chat INSERT | Message appears | | | | |
| 246 | Video | Receive Chat | Therapist sends message | Message received | N/A | Message appears | | | | |

### 3.3 Video Session (Therapist Side)

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 247 | Video | Start Session | Therapist starts call | Video interface loads | video_sessions INSERT | Video UI visible | | | | |
| 248 | Video | See Client | Client joins | Client video visible | N/A | Remote video renders | | | | |
| 249 | Video | Session Timer | Session in progress | Timer counting | N/A | Timer visible | | | | |
| 250 | Video | Client Info | Session active | Client info header | N/A | Name, credentials shown | | | | |
| 251 | Video | Take Notes | Therapist types notes | Notes saved | video_session_notes INSERT | Notes panel works | | | | |
| 252 | Video | Save Notes | Therapist saves notes | Notes persisted | video_session_notes UPDATE | Save confirmation | | | | |
| 253 | Video | Share Resource | Therapist shares link | Resource sent to client | N/A | Resource notification | | | | |
| 254 | Video | Emergency Button | Therapist clicks emergency | Emergency protocol | crisis_escalations INSERT | Emergency options | | | | |
| 255 | Video | End Session | Therapist ends call | Session ends | video_sessions ended_at | End confirmation | | | | |
| 256 | Video | Post-Session Notes | Session ends | Notes prompt appears | N/A | Notes form | | | | |

### 3.4 Messaging System

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 257 | Messaging | Send Message | Client sends to therapist | Message delivered | therapist_messages INSERT | Message appears | | | | |
| 258 | Messaging | Receive Message | Therapist responds | Response received | N/A | Response visible | | | | |
| 259 | Messaging | Real-time Sync | Both online | Messages sync instantly | Supabase Realtime | No refresh needed | | | | |
| 260 | Messaging | Unread Count | New message received | Badge shows count | N/A | Unread badge | | | | |
| 261 | Messaging | Mark Read | User reads message | Badge clears | therapist_messages read_at | Badge removed | | | | |
| 262 | Messaging | Message History | User scrolls up | Older messages load | therapist_messages SELECT | History loads | | | | |
| 263 | Messaging | Send Attachment | User attaches file | File uploaded | storage upload | Attachment visible | | | | |
| 264 | Messaging | View Attachment | User clicks attachment | File opens/downloads | N/A | File accessible | | | | |

### 3.5 Video Messages

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 265 | Video Msg | Record Message | Client records video | Recording captured | N/A | Record UI | | | | |
| 266 | Video Msg | Preview | Client previews recording | Playback available | N/A | Preview player | | | | |
| 267 | Video Msg | Re-record | Client re-records | Previous discarded | N/A | Fresh recording | | | | |
| 268 | Video Msg | Send Video | Client sends | Video uploaded | therapist_requests video_url | Send confirmation | | | | |
| 269 | Video Msg | Max Duration | Recording hits 5 min | Auto-stops | N/A | Duration enforced | | | | |
| 270 | Video Msg | Therapist View | Therapist opens | Video plays | N/A | Video player | | | | |
| 271 | Video Msg | Therapist Reply | Therapist replies | Response sent | therapist_requests reply | Reply notification | | | | |

### 3.6 Phone Calls (Twilio)

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 272 | Phone | Initiate Call | Therapist calls client | Call connects | phone_calls INSERT | Call in progress | | | | |
| 273 | Phone | Receive Call | Client phone rings | Incoming call | N/A | Phone rings | | | | |
| 274 | Phone | Answer Call | Client answers | Call active | phone_calls answered_at | Call connected | | | | |
| 275 | Phone | End Call | Either party ends | Call terminates | phone_calls ended_at | Call ended | | | | |
| 276 | Phone | Voicemail | Client doesn't answer | Voicemail option | N/A | Voicemail prompt | | | | |
| 277 | Phone | Call Failed | Number unreachable | Error handled | phone_calls status='failed' | Error message | | | | |
| 278 | Phone | Call Duration | Call ends | Duration logged | phone_calls duration | Duration recorded | | | | |

### 3.7 SMS (Twilio)

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 279 | SMS | Send Reminder | Appointment tomorrow | SMS sent | sms_messages INSERT | SMS delivered | | | | |
| 280 | SMS | Wellness Check | Scheduled check-in | SMS sent | sms_messages template='wellness' | SMS delivered | | | | |
| 281 | SMS | Custom Message | Therapist sends custom | SMS sent | sms_messages | SMS delivered | | | | |
| 282 | SMS | Delivery Failed | Bad phone number | Error logged | sms_messages status='failed' | Error shown | | | | |
| 283 | SMS | Opt-out | User opts out | Preference saved | sms_preferences opted_out | No more SMS | | | | |

### 3.8 Therapist Portal - Today Tab

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 284 | Today | Load Dashboard | Therapist opens portal | Today tab displays | N/A | Welcome banner, schedule | | | | |
| 285 | Today | Upcoming Sessions | Sessions scheduled | Sessions listed | therapy_bookings SELECT | Session cards | | | | |
| 286 | Today | Start Session | Click "Start Session" | Video session opens | N/A | Video UI loads | | | | |
| 287 | Today | Recent Messages | New client messages | Messages shown | therapist_messages SELECT | Message list | | | | |
| 288 | Today | Reply Quick | Click reply button | Reply input opens | N/A | Reply field | | | | |
| 289 | Today | Client Updates | Client activity | Updates shown | N/A | Activity feed | | | | |

### 3.9 Therapist Portal - Clients Tab

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 290 | Clients | View Client List | Open clients tab | All clients shown | assignments SELECT | Client cards | | | | |
| 291 | Clients | Search Client | Search by name | Filtered results | N/A | Matching clients | | | | |
| 292 | Clients | Filter by Status | Filter active/inactive | Filtered list | N/A | Correct filter | | | | |
| 293 | Clients | Open Client Profile | Click client | Profile opens | profiles SELECT | Profile details | | | | |
| 294 | Clients | View Progress | Check client progress | Progress charts | N/A | Charts render | | | | |
| 295 | Clients | View Notes | Check session notes | Notes displayed | video_session_notes SELECT | Notes list | | | | |
| 296 | Clients | Add Note | Add client note | Note saved | therapist_notes INSERT | Note added | | | | |
| 297 | Clients | Message Client | Click message | Conversation opens | N/A | Chat interface | | | | |
| 298 | Clients | Call Client | Click call | Call initiates | phone_calls INSERT | Call starts | | | | |
| 299 | Clients | Video Client | Click video | Video session starts | video_sessions INSERT | Video UI | | | | |

### 3.10 Therapist Portal - Schedule Tab

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 300 | Schedule | View Calendar | Open schedule tab | Calendar displays | N/A | Calendar UI | | | | |
| 301 | Schedule | View Day | Click specific day | Day view shown | N/A | Day appointments | | | | |
| 302 | Schedule | View Week | Toggle week view | Week displayed | N/A | Week grid | | | | |
| 303 | Schedule | View Month | Toggle month view | Month displayed | N/A | Month calendar | | | | |
| 304 | Schedule | Set Availability | Mark available slots | Slots saved | therapist_availability INSERT | Slots marked | | | | |
| 305 | Schedule | Block Time | Block unavailable time | Time blocked | therapist_availability blocked | Time blocked | | | | |
| 306 | Schedule | Cancel Session | Cancel appointment | Session cancelled | therapy_bookings cancelled | Slot freed | | | | |
| 307 | Schedule | Reschedule | Move appointment | New time saved | therapy_bookings UPDATE | Calendar updates | | | | |

### 3.11 Coach Portal

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 308 | Coach | Access Portal | Coach uses code 0003 | Portal opens | coach_access edge function | Dashboard loads | | | | |
| 309 | Coach | Invalid Code | Wrong access code | Access denied | N/A | Error message | | | | |
| 310 | Coach | View Members | Open members tab | Client list shown | coach_clients SELECT | Member cards | | | | |
| 311 | Coach | Schedule Session | Book with client | Session created | coaching_sessions INSERT | Confirmation | | | | |
| 312 | Coach | View Earnings | Open earnings tab | Earnings displayed | coach_earnings SELECT | Earnings summary | | | | |
| 313 | Coach | Wellness Mode | Coach gives wellness tips | Appropriate responses | N/A | Coach persona | | | | |
| 314 | Coach | Escalate to Therapy | Client needs therapy | Referral created | therapist_referrals INSERT | Referral sent | | | | |

### 3.12 Coach Matching

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 315 | Coach Match | Start Questionnaire | User starts matching | Questionnaire loads | N/A | Question cards | | | | |
| 316 | Coach Match | Answer Questions | User answers all | Responses saved | coach_match_responses INSERT | Answers recorded | | | | |
| 317 | Coach Match | View Matches | Questionnaire complete | Matched coaches shown | ai_match_logs INSERT | Coach cards | | | | |
| 318 | Coach Match | Select Coach | User picks coach | Assignment created | coach_clients INSERT | Confirmation | | | | |
| 319 | Coach Match | Browse All | User browses all coaches | All coaches listed | coaches SELECT | Coach directory | | | | |

### 3.13 Therapist Requests

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 320 | Requests | Submit Request | User requests callback | Request created | therapist_requests INSERT | Confirmation | | | | |
| 321 | Requests | Request Video | User requests video session | Request created | therapist_requests type='video' | Confirmation | | | | |
| 322 | Requests | Request Text | User requests text chat | Request created | therapist_requests type='text' | Confirmation | | | | |
| 323 | Requests | Urgent Request | User marks urgent | Priority set | therapist_requests priority='urgent' | Urgent indicator | | | | |
| 324 | Requests | Therapist Views | Therapist checks requests | Requests listed | therapist_requests SELECT | Request cards | | | | |
| 325 | Requests | Accept Request | Therapist accepts | Status updated | therapist_requests status='accepted' | Status change | | | | |
| 326 | Requests | Decline Request | Therapist declines | Status updated | therapist_requests status='declined' | Status change | | | | |
| 327 | Requests | Complete Request | Request fulfilled | Status updated | therapist_requests status='completed' | Status change | | | | |

### 3.14 Homework Tasks

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 328 | Homework | Assign Task | Therapist assigns homework | Task created | homework_tasks INSERT | Task appears | | | | |
| 329 | Homework | Set Priority | Therapist sets priority | Priority saved | homework_tasks priority | Priority indicator | | | | |
| 330 | Homework | Set Due Date | Therapist sets due date | Date saved | homework_tasks due_date | Date displayed | | | | |
| 331 | Homework | Client Views | Client sees homework | Tasks displayed | homework_tasks SELECT | Task list | | | | |
| 332 | Homework | Mark Complete | Client completes | Status updated | homework_tasks completed_at | Completion marked | | | | |
| 333 | Homework | Add Notes | Client adds notes | Notes saved | homework_tasks client_notes | Notes visible | | | | |
| 334 | Homework | Therapist Review | Therapist reviews | Completion visible | N/A | Review interface | | | | |
| 335 | Homework | Overdue Task | Task past due date | Overdue indicator | N/A | Visual warning | | | | |

### 3.15 Incoming Calls

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 336 | Incoming | Call Notification | Therapist calls | Modal appears | N/A | Incoming call modal | | | | |
| 337 | Incoming | Accept Call | User accepts | Video session joins | video_sessions user_joined | Video connects | | | | |
| 338 | Incoming | Decline Call | User declines | Call rejected | N/A | Modal closes | | | | |
| 339 | Incoming | Missed Call | User doesn't respond | Missed call logged | N/A | Missed notification | | | | |

---

## Section 4: Specialized Portals (Rows 340-490)

### 4.1 DoD/Military Portal

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 340 | DoD | Access Portal | Navigate to /app/dod | Portal loads | N/A | Military-themed UI | | | | |
| 341 | DoD | Military Resources | View resources | DoD-specific content | N/A | Military resources | | | | |
| 342 | DoD | PTSD Support | Access PTSD tools | Specialized tools | N/A | PTSD resources | | | | |
| 343 | DoD | Family Support | Access family resources | Family tools | N/A | Family resources | | | | |
| 344 | DoD | Back Navigation | Click back | Returns to dashboard | N/A | Dashboard loads | | | | |

### 4.2 College Student Portal

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 345 | College | Access Portal | Navigate to /app/college | Portal loads | N/A | College-themed UI | | | | |
| 346 | College | Academic Stress | Access stress tools | Academic resources | N/A | Study tools | | | | |
| 347 | College | Social Anxiety | Access social tools | Social resources | N/A | Social tools | | | | |
| 348 | College | Career Guidance | Access career tools | Career resources | N/A | Career content | | | | |
| 349 | College | Back Navigation | Click back | Returns to dashboard | N/A | Dashboard loads | | | | |

### 4.3 First Responders Portal

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 350 | FR | Access Portal | Navigate to /app/first-responders | Portal loads | N/A | FR-themed UI | | | | |
| 351 | FR | Trauma Support | Access trauma tools | Specialized content | N/A | Trauma resources | | | | |
| 352 | FR | Peer Support | Access peer network | Peer connections | N/A | Peer system | | | | |
| 353 | FR | Critical Incident | Access CIS tools | Debriefing resources | N/A | CIS content | | | | |
| 354 | FR | Back Navigation | Click back | Returns to dashboard | N/A | Dashboard loads | | | | |

### 4.4 Golden Years Portal

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 355 | Golden | Access Portal | Navigate to /app/golden-years | Portal loads | N/A | Senior-friendly UI | | | | |
| 356 | Golden | Large Text | View content | Larger font sizes | N/A | Accessible text | | | | |
| 357 | Golden | Retirement Wellness | Access retirement tools | Retirement content | N/A | Retirement resources | | | | |
| 358 | Golden | Loneliness Support | Access social tools | Connection resources | N/A | Social content | | | | |
| 359 | Golden | Cognitive Exercises | Access brain games | Cognitive tools | N/A | Brain exercises | | | | |
| 360 | Golden | Progress Tracking | View progress | Progress displayed | golden_years_progress SELECT | Progress UI | | | | |
| 361 | Golden | Back Navigation | Click back | Returns to dashboard | N/A | Dashboard loads | | | | |

### 4.5 Educators Portal

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 362 | Educators | Access Portal | Navigate to /app/educators | Portal loads | N/A | Education-themed UI | | | | |
| 363 | Educators | Burnout Prevention | Access burnout tools | Burnout content | N/A | Burnout resources | | | | |
| 364 | Educators | Classroom Stress | Access classroom tools | Classroom content | N/A | Classroom resources | | | | |
| 365 | Educators | Work-Life Balance | Access balance tools | Balance content | N/A | Balance resources | | | | |
| 366 | Educators | Back Navigation | Click back | Returns to dashboard | N/A | Dashboard loads | | | | |

### 4.6 Hospitality Portal

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 367 | Hospitality | Access Portal | Navigate to /app/hospitality | Portal loads | N/A | Hospitality UI | | | | |
| 368 | Hospitality | Shift Work | Access shift tools | Shift content | N/A | Shift resources | | | | |
| 369 | Hospitality | Customer Stress | Access customer tools | Customer content | N/A | Customer resources | | | | |
| 370 | Hospitality | Back Navigation | Click back | Returns to dashboard | N/A | Dashboard loads | | | | |

### 4.7 Transport Portal

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 371 | Transport | Access Portal | Navigate to /app/transport | Portal loads | N/A | Transport UI | | | | |
| 372 | Transport | Road Stress | Access driving tools | Driving content | N/A | Driving resources | | | | |
| 373 | Transport | Isolation | Access connection tools | Connection content | N/A | Connection resources | | | | |
| 374 | Transport | Back Navigation | Click back | Returns to dashboard | N/A | Dashboard loads | | | | |

### 4.8 Law Enforcement Portal

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 375 | LE | Access Portal | Navigate to /app/law-enforcement | Portal loads | N/A | LE-themed UI | | | | |
| 376 | LE | Officer Wellness | Access wellness tools | Wellness content | N/A | Wellness resources | | | | |
| 377 | LE | Trauma Support | Access trauma tools | Trauma content | N/A | Trauma resources | | | | |
| 378 | LE | Peer Support | Access peer network | Peer content | N/A | Peer resources | | | | |
| 379 | LE | Back Navigation | Click back | Returns to dashboard | N/A | Dashboard loads | | | | |

### 4.9 Chronic Illness Portal

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 380 | Chronic | Access Portal | Navigate to /app/chronic-illness | Portal loads | N/A | Chronic illness UI | | | | |
| 381 | Chronic | Pain Management | Access pain tools | Pain content | N/A | Pain resources | | | | |
| 382 | Chronic | Energy Management | Access energy tools | Energy content | N/A | Energy resources | | | | |
| 383 | Chronic | Medical Anxiety | Access anxiety tools | Anxiety content | N/A | Anxiety resources | | | | |
| 384 | Chronic | Back Navigation | Click back | Returns to dashboard | N/A | Dashboard loads | | | | |

### 4.10 Cancer Support Portal

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 385 | Cancer | Access Portal | Navigate to /app/cancer-support | Portal loads | N/A | Cancer support UI | | | | |
| 386 | Cancer | Treatment Support | Access treatment tools | Treatment content | N/A | Treatment resources | | | | |
| 387 | Cancer | Emotional Support | Access emotional tools | Emotional content | N/A | Emotional resources | | | | |
| 388 | Cancer | Caregiver Support | Access caregiver tools | Caregiver content | N/A | Caregiver resources | | | | |
| 389 | Cancer | Back Navigation | Click back | Returns to dashboard | N/A | Dashboard loads | | | | |

### 4.11 Adolescent Portal

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 390 | Adolescent | Access Portal | Navigate to /app/adolescent | Portal loads | N/A | Teen-friendly UI | | | | |
| 391 | Adolescent | School Stress | Access school tools | School content | N/A | School resources | | | | |
| 392 | Adolescent | Social Media | Access social tools | Social content | N/A | Social resources | | | | |
| 393 | Adolescent | Identity | Access identity tools | Identity content | N/A | Identity resources | | | | |
| 394 | Adolescent | Parental Controls | Parent views portal | Appropriate controls | N/A | Parent options | | | | |
| 395 | Adolescent | Back Navigation | Click back | Returns to dashboard | N/A | Dashboard loads | | | | |

### 4.12 Small Business Portal

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 396 | Small Biz | Access Portal | Navigate to /app/small-business | Portal loads | N/A | Business UI | | | | |
| 397 | Small Biz | Owner Stress | Access owner tools | Owner content | N/A | Owner resources | | | | |
| 398 | Small Biz | Work-Life | Access balance tools | Balance content | N/A | Balance resources | | | | |
| 399 | Small Biz | Financial Anxiety | Access financial tools | Financial content | N/A | Financial resources | | | | |
| 400 | Small Biz | Back Navigation | Click back | Returns to dashboard | N/A | Dashboard loads | | | | |

### 4.13 Single Parents Portal

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 401 | Single Parent | Access Portal | Navigate to /app/single-parents | Portal loads | N/A | Parent UI | | | | |
| 402 | Single Parent | Parenting Stress | Access parenting tools | Parenting content | N/A | Parenting resources | | | | |
| 403 | Single Parent | Co-parenting | Access co-parenting tools | Co-parenting content | N/A | Co-parenting resources | | | | |
| 404 | Single Parent | Self-Care | Access self-care tools | Self-care content | N/A | Self-care resources | | | | |
| 405 | Single Parent | Parent Network | Access network | Parent connections | parent_connections SELECT | Network UI | | | | |
| 406 | Single Parent | Back Navigation | Click back | Returns to dashboard | N/A | Dashboard loads | | | | |

---

## Section 5: Community & Engagement (Rows 407-550)

### 5.1 Community Groups

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 407 | Groups | View Groups | Open community section | Groups listed | community_groups SELECT | Group cards | | | | |
| 408 | Groups | Join Group | User joins group | Membership created | community_group_members INSERT | Join confirmation | | | | |
| 409 | Groups | Already Member | User already in group | "Joined" indicator | N/A | Member badge | | | | |
| 410 | Groups | Leave Group | User leaves group | Membership removed | community_group_members DELETE | Leave confirmation | | | | |
| 411 | Groups | Open Chat Room | User enters group chat | Chat loads | N/A | Chat interface | | | | |
| 412 | Groups | Send Message | User sends message | Message delivered | community_group_messages INSERT | Message appears | | | | |
| 413 | Groups | Receive Message | Other user sends | Message received | Supabase Realtime | Message appears | | | | |
| 414 | Groups | Message History | User scrolls up | History loads | community_group_messages SELECT | History visible | | | | |
| 415 | Groups | Member List | User views members | Members listed | N/A | Member sidebar | | | | |
| 416 | Groups | Filter by Category | User filters groups | Filtered list | N/A | Filtered groups | | | | |
| 417 | Groups | Search Groups | User searches | Matching groups | N/A | Search results | | | | |

### 5.2 Buddy System

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 418 | Buddy | Open Buddy System | Navigate to buddies | Buddy UI loads | N/A | Buddy interface | | | | |
| 419 | Buddy | Start Matching | User starts matching | Questionnaire loads | N/A | Question cards | | | | |
| 420 | Buddy | Answer Questions | User completes survey | Responses saved | buddy_preferences INSERT | Answers recorded | | | | |
| 421 | Buddy | Find Matches | Matching completes | Matches shown | match-buddies edge function | Match cards | | | | |
| 422 | Buddy | Send Request | User requests buddy | Request sent | buddy_matches INSERT status='pending' | Request confirmation | | | | |
| 423 | Buddy | Receive Request | User receives request | Notification shown | N/A | Request notification | | | | |
| 424 | Buddy | Accept Request | User accepts buddy | Match active | buddy_matches status='active' | Match confirmed | | | | |
| 425 | Buddy | Decline Request | User declines | Request declined | buddy_matches status='declined' | Decline confirmation | | | | |
| 426 | Buddy | Message Buddy | User messages buddy | Message sent | buddy_messages INSERT | Message appears | | | | |
| 427 | Buddy | End Buddy Match | User ends match | Match ended | buddy_matches ended_at | Match removed | | | | |

### 5.3 Buddy Volunteers

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 428 | Volunteer | Apply as Volunteer | User applies | Application submitted | buddy_volunteers INSERT | Submission confirmation | | | | |
| 429 | Volunteer | Application Fields | All fields filled | Validation passes | N/A | Form submits | | | | |
| 430 | Volunteer | Missing Fields | Required field empty | Validation fails | N/A | Error message | | | | |
| 431 | Volunteer | Admin Reviews | Admin views applications | Applications listed | buddy_volunteers SELECT | Application list | | | | |
| 432 | Volunteer | Approve Application | Admin approves | Status updated | buddy_volunteers status='approved' | Approved indicator | | | | |
| 433 | Volunteer | Reject Application | Admin rejects | Status updated | buddy_volunteers status='rejected' | Rejection notice | | | | |

### 5.4 Support Wall (Whispers)

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 434 | Whispers | View Wall | Open support wall | Posts displayed | whispers SELECT | Whisper cards | | | | |
| 435 | Whispers | Create Post | User creates whisper | Post saved | whispers INSERT | Post appears | | | | |
| 436 | Whispers | Anonymous Option | User posts anonymous | No name shown | whispers is_anonymous | Anonymous label | | | | |
| 437 | Whispers | Add Hearts | User hearts post | Heart count increases | whisper_hearts INSERT | Heart count updates | | | | |
| 438 | Whispers | Remove Heart | User unheart | Heart count decreases | whisper_hearts DELETE | Heart count updates | | | | |
| 439 | Whispers | Add Reply | User replies | Reply saved | replies INSERT | Reply appears | | | | |
| 440 | Whispers | View Replies | User views replies | Replies shown | replies SELECT | Reply list | | | | |
| 441 | Whispers | Delete Own Post | User deletes post | Post removed | whispers DELETE | Post removed | | | | |
| 442 | Whispers | Report Post | User reports content | Report submitted | content_reports INSERT | Report confirmation | | | | |

### 5.5 Life Transitions

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 443 | Transitions | View Programs | Open life transitions | 8 programs shown | life_transition_programs SELECT | Program cards | | | | |
| 444 | Transitions | View Details | Click program | Detail page loads | N/A | Program details | | | | |
| 445 | Transitions | Divorce Recovery | Open divorce program | Divorce content | N/A | Divorce modules | | | | |
| 446 | Transitions | Career Transition | Open career program | Career content | N/A | Career modules | | | | |
| 447 | Transitions | Grief & Loss | Open grief program | Grief content | N/A | Grief modules | | | | |
| 448 | Transitions | New Parent | Open parent program | Parent content | N/A | Parent modules | | | | |
| 449 | Transitions | Chronic Illness | Open illness program | Illness content | N/A | Illness modules | | | | |
| 450 | Transitions | Retirement | Open retirement program | Retirement content | N/A | Retirement modules | | | | |
| 451 | Transitions | Enroll in Program | User enrolls | Enrollment created | life_transition_enrollments INSERT | Enrollment confirmation | | | | |
| 452 | Transitions | Complete Module | User completes module | Progress saved | life_transition_progress UPDATE | Progress indicator | | | | |
| 453 | Transitions | View Progress | User views progress | Progress displayed | life_transition_progress SELECT | Progress bar | | | | |

### 5.6 Support Circles

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 454 | Circles | Open Portal | Navigate to circles | Circle UI loads | N/A | Circle interface | | | | |
| 455 | Circles | Invite Member | User invites family | Invitation sent | support_circle_invites INSERT | Invite confirmation | | | | |
| 456 | Circles | Accept Invite | Family accepts | Member added | support_circle_members INSERT | Member added | | | | |
| 457 | Circles | Decline Invite | Family declines | Invite declined | support_circle_invites declined | Decline recorded | | | | |
| 458 | Circles | Share Update | User shares update | Update visible | support_circle_updates INSERT | Update appears | | | | |
| 459 | Circles | View Updates | Family views updates | Updates listed | support_circle_updates SELECT | Update list | | | | |
| 460 | Circles | Remove Member | User removes member | Member removed | support_circle_members DELETE | Member removed | | | | |

### 5.7 Achievement Badges

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 461 | Badges | View Badges | Open badges section | All badges shown | achievement_badges SELECT | Badge grid | | | | |
| 462 | Badges | Earned Badge | User has earned badge | Badge highlighted | user_badges SELECT | Earned indicator | | | | |
| 463 | Badges | Unearned Badge | User hasn't earned | Badge grayed | N/A | Locked indicator | | | | |
| 464 | Badges | Earn New Badge | User meets criteria | Badge awarded | user_badges INSERT | Badge notification | | | | |
| 465 | Badges | First Check-in | First mood check-in | Badge awarded | user_badges | Badge notification | | | | |
| 466 | Badges | 7-Day Streak | 7 consecutive days | Streak badge | user_badges | Badge notification | | | | |
| 467 | Badges | 30-Day Streak | 30 consecutive days | Streak badge | user_badges | Badge notification | | | | |
| 468 | Badges | Workshop Complete | Complete workshop | Badge awarded | user_badges | Badge notification | | | | |
| 469 | Badges | Community Helper | Help 10 users | Badge awarded | user_badges | Badge notification | | | | |
| 470 | Badges | Badge Points | Badge earned | Points added | points_history INSERT | Points increase | | | | |

### 5.8 Barter System

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 471 | Barter | View Program | Open barter info | Program explained | N/A | Program details | | | | |
| 472 | Barter | Apply | User applies | Application submitted | barter_applications INSERT | Submit confirmation | | | | |
| 473 | Barter | Application Fields | Fill all fields | Validation passes | N/A | Form submits | | | | |
| 474 | Barter | Admin Reviews | Admin views applications | Applications listed | barter_applications SELECT | Application list | | | | |
| 475 | Barter | Approve | Admin approves | Status updated | barter_applications status='approved' | Approval notice | | | | |
| 476 | Barter | Log Hours | User logs service hours | Hours recorded | community_service_hours INSERT | Hours logged | | | | |
| 477 | Barter | Verify Hours | Admin verifies hours | Hours verified | community_service_hours verified | Verified indicator | | | | |
| 478 | Barter | Earn Credits | Hours verified | Credits awarded | N/A | Credit balance | | | | |
| 479 | Barter | Redeem Credits | User redeems for therapy | Credits used | N/A | Redemption confirmation | | | | |

### 5.9 SMS Wellness Check-ins

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 480 | SMS Check | Enable SMS | User enables SMS check-ins | Preference saved | sms_preferences INSERT | Toggle enabled | | | | |
| 481 | SMS Check | Set Frequency | User sets daily | Frequency saved | sms_preferences frequency | Frequency shown | | | | |
| 482 | SMS Check | Receive SMS | Scheduled time | SMS delivered | sms_messages INSERT | SMS received | | | | |
| 483 | SMS Check | Reply to SMS | User replies | Response logged | sms_responses INSERT | Response recorded | | | | |
| 484 | SMS Check | Disable SMS | User disables | Preference updated | sms_preferences opted_out | Toggle disabled | | | | |

### 5.10 Success Stories

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 485 | Stories | View Stories | Open success stories | Stories displayed | success_stories SELECT | Story cards | | | | |
| 486 | Stories | Submit Story | User submits story | Story saved (pending) | success_stories INSERT | Submit confirmation | | | | |
| 487 | Stories | Admin Reviews | Admin views submissions | Submissions listed | success_stories SELECT | Story list | | | | |
| 488 | Stories | Approve Story | Admin approves | Story published | success_stories published | Story visible | | | | |
| 489 | Stories | Reject Story | Admin rejects | Story hidden | success_stories rejected | Rejection notice | | | | |
| 490 | Stories | Anonymous Story | User submits anonymous | Name hidden | success_stories is_anonymous | Anonymous label | | | | |

---

## Section 6: Assessments (Rows 491-550)

### 6.1 Assessment Library

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 491 | Assessments | View Library | Open assessments | 40+ assessments shown | N/A | Assessment cards | | | | |
| 492 | Assessments | Filter by Type | Filter anxiety | Anxiety tests shown | N/A | Filtered list | | | | |
| 493 | Assessments | Search | Search "depression" | Matching tests | N/A | Search results | | | | |
| 494 | Assessments | Start Assessment | User starts PHQ-9 | Questions load | N/A | Question UI | | | | |
| 495 | Assessments | Answer Questions | User answers all | Responses saved | assessment_results INSERT | Answers recorded | | | | |
| 496 | Assessments | Skip Question | User skips | Validation or skip allowed | N/A | Skip handling | | | | |
| 497 | Assessments | Complete Assessment | User finishes | Results calculated | assessment_results score | Results displayed | | | | |
| 498 | Assessments | View Results | Results page | Score interpretation | N/A | Results UI | | | | |
| 499 | Assessments | Subscale Breakdown | Complex assessment | Subscales shown | assessment_results responses | Subscale chart | | | | |
| 500 | Assessments | Retake Assessment | User retakes | New entry created | assessment_results INSERT | New results | | | | |
| 501 | Assessments | View History | User views history | Past results shown | assessment_results SELECT | History list | | | | |
| 502 | Assessments | Share with Therapist | User shares results | Sharing enabled | assessment_results shared | Share indicator | | | | |
| 503 | Assessments | Therapist Views | Therapist checks | Results visible | N/A | Results in client profile | | | | |

### 6.2 Specific Assessments

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 504 | PHQ-9 | Complete PHQ-9 | User completes | Depression score | assessment_results type='PHQ-9' | Score displayed | | | | |
| 505 | GAD-7 | Complete GAD-7 | User completes | Anxiety score | assessment_results type='GAD-7' | Score displayed | | | | |
| 506 | DASS-21 | Complete DASS-21 | User completes | Triple score | assessment_results type='DASS-21' | 3 scores shown | | | | |
| 507 | PSS | Complete PSS | User completes | Stress score | assessment_results type='PSS' | Score displayed | | | | |
| 508 | ISI | Complete ISI | User completes | Insomnia score | assessment_results type='ISI' | Score displayed | | | | |
| 509 | AUDIT | Complete AUDIT | User completes | Alcohol score | assessment_results type='AUDIT' | Score displayed | | | | |
| 510 | PCL-5 | Complete PCL-5 | User completes | PTSD score | assessment_results type='PCL-5' | Score displayed | | | | |

---

## Section 7: Daily Plan & Recommendations (Rows 511-550)

### 7.1 Daily Plan

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 511 | Daily Plan | View Plan | Open dashboard | Daily plan visible | daily_plans SELECT | Plan card | | | | |
| 512 | Daily Plan | Generate Plan | New day begins | Plan generated | generate-daily-plans edge | Activities listed | | | | |
| 513 | Daily Plan | Personalized | Based on mood | Relevant activities | ai_recommendations | Personalized items | | | | |
| 514 | Daily Plan | Complete Activity | User completes | Activity marked | daily_plans UPDATE | Completion indicator | | | | |
| 515 | Daily Plan | Skip Activity | User skips | Activity skipped | N/A | Skip recorded | | | | |
| 516 | Daily Plan | Homework Included | Therapist assigned | Homework in plan | homework_tasks | Homework visible | | | | |

### 7.2 Micro Goals

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 517 | Micro Goals | View Goals | Open dashboard | Daily micro-goals | generate-micro-goals edge | Goal cards | | | | |
| 518 | Micro Goals | Complete Goal | User completes | Goal marked done | N/A | Completion animation | | | | |
| 519 | Micro Goals | All Complete | All daily done | Celebration | N/A | Celebration UI | | | | |
| 520 | Micro Goals | Skip Goal | User skips | Goal skipped | N/A | Skip recorded | | | | |

### 7.3 AI Recommendations

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 521 | AI Recs | View Recommendations | Dashboard loads | Personalized recs | ai_recommendations SELECT | Rec cards | | | | |
| 522 | AI Recs | Click Recommendation | User clicks | Logged, navigates | ai_recommendations was_clicked | Navigation works | | | | |
| 523 | AI Recs | Complete Rec | User completes | Completion logged | ai_recommendations was_completed | Completion marked | | | | |
| 524 | AI Recs | Feedback | User gives feedback | Feedback saved | ai_recommendations user_feedback | Feedback recorded | | | | |

---

## Section 8: Dashboard Components (Rows 525-600)

### 8.1 Welcome Back Banner

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 525 | Banner | Display Name | User logged in | Name displayed | profiles display_name | "Hello, [Name]" | | | | |
| 526 | Banner | Time Greeting | Morning login | Morning greeting | N/A | "Good morning" | | | | |
| 527 | Banner | Time Greeting | Afternoon login | Afternoon greeting | N/A | "Good afternoon" | | | | |
| 528 | Banner | Time Greeting | Evening login | Evening greeting | N/A | "Good evening" | | | | |
| 529 | Banner | Streak Display | User on streak | Streak shown | N/A | Streak count | | | | |
| 530 | Banner | Mood Trend | Recent moods | Trend visible | daily_check_ins SELECT | Trend indicator | | | | |

### 8.2 Care Hub

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 531 | Care Hub | View Care Team | Open dashboard | Therapist shown | assignments SELECT | Therapist card | | | | |
| 532 | Care Hub | Message Therapist | Click message | Messaging opens | N/A | Message interface | | | | |
| 533 | Care Hub | View Appointments | Appointments exist | Listed in hub | therapy_bookings SELECT | Appointment cards | | | | |
| 534 | Care Hub | Join Appointment | Click "Join" | Video session | N/A | Video UI loads | | | | |

### 8.3 Toolkit Section

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 535 | Toolkit | View Tools | Dashboard loads | All tools shown | N/A | Tool grid | | | | |
| 536 | Toolkit | Click Breathing | Navigate to breathing | Breathing loads | N/A | Breathing UI | | | | |
| 537 | Toolkit | Click Meditation | Navigate to meditation | Meditation loads | N/A | Meditation UI | | | | |
| 538 | Toolkit | Click Journal | Navigate to journal | Journal loads | N/A | Journal UI | | | | |
| 539 | Toolkit | All Tools Accessible | Click each tool | No 404 errors | N/A | All tools load | | | | |

### 8.4 Command Palette

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 540 | Command | Open Palette | Press Cmd+K | Palette opens | N/A | Search input | | | | |
| 541 | Command | Search Feature | Type "meditation" | Meditation shown | N/A | Search result | | | | |
| 542 | Command | Navigate | Select result | Navigation works | N/A | Feature loads | | | | |
| 543 | Command | Close Palette | Press Escape | Palette closes | N/A | Palette hidden | | | | |

### 8.5 Rewards & Points

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 544 | Rewards | View Points | Dashboard loads | Points displayed | profiles points | Point count | | | | |
| 545 | Rewards | Earn Points | Complete activity | Points increase | points_history INSERT | Point animation | | | | |
| 546 | Rewards | View History | Open rewards | History shown | points_history SELECT | History list | | | | |
| 547 | Rewards | Redeem Points | Redeem option | Redemption works | points_history change<0 | Redemption confirmed | | | | |

### 8.6 Progress Analytics

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 548 | Analytics | View Progress | Open analytics | Charts displayed | N/A | Analytics UI | | | | |
| 549 | Analytics | Mood Chart | View mood trends | Chart renders | daily_check_ins SELECT | Mood chart | | | | |
| 550 | Analytics | Activity Chart | View activities | Chart renders | N/A | Activity chart | | | | |

---

## Section 9: Admin Dashboard (Rows 551-650)

### 9.1 Admin Access

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 551 | Admin | Access Portal | Admin navigates | Admin UI loads | admin-access edge function | Admin dashboard | | | | |
| 552 | Admin | Invalid Code | Wrong access code | Access denied | N/A | Error message | | | | |
| 553 | Admin | Rate Limited | Too many attempts | Blocked temporarily | admin_rate_limits | Rate limit message | | | | |

### 9.2 User Management

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 554 | Users | View Users | Open users tab | User list shown | profiles SELECT | User table | | | | |
| 555 | Users | Search User | Search by email | User found | N/A | Search results | | | | |
| 556 | Users | View User | Click user | Details shown | profiles SELECT | User profile | | | | |
| 557 | Users | Edit User | Modify user | Changes saved | profiles UPDATE | Update confirmation | | | | |
| 558 | Users | Suspend User | Suspend account | User suspended | profiles suspended_at | Suspension indicator | | | | |
| 559 | Users | Unsuspend User | Unsuspend | Access restored | profiles suspended_at null | Active indicator | | | | |
| 560 | Users | Delete User | Delete account | User deleted | profiles DELETE | Deletion confirmation | | | | |
| 561 | Users | Assign Role | Assign admin role | Role added | user_roles INSERT | Role assigned | | | | |
| 562 | Users | Remove Role | Remove role | Role removed | user_roles DELETE | Role removed | | | | |

### 9.3 Compliance Dashboard

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 563 | Compliance | View Overview | Open compliance | Stats displayed | N/A | Compliance overview | | | | |
| 564 | Compliance | Audit Trail | View audit trail | Logs displayed | audit_logs SELECT | Audit list | | | | |
| 565 | Compliance | Filter Logs | Filter by action | Filtered logs | N/A | Filtered list | | | | |
| 566 | Compliance | Export Logs | Export audit | CSV download | N/A | File downloads | | | | |
| 567 | Compliance | PHI Coverage | View PHI tables | Coverage shown | N/A | PHI table list | | | | |
| 568 | Compliance | Consent Status | View consents | Consent list | user_consents SELECT | Consent table | | | | |
| 569 | Compliance | Checklist | View checklist | Checklist shown | N/A | Checklist items | | | | |

### 9.4 Analytics

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 570 | Analytics | View Dashboard | Open analytics | Charts shown | N/A | Analytics UI | | | | |
| 571 | Analytics | Active Users | View active users | Count displayed | N/A | User count | | | | |
| 572 | Analytics | Session Stats | View sessions | Stats displayed | N/A | Session charts | | | | |
| 573 | Analytics | Revenue | View revenue | Revenue shown | N/A | Revenue chart | | | | |
| 574 | Analytics | Date Range | Change range | Data updates | N/A | Filtered data | | | | |
| 575 | Analytics | Export Data | Export analytics | CSV download | N/A | File downloads | | | | |

### 9.5 Content Management

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 576 | Content | View Library | Open content | Content listed | content_library SELECT | Content table | | | | |
| 577 | Content | Create Content | Add new content | Content created | content_library INSERT | Content added | | | | |
| 578 | Content | Edit Content | Modify content | Content updated | content_library UPDATE | Changes saved | | | | |
| 579 | Content | Publish Content | Publish draft | Content live | content_library published_at | Published indicator | | | | |
| 580 | Content | Unpublish | Unpublish content | Content hidden | content_library published_at null | Unpublished | | | | |
| 581 | Content | Delete Content | Delete content | Content removed | content_library DELETE | Content removed | | | | |
| 582 | Content | Version History | View versions | Versions listed | content_versions SELECT | Version list | | | | |

### 9.6 Crisis Management

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 583 | Crisis | View Escalations | Open crisis tab | Escalations listed | crisis_escalations SELECT | Crisis list | | | | |
| 584 | Crisis | Filter by Severity | Filter high severity | Filtered list | N/A | High severity only | | | | |
| 585 | Crisis | Assign to Staff | Assign escalation | Assignment saved | crisis_escalations assigned_to | Assignment shown | | | | |
| 586 | Crisis | Resolve Crisis | Mark resolved | Status updated | crisis_escalations resolved_at | Resolved indicator | | | | |
| 587 | Crisis | Add Notes | Add follow-up notes | Notes saved | crisis_escalations notes | Notes visible | | | | |

### 9.7 Therapist Management

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 588 | Therapists | View Therapists | Open therapists tab | Therapists listed | therapists SELECT | Therapist table | | | | |
| 589 | Therapists | Add Therapist | Create new | Therapist added | therapists INSERT | Therapist created | | | | |
| 590 | Therapists | Edit Therapist | Modify profile | Changes saved | therapists UPDATE | Update confirmed | | | | |
| 591 | Therapists | Activate | Activate therapist | Status active | therapists is_active true | Active indicator | | | | |
| 592 | Therapists | Deactivate | Deactivate therapist | Status inactive | therapists is_active false | Inactive indicator | | | | |
| 593 | Therapists | View Caseload | Check assignments | Clients listed | assignments SELECT | Caseload shown | | | | |

### 9.8 Application Reviews

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 594 | Applications | Barter Apps | View barter apps | Applications listed | barter_applications SELECT | Application list | | | | |
| 595 | Applications | Volunteer Apps | View volunteer apps | Applications listed | buddy_volunteers SELECT | Volunteer list | | | | |
| 596 | Applications | Therapist Apps | View therapist apps | Applications listed | therapist_applications SELECT | Application list | | | | |
| 597 | Applications | Approve App | Approve application | Status updated | [table] status='approved' | Approved indicator | | | | |
| 598 | Applications | Reject App | Reject application | Status updated | [table] status='rejected' | Rejected indicator | | | | |

### 9.9 System Settings

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 599 | Settings | View Settings | Open settings | Settings displayed | N/A | Settings form | | | | |
| 600 | Settings | Update Settings | Modify setting | Setting saved | system_settings UPDATE | Confirmation | | | | |

---

## Section 10: Pricing & Payment (Rows 601-650)

### 10.1 Pricing Calculator

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 601 | Pricing | Open Calculator | Navigate to pricing | Calculator loads | N/A | Calculator UI | | | | |
| 602 | Pricing | Select Goals | User selects goals | Goals recorded | N/A | Goals checked | | | | |
| 603 | Pricing | Select Frequency | User selects weekly | Frequency set | N/A | Weekly selected | | | | |
| 604 | Pricing | Insurance Option | User selects insurance | Insurance flow | N/A | Insurance UI | | | | |
| 605 | Pricing | View Estimate | Complete calculator | Estimate shown | N/A | Price displayed | | | | |
| 606 | Pricing | Book from Calc | Click book | Booking flow | N/A | Booking starts | | | | |

### 10.2 Insurance Checker

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 607 | Insurance | Open Checker | Navigate to checker | Checker loads | N/A | Insurance UI | | | | |
| 608 | Insurance | Select Provider | Select insurance | Provider selected | N/A | Provider shown | | | | |
| 609 | Insurance | Enter Plan | Enter plan details | Details recorded | N/A | Plan entered | | | | |
| 610 | Insurance | Check Coverage | Submit check | Coverage result | N/A | Coverage shown | | | | |

### 10.3 Payment Processing

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 611 | Payment | Load Stripe | Checkout step | Stripe elements | N/A | Card input visible | | | | |
| 612 | Payment | Valid Card | Enter valid card | Card accepted | N/A | Card validated | | | | |
| 613 | Payment | Invalid Card | Enter invalid card | Error shown | N/A | Error message | | | | |
| 614 | Payment | Declined Card | Card declined | Error shown | N/A | Decline message | | | | |
| 615 | Payment | Process Payment | Submit payment | Payment processed | stripe webhook | Success message | | | | |
| 616 | Payment | Receipt | Payment complete | Receipt sent | N/A (Stripe) | Receipt email | | | | |

### 10.4 Subscriptions

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 617 | Subs | View Plans | Open subscriptions | Plans displayed | N/A | Plan cards | | | | |
| 618 | Subs | Subscribe | Select plan | Subscription created | subscriptions INSERT | Subscription active | | | | |
| 619 | Subs | Cancel Sub | Cancel subscription | Subscription cancelled | subscriptions cancelled | Cancellation confirmed | | | | |
| 620 | Subs | Upgrade Plan | Upgrade to higher | Plan upgraded | subscriptions UPDATE | New plan active | | | | |
| 621 | Subs | Downgrade Plan | Downgrade to lower | Plan downgraded | subscriptions UPDATE | New plan active | | | | |

---

## Section 11: Health Integrations (Rows 651-700)

### 11.1 Health Sync Widget

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 651 | Health | View Widget | Dashboard loads | Widget visible | N/A | Sync widget | | | | |
| 652 | Health | Coming Soon | Click connect | Coming soon shown | N/A | Coming soon message | | | | |

### 11.2 Future: Apple Health (Placeholder)

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 653 | Apple | OAuth Flow | Connect Apple Health | OAuth starts | user_health_connections INSERT | OAuth redirect | | | | |
| 654 | Apple | Permissions | Grant permissions | Access granted | N/A | Permission success | | | | |
| 655 | Apple | Sync Data | Initial sync | Data synced | sync-health-data edge | Data displayed | | | | |
| 656 | Apple | View Metrics | Open health | Metrics shown | N/A | Health metrics | | | | |
| 657 | Apple | Disconnect | Disconnect Apple | Connection removed | user_health_connections DELETE | Disconnected | | | | |

### 11.3 Future: Google Fit (Placeholder)

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 658 | Google | OAuth Flow | Connect Google Fit | OAuth starts | user_health_connections INSERT | OAuth redirect | | | | |
| 659 | Google | Permissions | Grant permissions | Access granted | N/A | Permission success | | | | |
| 660 | Google | Sync Data | Initial sync | Data synced | sync-health-data edge | Data displayed | | | | |
| 661 | Google | View Metrics | Open health | Metrics shown | N/A | Health metrics | | | | |
| 662 | Google | Disconnect | Disconnect Google | Connection removed | user_health_connections DELETE | Disconnected | | | | |

### 11.4 Future: Fitbit (Placeholder)

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 663 | Fitbit | OAuth Flow | Connect Fitbit | OAuth starts | user_health_connections INSERT | OAuth redirect | | | | |
| 664 | Fitbit | Permissions | Grant permissions | Access granted | N/A | Permission success | | | | |
| 665 | Fitbit | Sync Data | Initial sync | Data synced | sync-health-data edge | Data displayed | | | | |
| 666 | Fitbit | View Metrics | Open health | Metrics shown | N/A | Health metrics | | | | |
| 667 | Fitbit | Disconnect | Disconnect Fitbit | Connection removed | user_health_connections DELETE | Disconnected | | | | |

---

## Section 12: Notifications (Rows 668-700)

### 12.1 In-App Notifications

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 668 | Notif | View Notifications | Click bell icon | Notifications shown | notifications SELECT | Notification list | | | | |
| 669 | Notif | Unread Count | New notifications | Badge count | N/A | Badge number | | | | |
| 670 | Notif | Mark Read | Click notification | Marked as read | notifications read_at | Badge decreases | | | | |
| 671 | Notif | Mark All Read | Click mark all | All marked read | notifications UPDATE | Badge clears | | | | |
| 672 | Notif | Notification Action | Click action | Navigates correctly | N/A | Correct destination | | | | |

### 12.2 Cross-Dashboard Notifications

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 673 | Cross | Therapist to Client | Therapist sends | Client receives | cross_dashboard_notifications INSERT | Client notified | | | | |
| 674 | Cross | Admin to User | Admin broadcasts | User receives | cross_dashboard_notifications INSERT | User notified | | | | |
| 675 | Cross | Crisis Alert | Crisis detected | Therapist alerted | cross_dashboard_notifications | Therapist notified | | | | |

### 12.3 Email Notifications

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 676 | Email | Booking Confirmation | Booking made | Email sent | N/A (Resend) | Email received | | | | |
| 677 | Email | Appointment Reminder | 24 hours before | Email sent | N/A (Resend) | Email received | | | | |
| 678 | Email | Password Reset | Reset requested | Email sent | N/A (Resend) | Email received | | | | |
| 679 | Email | Welcome Email | New signup | Email sent | N/A (Resend) | Email received | | | | |

### 12.4 Push Notifications (Future)

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 680 | Push | Permission | Request permission | Permission granted | N/A | Permission dialog | | | | |
| 681 | Push | Receive Push | Notification sent | Push received | N/A | Push displays | | | | |
| 682 | Push | Click Push | Click notification | App opens | N/A | Correct screen | | | | |

---

## Section 13: Marketing Site (Rows 683-720)

### 13.1 Cinematic Intro

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 683 | Intro | Load Intro | Navigate to /site | Intro plays | N/A | Animation sequence | | | | |
| 684 | Intro | Logo Fade | After 0.3s | Logo fades in | N/A | Logo visible | | | | |
| 685 | Intro | Text Fade | After 1.5s | "Build the Best You" | N/A | Text visible | | | | |
| 686 | Intro | Button Fade | After 4.5s | ENTER button | N/A | Button visible | | | | |
| 687 | Intro | Click Enter | Click button | Navigate to home | N/A | Home loads | | | | |

### 13.2 Site Pages

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 688 | Site | Home Page | Navigate to /home | Home loads | N/A | Home content | | | | |
| 689 | Site | Therapy Page | Navigate to /therapy | Therapy info | N/A | Therapy content | | | | |
| 690 | Site | Coaching Page | Navigate to /coaching | Coaching info | N/A | Coaching content | | | | |
| 691 | Site | Pricing Page | Navigate to /pricing | Pricing info | N/A | Pricing content | | | | |
| 692 | Site | About Page | Navigate to /about | About info | N/A | About content | | | | |
| 693 | Site | Contact Page | Navigate to /contact | Contact form | N/A | Contact form | | | | |
| 694 | Site | Meet Henry | Navigate to /henry | Henry intro | N/A | Henry content | | | | |
| 695 | Site | Privacy Policy | Navigate to /privacy | Policy text | N/A | Policy content | | | | |
| 696 | Site | Terms | Navigate to /terms | Terms text | N/A | Terms content | | | | |
| 697 | Site | HIPAA Notice | Navigate to /hipaa | HIPAA text | N/A | HIPAA content | | | | |

### 13.3 Demo Mode

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 698 | Demo | Enter Demo | Click demo button | Dashboard loads | N/A | Demo dashboard | | | | |
| 699 | Demo | Demo Data | View dashboard | Mock data shown | N/A | Sample activities | | | | |
| 700 | Demo | Demo Features | Use features | Features work | N/A | Features accessible | | | | |

---

## Section 14: Careers & Financial (Rows 701-750)

### 14.1 Career Coaching

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 701 | Career | View Modules | Open career section | Modules listed | career_module_progress SELECT | Module cards | | | | |
| 702 | Career | Start Module | Begin module | Content loads | career_module_progress INSERT | Module content | | | | |
| 703 | Career | Complete Lesson | Finish lesson | Progress saved | career_module_progress UPDATE | Progress bar | | | | |
| 704 | Career | Take Assessment | Start career quiz | Assessment loads | career_assessments INSERT | Quiz UI | | | | |
| 705 | Career | View Results | Complete quiz | Results shown | career_assessments results | Results display | | | | |

### 14.2 Financial Assistance

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 706 | Financial | View Banner | Open therapy page | Help banner shown | N/A | Banner visible | | | | |
| 707 | Financial | Open Modal | Click banner | 4-step modal opens | N/A | Modal displays | | | | |
| 708 | Financial | Navigate Steps | Click next | Steps progress | N/A | Step navigation | | | | |
| 709 | Financial | Apply Now | Click apply | Application form | N/A | Form loads | | | | |
| 710 | Financial | Learn Barter | Click barter | Barter info | N/A | Barter page | | | | |

### 14.3 Course Enrollments

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 711 | Courses | View Courses | Open courses | Courses listed | N/A | Course cards | | | | |
| 712 | Courses | Enroll | Click enroll | Enrollment created | course_enrollments INSERT | Enrollment confirmed | | | | |
| 713 | Courses | View Progress | Check progress | Progress shown | course_enrollments progress | Progress bar | | | | |
| 714 | Courses | Complete Course | Finish all | Certificate earned | course_enrollments completed | Certificate shown | | | | |

---

## Section 15: GDPR & Data (Rows 715-750)

### 15.1 Data Export

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 715 | Export | Request Export | Click export button | Export initiated | export-user-data edge | Export started | | | | |
| 716 | Export | Processing | Export in progress | Loading shown | N/A | Loading indicator | | | | |
| 717 | Export | Download Ready | Export complete | File downloads | N/A | JSON file | | | | |
| 718 | Export | Verify Content | Open file | All data present | N/A | Complete data | | | | |

### 15.2 Data Deletion

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 719 | Delete | Request Deletion | Click delete | Confirmation shown | N/A | Confirm dialog | | | | |
| 720 | Delete | Confirm Deletion | Confirm delete | Deletion queued | purge-user-data edge | Deletion confirmed | | | | |
| 721 | Delete | Data Purged | Deletion complete | Data removed | Multiple DELETE ops | Account deleted | | | | |
| 722 | Delete | Audit Log | Deletion complete | Audit entry | auth_user_audit action='data_purge' | Audit logged | | | | |

### 15.3 Consent Management

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 723 | Consent | First Visit | New user | Consent prompt | N/A | Consent dialog | | | | |
| 724 | Consent | Accept All | Accept consent | Consents saved | user_consents INSERT | Consent recorded | | | | |
| 725 | Consent | Decline Non-Essential | Decline some | Partial consent | user_consents | Partial saved | | | | |
| 726 | Consent | View Consents | Open settings | Consents listed | user_consents SELECT | Consent list | | | | |
| 727 | Consent | Update Consent | Change preference | Consent updated | user_consents UPDATE | Update confirmed | | | | |
| 728 | Consent | Terms Version | Terms updated | Re-consent | user_consents version | Re-consent prompt | | | | |

### 15.4 Audit Logging

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 729 | Audit | Action Logged | Any user action | Audit entry | audit_logs INSERT | N/A (backend) | | | | |
| 730 | Audit | PHI Access | View PHI data | PHI log entry | data_access_logs INSERT | N/A (backend) | | | | |
| 731 | Audit | Admin Action | Admin modifies | Admin log | auth_user_audit INSERT | N/A (backend) | | | | |
| 732 | Audit | Session Start | User logs in | Session log | admin_sessions INSERT | N/A (backend) | | | | |
| 733 | Audit | Session End | User logs out | Session end | admin_sessions expires_at | N/A (backend) | | | | |

---

## Section 16: Error Handling (Rows 734-750)

### 16.1 Compassionate Errors

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 734 | Errors | Network Error | Lose connection | Compassionate message | N/A | "Let's try again" | | | | |
| 735 | Errors | Save Failed | Save fails | Supportive message | N/A | Gentle error | | | | |
| 736 | Errors | 404 Page | Bad URL | Friendly 404 | N/A | Helpful 404 page | | | | |
| 737 | Errors | 500 Error | Server error | Compassionate message | N/A | "We're on it" | | | | |
| 738 | Errors | Validation | Invalid input | Helpful message | N/A | Clear guidance | | | | |

### 16.2 Error Boundary

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 739 | Boundary | Component Crash | Component fails | Fallback shown | Sentry capture | Error boundary UI | | | | |
| 740 | Boundary | Recovery | User refreshes | Component recovers | N/A | Normal state | | | | |
| 741 | Boundary | Report Error | Click report | Report sent | Sentry | Report confirmed | | | | |

### 16.3 Sentry Monitoring

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 742 | Sentry | Error Captured | Error occurs | Sent to Sentry | Sentry dashboard | N/A | | | | |
| 743 | Sentry | Context | Error captured | User context included | Sentry dashboard | N/A | | | | |
| 744 | Sentry | Breadcrumbs | Error captured | Trail included | Sentry dashboard | N/A | | | | |

### 16.4 Offline Handling

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 745 | Offline | Detect Offline | Connection lost | Offline indicator | N/A | Offline banner | | | | |
| 746 | Offline | Queue Actions | Action while offline | Action queued | N/A | Queue indicator | | | | |
| 747 | Offline | Reconnect | Connection restored | Actions sync | N/A | Sync in progress | | | | |
| 748 | Offline | Sync Complete | All synced | Confirmation | N/A | Sync complete | | | | |

### 16.5 Retry Logic

| Row | Module | Feature | Scenario | Expected Outcome | Backend Log Check | Frontend/UI Check | Pass/Fail | Notes | Tester | Date |
|-----|--------|---------|----------|------------------|-------------------|-------------------|-----------|-------|--------|------|
| 749 | Retry | Auto Retry | Request fails | Automatic retry | N/A | Retry indicator | | | | |
| 750 | Retry | Max Retries | 3 retries fail | Error shown | N/A | Final error | | | | |

---

## Summary - Part 1

| Section | Rows | Status |
|---------|------|--------|
| Core Wellness Toolkit | 1-150 | ⏳ |
| Henry AI Companion | 151-250 | ⏳ |
| Coaching & Therapy | 251-420 | ⏳ |
| Specialized Portals | 421-490 | ⏳ |
| Community & Engagement | 491-550 | ⏳ |
| Assessments | 491-550 | ⏳ |
| Daily Plan & Recommendations | 511-550 | ⏳ |
| Dashboard Components | 525-600 | ⏳ |
| Admin Dashboard | 551-650 | ⏳ |
| Pricing & Payment | 601-650 | ⏳ |
| Health Integrations | 651-700 | ⏳ |
| Notifications | 668-700 | ⏳ |
| Marketing Site | 683-720 | ⏳ |
| Careers & Financial | 701-750 | ⏳ |
| GDPR & Data | 715-750 | ⏳ |
| Error Handling | 734-750 | ⏳ |

**Total Part 1 Rows:** 750  
**Completion:** 0/750 (0%)

---

*Continue to Part 2 for Security, Compliance, and Infrastructure testing...*
