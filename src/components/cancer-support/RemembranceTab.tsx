import React from "react";
import { useNavigate } from "react-router-dom";
import { Flower, BookOpen, HeartHandshake, MessageSquare, Star, Leaf, Download, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import ResourceCard from "./ResourceCard";
import { motion } from "framer-motion";

interface RemembranceTabProps {
  onFeatureClick: (path: string) => void;
}

const RemembranceTab: React.FC<RemembranceTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleResourceClick = (path: string, title: string) => {
    toast({
      title: isSpanish ? "Accediendo a Recursos Especiales" : "Accessing Special Resources",
      description: title,
      duration: 2000
    });
    
    navigate(path, {
      state: {
        fromCancerSupport: true,
        cancerSupportContext: 'remembrance',
        specializedContent: true,
        preventTutorial: true
      }
    });
  };

  const handleDownload = (resourceType: string, fileName: string) => {
    toast({
      title: isSpanish ? "Descargando Recurso" : "Downloading Resource",
      description: isSpanish ? `Preparando ${resourceType}...` : `Preparing ${resourceType}...`,
      duration: 1000
    });
    
    // Create actual downloadable content
    const content = generateDownloadContent(resourceType, fileName);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Success toast
    setTimeout(() => {
      toast({
        title: isSpanish ? "¡Descarga Completada!" : "Download Complete!",
        description: isSpanish ? `${fileName} se ha descargado exitosamente` : `${fileName} has been downloaded successfully`,
        duration: 3000
      });
    }, 1200);
  };

  const generateDownloadContent = (resourceType: string, fileName: string): string => {
    const templates = {
      "Memorial Garden Guide": `
# Memorial Garden Guide - A Space for Remembrance

## Creating Your Virtual Memorial Space

### Getting Started
- Choose meaningful photos and memories
- Write heartfelt tributes and stories
- Add music or audio recordings that remind you of your loved one
- Invite family and friends to contribute

### Organizing Memories
1. **Photo Collections**: Group photos by time period, events, or themes
2. **Story Writing**: Share favorite memories, funny moments, and life lessons
3. **Audio Messages**: Record voice messages or favorite songs
4. **Video Tributes**: Create or upload video memories

### Sharing Guidelines
- Respect privacy settings and family wishes
- Keep content positive and celebratory of life
- Include others in the memorial process
- Update regularly with new memories

### Healing Through Remembrance
The memorial garden serves as:
- A place for quiet reflection
- A way to keep memories alive
- A healing space for grief processing
- A celebration of a life well-lived

Remember: There's no right or wrong way to remember someone. This space is yours to create in whatever way feels most meaningful.

---
Created with love by Thrive Cancer Support Community
`,
      
      "Grief Handbook": `
# Grief Handbook - Navigating Loss with Compassion

## Understanding Grief
Grief is a natural response to loss. It's not a problem to be solved, but a process to be experienced.

### The Grief Journey
- **Denial**: "This can't be happening"
- **Anger**: "Why them? Why now?"
- **Bargaining**: "If only I had..."
- **Depression**: Deep sadness and longing
- **Acceptance**: Finding peace with the reality

### Important Reminders
- Grief has no timeline
- Everyone grieves differently
- It's okay to have good days and bad days
- Seeking help is a sign of strength

### Coping Strategies
1. **Allow yourself to feel**: Don't suppress emotions
2. **Maintain routines**: Structure can provide comfort
3. **Connect with others**: Share your feelings with trusted friends
4. **Take care of your body**: Eat well, sleep, exercise gently
5. **Honor their memory**: Find meaningful ways to remember

### When to Seek Professional Help
- Thoughts of self-harm
- Unable to perform daily activities for extended periods
- Substance abuse as coping mechanism
- Persistent feelings of guilt or blame

### Resources for Support
- Grief counseling services
- Support groups (online and in-person)
- Books and educational materials
- Memorial activities and rituals

You are not alone in this journey. Reach out for support when you need it.

---
Thrive Cancer Support - Walking alongside you in your healing journey
`,

      "Legacy Project Kit": `
# Legacy Project Kit - Honoring Their Memory Through Action

## What is a Legacy Project?
A legacy project is a meaningful way to honor your loved one's memory while helping others and creating positive change in the world.

## Types of Legacy Projects

### 1. Memorial Funds
- Scholarship funds in their name
- Donations to their favorite charity
- Research funding for cancer treatment
- Support funds for other families

### 2. Community Projects
- Memorial gardens or benches
- Volunteer programs they would have supported
- Community events in their honor
- Awareness campaigns

### 3. Personal Projects
- Writing their life story
- Creating photo albums or scrapbooks
- Recording family history
- Preserving their recipes or traditions

### 4. Ongoing Tributes
- Annual charity events
- Birthday celebrations of their life
- Holiday traditions in their memory
- Social media memorial pages

## Getting Started
1. **Reflect on their values**: What was important to them?
2. **Consider their interests**: What did they love doing?
3. **Think about impact**: How would they want to help others?
4. **Start small**: Begin with manageable projects
5. **Involve others**: Include family and friends

## Planning Your Project
- Set clear goals and timeline
- Determine budget and resources needed
- Identify key participants
- Create a plan for sustainability
- Document the process

## Sample Projects
- "Mom's Recipe Collection" cookbook with proceeds to charity
- Annual 5K run for cancer research
- Scholarship fund for students in need
- Memorial bench in their favorite park
- Art therapy program for cancer patients

Remember: The best legacy project is one that reflects their unique spirit and continues their positive impact on the world.

---
With love and support from Thrive Cancer Community
`,

      "Support Group Guide": `
# Support Group Guide - Finding Community in Grief

## The Power of Shared Experience
Connecting with others who understand your loss can be incredibly healing. This guide will help you find and benefit from grief support groups.

## Types of Support Groups

### 1. General Grief Support
- Open to all types of loss
- Focus on grief process and coping
- Mixed experiences and perspectives

### 2. Cancer-Specific Groups
- For those who lost someone to cancer
- Understanding of treatment journey
- Shared medical and caregiving experiences

### 3. Relationship-Specific Groups
- Widow/widower groups
- Parent loss support
- Child/teen grief groups
- Sibling loss support

### 4. Online vs. In-Person
**Online Benefits:**
- Accessible from home
- Available 24/7 forums
- Anonymous participation option
- Global community connection

**In-Person Benefits:**
- Face-to-face connection
- Local community building
- Non-verbal communication
- Structured meeting times

## What to Expect
- **Introductions**: Share as much or as little as you're comfortable with
- **Check-ins**: How everyone is doing this week
- **Topic discussions**: Specific grief-related themes
- **Resource sharing**: Tips and recommendations
- **Closing ritual**: Moment of remembrance or hope

## Group Guidelines
- Respect confidentiality
- Listen without judgment
- Share when ready (no pressure)
- Avoid giving advice unless asked
- Honor all forms of grief expression

## Finding the Right Group
- Ask healthcare providers for referrals
- Check hospital and hospice programs
- Search online grief organizations
- Try different groups to find your fit
- Consider both short-term and ongoing groups

## Starting Your Own Group
If you can't find what you need:
1. Contact local hospitals or community centers
2. Use social media to find others
3. Start with just 2-3 people
4. Set regular meeting times
5. Create basic guidelines together

You deserve support. Don't give up until you find your community.

---
Thrive Cancer Support - Building bridges of understanding and hope
`,

      "Group Schedule": `
# Cancer Support Group Schedule - Weekly & Monthly Meetings

## WEEKLY SUPPORT GROUPS

### Monday Evenings - 7:00 PM EST
**Newly Diagnosed Support Circle**
- For those within 6 months of diagnosis
- Focus: Understanding treatment options, managing fear, building hope
- Facilitator: Sarah Chen, LCSW
- Virtual Meeting: Zoom Room A

### Tuesday Afternoons - 2:00 PM EST  
**Caregiver Coffee Hour**
- For spouses, family members, and friends providing care
- Focus: Self-care, communication, managing stress
- Facilitator: Dr. Michael Rodriguez, PhD
- In-Person: Community Center Room 3 & Virtual Option

### Wednesday Evenings - 6:30 PM EST
**Young Adult Cancer Warriors (Ages 18-40)**
- Addressing unique challenges of young adult cancer
- Focus: Career, relationships, fertility, future planning
- Facilitator: Jessica Martinez, MA
- Virtual Meeting: Zoom Room B

### Thursday Mornings - 10:00 AM EST
**Grief & Remembrance Circle**  
- For those who have lost someone to cancer
- Focus: Processing grief, honoring memory, finding hope
- Facilitator: Rev. David Thompson, Chaplain
- In-Person: Memorial Garden & Virtual Option

### Friday Afternoons - 3:00 PM EST
**Living with Metastatic Cancer**
- For those with advanced stage diagnoses
- Focus: Quality of life, hope, practical planning
- Facilitator: Dr. Lisa Park, Oncology Social Worker
- Virtual Meeting: Zoom Room C

## MONTHLY SPECIAL GROUPS

### First Saturday of Each Month - 10:00 AM EST
**Family Meeting: Kids & Cancer**
- For families with children affected by cancer
- Age-appropriate activities and discussions
- Facilitators: Child Life Specialists
- Location: Family Resource Center

### Second Sunday of Each Month - 2:00 PM EST  
**Survivor Celebration Circle**
- For those who have completed active treatment
- Focus: Survivorship challenges, celebration, giving back
- Facilitator: Survivor volunteers
- Location: Varies (often outdoor activities)

### Third Thursday of Each Month - 7:00 PM EST
**Men's Cancer Support**
- Male-focused discussions and support
- Topics: Communication, masculinity, relationships
- Facilitator: Tom Wilson, Cancer Survivor & Counselor
- Location: Community Center & Virtual

### Fourth Saturday of Each Month - 1:00 PM EST
**Creative Expression Workshop**
- Art, music, and writing for healing
- No experience necessary
- Facilitator: Art therapist Maria Santos
- Location: Art Studio, Building 2

## SPECIAL EVENTS

### Monthly Guest Speakers
- Medical professionals
- Nutrition specialists  
- Wellness experts
- Survivor inspirational stories

### Quarterly Social Events
- Potluck dinners
- Outdoor activities
- Holiday celebrations
- Memorial services

## How to Join
- No advance registration required for drop-in groups
- First-time visitors welcome any time
- Contact information: support@thrivecc.org
- Phone: 1-800-THRIVE-1
- All groups are free of charge

## Virtual Meeting Access
- Meeting links sent via email newsletter
- Tech support available 30 minutes before each meeting
- Recordings available for registered participants
- Phone dial-in option for all virtual meetings

Remember: You belong here. Come as you are, whenever you're ready.

---
Thrive Cancer Support Community
Building hope, one connection at a time
`,

      "Memorial Action Guide": `
# Memorial Action Guide - Turning Grief into Purpose

## Introduction
This guide helps you channel your grief into meaningful action that honors your loved one's memory while helping others facing similar challenges.

## Phase 1: Reflection & Planning

### Understanding Their Values
- What causes did they care about most?
- How did they help others in their lifetime?
- What would they want their legacy to be?
- What brought them the most joy?

### Assessing Your Resources
- How much time can you commit?
- What financial resources are available?
- What skills and talents do you have?
- Who else might want to participate?

## Phase 2: Choosing Your Action

### Direct Cancer Support
**Research Funding**
- Donate to specific cancer research
- Fund clinical trials
- Support breakthrough therapy development
- Create named research grants

**Patient Support**
- Sponsor treatment costs for families in need
- Provide comfort items for treatment centers
- Fund transportation for rural patients
- Support housing near treatment facilities

**Family Services**
- Childcare during treatment
- Meal delivery programs
- Household help services
- Pet care assistance

### Community Impact Projects
**Awareness Campaigns**
- Social media education initiatives
- Community screening events
- Prevention workshops
- Early detection programs

**Memorial Spaces**
- Hospital meditation gardens
- Treatment center improvements
- Memorial plaques or benches
- Art installations

**Educational Programs**
- Cancer prevention workshops
- Nutrition and wellness classes
- Caregiver training programs
- Support group facilitation

## Phase 3: Implementation

### Starting Small
- Begin with pilot programs
- Test ideas with close friends/family
- Document what works
- Build gradually

### Building Partnerships
- Contact existing cancer organizations
- Partner with hospitals and treatment centers
- Connect with other memorial fund families
- Leverage corporate sponsors

### Creating Sustainability
- Develop ongoing funding sources
- Train others to continue the work
- Create operating procedures
- Establish governance structure

## Phase 4: Measuring Impact

### Tracking Success
- Number of people helped
- Funds raised and distributed
- Services provided
- Lives touched

### Sharing Stories
- Collect testimonials
- Document success stories
- Share progress with supporters
- Celebrate milestones

## Sample Action Plans

### The "Mom's Kitchen" Meal Program
*In memory of someone who loved cooking*
- Partner with local treatment center
- Recruit volunteer cooks
- Deliver meals to families in treatment
- Fund kitchen supplies and ingredients

### The "Dad's Garden" Healing Space
*In memory of someone who loved gardening*
- Create memorial garden at hospital
- Include benches for reflection
- Plant meaningful flowers and trees
- Maintain through volunteer program

### The "Sister's Scholarship" Fund
*For someone who valued education*
- Create scholarship for cancer survivors
- Partner with local colleges
- Fund tuition and books
- Mentorship program included

## Resources & Support
- Nonprofit formation guidance
- Fundraising best practices
- Marketing and communication tools
- Legal and tax considerations

## Remember
The best memorial action is one that:
- Reflects their unique personality
- Creates lasting positive change
- Brings you healing and purpose
- Inspires others to give back

Your loved one's legacy lives on through your actions.

---
Thrive Cancer Support Community
Transforming loss into lasting love
`
    };

    return templates[resourceType as keyof typeof templates] || `# ${resourceType}\n\nThank you for downloading this resource from Thrive Cancer Support Community.\n\nContent will be continuously updated to provide you with the most helpful and meaningful information.\n\n---\nWith love and support,\nThrive Cancer Support Team`;
  };
  
  const remembranceResources = [
    {
      id: "memorial-garden",
      title: isSpanish ? "Jardín Memorial Virtual" : "Virtual Memorial Garden",
      icon: <Flower className="h-5 w-5 text-rose-500" />,
      description: isSpanish 
        ? "Un espacio virtual sagrado para honrar a los seres queridos que hemos perdido por el cáncer"
        : "A sacred virtual space to honor loved ones we have lost to cancer",
      path: "/memorial-garden",
      downloadable: isSpanish ? "Guía de Jardín Memorial" : "Memorial Garden Guide",
      fileName: "Memorial_Garden_Guide.txt"
    },
    {
      id: "grief-resources",
      title: isSpanish ? "Recursos para el Duelo" : "Grief Resources",
      icon: <BookOpen className="h-5 w-5 text-indigo-500" />,
      description: isSpanish 
        ? "Información especializada y apoyo profesional para navegar el proceso de duelo por cáncer"
        : "Specialized information and professional support for navigating cancer grief",
      path: "/grief-counseling",
      downloadable: isSpanish ? "Manual de Duelo" : "Grief Handbook",
      fileName: "Grief_Handbook.txt"
    },
    {
      id: "legacy-projects",
      title: isSpanish ? "Proyectos de Legado" : "Legacy Projects",
      icon: <Star className="h-5 w-5 text-amber-500" />,
      description: isSpanish 
        ? "Ideas inspiradoras para crear legados significativos que honren su memoria y ayuden a otros"
        : "Inspiring ideas for creating meaningful legacies that honor their memory and help others",
      path: "/legacy-builder",
      downloadable: isSpanish ? "Kit de Proyecto de Legado" : "Legacy Project Kit",
      fileName: "Legacy_Project_Kit.txt"
    },
    {
      id: "bereavement-community",
      title: isSpanish ? "Comunidad de Duelo" : "Bereavement Community",
      icon: <HeartHandshake className="h-5 w-5 text-green-500" />,
      description: isSpanish 
        ? "Conéctate con otros que comprenden tu pérdida y caminen contigo en esta jornada"
        : "Connect with others who understand your loss and walk alongside you in this journey",
      path: "/bereavement-support-groups",
      downloadable: isSpanish ? "Guía de Grupo de Apoyo" : "Support Group Guide",
      fileName: "Support_Group_Guide.txt"
    },
    {
      id: "memorial-wall",
      title: isSpanish ? "Muro Conmemorativo" : "Memorial Wall",
      icon: <Leaf className="h-5 w-5 text-teal-500" />,
      description: isSpanish 
        ? "Comparte historias, fotos y recuerdos hermosos en nuestro muro comunitario de recuerdos"
        : "Share beautiful stories, photos, and memories on our community wall of remembrance",
      path: "/memorial-tribute-wall",
      downloadable: isSpanish ? "Plantilla de Tributo" : "Tribute Template",
      fileName: "Tribute_Template.txt"
    },
    {
      id: "grief-groups",
      title: isSpanish ? "Grupos de Duelo" : "Grief Groups",
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
      description: isSpanish 
        ? "Grupos de apoyo facilitados por profesionales especializados en duelo por cáncer"
        : "Support groups facilitated by professionals specialized in cancer grief",
      path: "/professional-grief-support",
      downloadable: isSpanish ? "Horario de Grupos" : "Group Schedule",
      fileName: "Group_Schedule.txt"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Heart className="h-8 w-8 text-rose-500 mr-3" />
          <h2 className="text-3xl font-bold text-rose-600 dark:text-rose-400">
            {isSpanish ? "Recursos de Conmemoración" : "Remembrance Resources"}
          </h2>
          <Sparkles className="h-8 w-8 text-amber-500 ml-3" />
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          {isSpanish 
            ? "Apoyo especializado y herramientas significativas para honrar y recordar a los seres queridos que han fallecido de cáncer." 
            : "Specialized support and meaningful tools for honoring and remembering loved ones who have passed away from cancer."}
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-rose-50 to-purple-50 dark:from-rose-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-rose-200 dark:border-rose-800/30 mb-6">
        <p className="text-gray-700 dark:text-gray-300 italic text-center text-lg leading-relaxed">
          {isSpanish 
            ? "\"Cada persona que perdemos por el cáncer deja un legado de amor, fortaleza y recuerdos que vale la pena honrar y preservar para siempre.\""
            : "\"Every person we lose to cancer leaves behind a legacy of love, strength, and memories worth honoring and preserving forever.\""}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {remembranceResources.map(resource => (
          <div key={resource.id} className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border-2 border-rose-300/50 dark:border-rose-700/50 rounded-xl p-6 hover:shadow-xl hover:border-rose-400/60 dark:hover:border-rose-600/60 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-rose-100 to-purple-100 dark:from-rose-900/20 dark:to-purple-900/20 p-3 rounded-full">
                {resource.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-rose-600 dark:text-rose-400 mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                <div className="flex gap-3">
                  <Button 
                    variant="default"
                    size="sm" 
                    className="bg-rose-500 hover:bg-rose-600 text-white flex-1"
                    onClick={() => handleResourceClick(resource.path, resource.title)}
                  >
                    {isSpanish ? "Acceder" : "Access"}
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm" 
                    className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                    onClick={() => handleDownload(resource.downloadable, resource.fileName)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {isSpanish ? "Descargar" : "Download"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-rose-100 to-amber-100 dark:from-rose-900/30 dark:to-amber-900/30 rounded-xl p-8 border-2 border-rose-300 dark:border-rose-700/50 mt-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-3">
            {isSpanish ? "Honrar a Través de la Acción" : "Honoring Through Action"}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            {isSpanish 
              ? "Muchas personas encuentran consuelo y sanación al participar en acciones significativas para honrar a sus seres queridos y ayudar a otras familias que enfrentan el cáncer."
              : "Many people find comfort and healing in engaging in meaningful actions to honor their loved ones and help other families facing cancer."}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
            onClick={() => handleResourceClick("/memorial-fundraising", isSpanish ? "Recaudación de Fondos Conmemorativa" : "Memorial Fundraising")}
          >
            <Heart className="mr-2 h-5 w-5" />
            {isSpanish ? "Explorar Formas de Honrar su Memoria" : "Explore Ways to Honor Their Memory"}
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-8 py-3 text-lg"
            onClick={() => handleDownload(isSpanish ? "Guía de Acción Conmemorativa" : "Memorial Action Guide", "Memorial_Action_Guide.txt")}
          >
            <Download className="mr-2 h-5 w-5" />
            {isSpanish ? "Descargar Guía de Acción" : "Download Action Guide"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RemembranceTab;
