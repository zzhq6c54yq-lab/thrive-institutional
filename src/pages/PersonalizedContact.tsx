
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Users, 
  Star, 
  Calendar, 
  UserPlus, 
  Clock, 
  Heart, 
  Sparkles,
  PhoneCall,
  Mail,
  AtSign,
  UserRound,
  Medal,
  BadgeCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Contact {
  id: string;
  name: string;
  category: string;
  contactMethod: string;
  lastContacted: string;
  frequency: string;
  notes: string;
  favorite: boolean;
  relationship: string;
  avatar: string;
}

const PersonalizedContact = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("contacts");
  const [showAddContact, setShowAddContact] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [streakCount, setStreakCount] = useState(0);
  
  // Form state for new contact
  const [newContact, setNewContact] = useState({
    name: "",
    category: "friend",
    contactMethod: "phone",
    frequency: "weekly",
    notes: "",
    relationship: "friend"
  });

  // Initialize with sample data
  useEffect(() => {
    const sampleContacts = [
      {
        id: "1",
        name: "Sarah Johnson",
        category: "family",
        contactMethod: "phone",
        lastContacted: "2 days ago",
        frequency: "weekly",
        notes: "Birthday on May 15th",
        favorite: true,
        relationship: "sister",
        avatar: "SJ"
      },
      {
        id: "2",
        name: "Michael Chen",
        category: "friend",
        contactMethod: "text",
        lastContacted: "1 week ago",
        frequency: "biweekly",
        notes: "Loves to talk about photography",
        favorite: false,
        relationship: "college friend",
        avatar: "MC"
      },
      {
        id: "3",
        name: "Dr. Williams",
        category: "professional",
        contactMethod: "email",
        lastContacted: "1 month ago",
        frequency: "monthly",
        notes: "Follow up about wellness plan",
        favorite: false,
        relationship: "therapist",
        avatar: "DW"
      },
      {
        id: "4",
        name: "Alex Rodriguez",
        category: "friend",
        contactMethod: "phone",
        lastContacted: "3 days ago",
        frequency: "weekly",
        notes: "Check in about recovery progress",
        favorite: true,
        relationship: "sponsor",
        avatar: "AR"
      },
      {
        id: "5",
        name: "Emma Wilson",
        category: "support",
        contactMethod: "video",
        lastContacted: "5 days ago",
        frequency: "weekly",
        notes: "Support group leader",
        favorite: true,
        relationship: "mentor",
        avatar: "EW"
      }
    ];
    
    setContacts(sampleContacts);
    setFilteredContacts(sampleContacts);
    
    // Set streak count from local storage or initialize
    const savedStreak = localStorage.getItem('contactStreak') || '0';
    setStreakCount(parseInt(savedStreak));
  }, []);

  // Filter contacts based on search and category
  useEffect(() => {
    let filtered = contacts;
    
    if (searchQuery) {
      filtered = filtered.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.relationship.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(contact => contact.category === selectedCategory);
    }
    
    setFilteredContacts(filtered);
  }, [searchQuery, selectedCategory, contacts]);

  const handleAddContact = () => {
    if (!newContact.name) {
      toast({
        title: "Name required",
        description: "Please enter a name for your contact.",
        duration: 3000
      });
      return;
    }
    
    const newContactData = {
      id: Date.now().toString(),
      name: newContact.name,
      category: newContact.category,
      contactMethod: newContact.contactMethod,
      lastContacted: "Just now",
      frequency: newContact.frequency,
      notes: newContact.notes,
      favorite: false,
      relationship: newContact.relationship,
      avatar: newContact.name.split(" ").map(n => n[0]).join("").substring(0, 2)
    };
    
    setContacts(prevContacts => [...prevContacts, newContactData]);
    
    toast({
      title: "Contact added!",
      description: `${newContact.name} has been added to your contacts.`,
      duration: 3000
    });
    
    // Reset form and hide it
    setNewContact({
      name: "",
      category: "friend",
      contactMethod: "phone",
      frequency: "weekly",
      notes: "",
      relationship: "friend"
    });
    
    setShowAddContact(false);
  };

  const handleLogContact = (contactId: string) => {
    // Update the contact's last contacted time
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === contactId 
          ? { ...contact, lastContacted: "Just now" } 
          : contact
      )
    );
    
    // Update streak
    const newStreak = streakCount + 1;
    setStreakCount(newStreak);
    localStorage.setItem('contactStreak', newStreak.toString());
    
    toast({
      title: "Connection logged!",
      description: `Great job! You're on a ${newStreak} day connection streak.`,
      duration: 3000
    });
  };

  const toggleFavorite = (contactId: string) => {
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === contactId 
          ? { ...contact, favorite: !contact.favorite } 
          : contact
      )
    );
  };

  const deleteContact = (contactId: string) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
    toast({
      title: "Contact deleted",
      description: "The contact has been removed from your list.",
      duration: 3000
    });
  };

  const categoryFilters = [
    { id: "all", label: "All", icon: <Users className="h-4 w-4" /> },
    { id: "family", label: "Family", icon: <Heart className="h-4 w-4" /> },
    { id: "friend", label: "Friends", icon: <Star className="h-4 w-4" /> },
    { id: "support", label: "Support", icon: <BadgeCheck className="h-4 w-4" /> },
    { id: "professional", label: "Professional", icon: <Medal className="h-4 w-4" /> }
  ];

  const contactMethods = [
    { value: "phone", label: "Phone", icon: <PhoneCall className="h-4 w-4" /> },
    { value: "text", label: "Text", icon: <MessageCircle className="h-4 w-4" /> },
    { value: "email", label: "Email", icon: <Mail className="h-4 w-4" /> },
    { value: "video", label: "Video", icon: <UserPlus className="h-4 w-4" /> },
    { value: "inPerson", label: "In Person", icon: <UserRound className="h-4 w-4" /> }
  ];

  const frequencies = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "biweekly", label: "Bi-weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "asNeeded", label: "As Needed" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white py-8 px-4 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23F97316%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#F59E0B]">
                Personalized Contact
              </span>
            </h1>
            <p className="text-white/70">Stay connected with your support network</p>
          </div>
          <HomeButton />
        </div>
        
        {/* Stats Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-6 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#F97316]/20 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-[#F97316]" />
            </div>
            <div>
              <p className="text-sm text-white/60">Connection Streak</p>
              <p className="text-2xl font-bold text-white">{streakCount} days</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-[#F97316]/20 p-3 rounded-full">
              <Users className="h-6 w-6 text-[#F97316]" />
            </div>
            <div>
              <p className="text-sm text-white/60">Total Connections</p>
              <p className="text-2xl font-bold text-white">{contacts.length}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-[#F97316]/20 p-3 rounded-full">
              <Clock className="h-6 w-6 text-[#F97316]" />
            </div>
            <div>
              <p className="text-sm text-white/60">Next Connection</p>
              <p className="text-xl font-bold text-white">Today</p>
            </div>
          </div>
          
          <div>
            <Button 
              className="bg-[#F97316] hover:bg-[#F97316]/80 text-white" 
              onClick={() => setShowAddContact(prev => !prev)}
            >
              {showAddContact ? "Cancel" : "Add Contact"}
            </Button>
          </div>
        </div>
        
        {/* Add Contact Form */}
        {showAddContact && (
          <Card className="mb-8 bg-white/10 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Add New Contact</CardTitle>
              <CardDescription className="text-white/70">
                Add someone from your support network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter name"
                      className="bg-white/5 border-white/20 text-white"
                      value={newContact.name}
                      onChange={e => setNewContact({...newContact, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="relationship" className="text-white">Relationship</Label>
                    <Input 
                      id="relationship" 
                      placeholder="Sponsor, Friend, Family member, etc."
                      className="bg-white/5 border-white/20 text-white"
                      value={newContact.relationship}
                      onChange={e => setNewContact({...newContact, relationship: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category" className="text-white">Category</Label>
                    <select 
                      id="category"
                      className="w-full bg-white/5 border border-white/20 text-white rounded-md p-2"
                      value={newContact.category}
                      onChange={e => setNewContact({...newContact, category: e.target.value})}
                    >
                      <option value="friend">Friend</option>
                      <option value="family">Family</option>
                      <option value="support">Support</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contactMethod" className="text-white">Preferred Contact Method</Label>
                    <select 
                      id="contactMethod"
                      className="w-full bg-white/5 border border-white/20 text-white rounded-md p-2"
                      value={newContact.contactMethod}
                      onChange={e => setNewContact({...newContact, contactMethod: e.target.value})}
                    >
                      <option value="phone">Phone</option>
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="video">Video Call</option>
                      <option value="inPerson">In Person</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="frequency" className="text-white">Contact Frequency</Label>
                    <select 
                      id="frequency"
                      className="w-full bg-white/5 border border-white/20 text-white rounded-md p-2"
                      value={newContact.frequency}
                      onChange={e => setNewContact({...newContact, frequency: e.target.value})}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="asNeeded">As Needed</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="notes" className="text-white">Notes</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Add any notes about this contact"
                      className="bg-white/5 border-white/20 text-white"
                      value={newContact.notes}
                      onChange={e => setNewContact({...newContact, notes: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                className="bg-[#F97316] hover:bg-[#F97316]/80 text-white"
                onClick={handleAddContact}
              >
                Add Contact
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden border border-white/5">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#F97316]/20 to-transparent rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#9b87f5]/20 to-transparent rounded-full blur-3xl -z-10"></div>
          
          <Tabs defaultValue="contacts" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 gap-2 bg-black/30 mb-6 p-1 rounded-lg max-w-md mx-auto">
              <TabsTrigger value="contacts" className="data-[state=active]:bg-[#F97316]/90">
                <Users className="h-4 w-4 mr-2" />
                Contacts
              </TabsTrigger>
              <TabsTrigger value="favorites" className="data-[state=active]:bg-[#F97316]/90">
                <Star className="h-4 w-4 mr-2" />
                Favorites
              </TabsTrigger>
              <TabsTrigger value="timeline" className="data-[state=active]:bg-[#F97316]/90">
                <Calendar className="h-4 w-4 mr-2" />
                Timeline
              </TabsTrigger>
            </TabsList>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div className="w-full md:w-auto">
                <Input
                  placeholder="Search contacts..."
                  className="bg-white/5 border-white/20 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categoryFilters.map(category => (
                  <Button
                    key={category.id}
                    variant="outline"
                    size="sm"
                    className={`border-white/20 ${
                      (category.id === 'all' && !selectedCategory) || selectedCategory === category.id
                      ? 'bg-[#F97316]/20 text-[#F97316] border-[#F97316]/30'
                      : 'bg-white/5 text-white/70'
                    }`}
                    onClick={() => setSelectedCategory(category.id === 'all' ? null : category.id)}
                  >
                    {category.icon}
                    <span className="ml-1">{category.label}</span>
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Contacts Tab */}
            <TabsContent value="contacts" className="animate-fade-in">
              {filteredContacts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-white/70">No contacts found. Add some contacts to get started!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredContacts.map((contact) => (
                    <ContactCard
                      key={contact.id}
                      contact={contact}
                      onLogContact={handleLogContact}
                      onToggleFavorite={toggleFavorite}
                      onDelete={deleteContact}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            {/* Favorites Tab */}
            <TabsContent value="favorites" className="animate-fade-in">
              {filteredContacts.filter(c => c.favorite).length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-white/70">No favorite contacts yet. Mark contacts as favorites to see them here!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredContacts.filter(c => c.favorite).map((contact) => (
                    <ContactCard
                      key={contact.id}
                      contact={contact}
                      onLogContact={handleLogContact}
                      onToggleFavorite={toggleFavorite}
                      onDelete={deleteContact}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            {/* Timeline Tab */}
            <TabsContent value="timeline" className="animate-fade-in">
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <h3 className="text-lg font-medium text-white mb-2">Today</h3>
                  {filteredContacts.filter(c => c.lastContacted.includes("Just now") || c.lastContacted.includes("day ago")).length > 0 ? (
                    filteredContacts
                      .filter(c => c.lastContacted.includes("Just now") || c.lastContacted.includes("day ago"))
                      .map(contact => (
                        <TimelineItem key={contact.id} contact={contact} />
                      ))
                  ) : (
                    <p className="text-white/70">No recent connections today.</p>
                  )}
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <h3 className="text-lg font-medium text-white mb-2">This Week</h3>
                  {filteredContacts.filter(c => c.lastContacted.includes("week ago") || (!c.lastContacted.includes("day ago") && !c.lastContacted.includes("Just now") && !c.lastContacted.includes("month ago"))).length > 0 ? (
                    filteredContacts
                      .filter(c => c.lastContacted.includes("week ago") || (!c.lastContacted.includes("day ago") && !c.lastContacted.includes("Just now") && !c.lastContacted.includes("month ago")))
                      .map(contact => (
                        <TimelineItem key={contact.id} contact={contact} />
                      ))
                  ) : (
                    <p className="text-white/70">No connections this week.</p>
                  )}
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <h3 className="text-lg font-medium text-white mb-2">This Month</h3>
                  {filteredContacts.filter(c => c.lastContacted.includes("month ago")).length > 0 ? (
                    filteredContacts
                      .filter(c => c.lastContacted.includes("month ago"))
                      .map(contact => (
                        <TimelineItem key={contact.id} contact={contact} />
                      ))
                  ) : (
                    <p className="text-white/70">No connections this month.</p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Tips Section */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-[#F97316]" />
            Connection Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#F97316]/10 p-4 rounded-lg border border-[#F97316]/20">
              <h3 className="font-medium text-white mb-2">Quality Over Quantity</h3>
              <p className="text-sm text-white/70">
                Meaningful conversations are better than frequent shallow check-ins. Focus on being present.
              </p>
            </div>
            <div className="bg-[#F97316]/10 p-4 rounded-lg border border-[#F97316]/20">
              <h3 className="font-medium text-white mb-2">Ask Open Questions</h3>
              <p className="text-sm text-white/70">
                Use questions that can't be answered with yes or no to encourage deeper conversations.
              </p>
            </div>
            <div className="bg-[#F97316]/10 p-4 rounded-lg border border-[#F97316]/20">
              <h3 className="font-medium text-white mb-2">Active Listening</h3>
              <p className="text-sm text-white/70">
                Show you're engaged by summarizing what you hear and asking follow-up questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Card Component
interface ContactCardProps {
  contact: Contact;
  onLogContact: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

const ContactCard = ({ contact, onLogContact, onToggleFavorite, onDelete }: ContactCardProps) => {
  const [showOptions, setShowOptions] = useState(false);
  
  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'phone':
        return <PhoneCall className="h-4 w-4 text-green-400" />;
      case 'text':
        return <MessageCircle className="h-4 w-4 text-blue-400" />;
      case 'email':
        return <Mail className="h-4 w-4 text-purple-400" />;
      case 'video':
        return <UserPlus className="h-4 w-4 text-red-400" />;
      case 'inPerson':
        return <UserRound className="h-4 w-4 text-yellow-400" />;
      default:
        return <PhoneCall className="h-4 w-4 text-green-400" />;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'family':
        return 'bg-pink-500/20 text-pink-300';
      case 'friend':
        return 'bg-blue-500/20 text-blue-300';
      case 'support':
        return 'bg-green-500/20 text-green-300';
      case 'professional':
        return 'bg-purple-500/20 text-purple-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };
  
  return (
    <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-colors overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#F97316]/20 flex items-center justify-center mr-3 text-white font-medium">
              {contact.avatar}
            </div>
            <div>
              <CardTitle className="text-white">{contact.name}</CardTitle>
              <div className="flex items-center">
                <span className="text-sm text-white/70 mr-2">{contact.relationship}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(contact.category)}`}>
                  {contact.category}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:text-[#F97316]"
            onClick={() => onToggleFavorite(contact.id)}
          >
            <Star className={`h-5 w-5 ${contact.favorite ? 'fill-[#F97316] text-[#F97316]' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center text-white/70">
              <Clock className="h-4 w-4 mr-1" />
              Last contacted: {contact.lastContacted}
            </div>
            <div className="flex items-center text-white/70">
              <Calendar className="h-4 w-4 mr-1" />
              {contact.frequency}
            </div>
          </div>
          <div className="flex items-center text-white/70 text-sm">
            {getMethodIcon(contact.contactMethod)}
            <span className="ml-1">
              Preferred: {contact.contactMethod.charAt(0).toUpperCase() + contact.contactMethod.slice(1)}
            </span>
          </div>
          {contact.notes && (
            <p className="text-sm text-white/80 bg-white/5 p-2 rounded-md">{contact.notes}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between items-center">
          <Button 
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white"
            onClick={() => setShowOptions(!showOptions)}
          >
            {showOptions ? "Hide" : "Options"}
          </Button>
          <Button 
            className="bg-[#F97316]/80 hover:bg-[#F97316] text-white"
            size="sm"
            onClick={() => onLogContact(contact.id)}
          >
            Log Connection
          </Button>
        </div>
        
        {showOptions && (
          <div className="w-full mt-3 pt-3 border-t border-white/10 flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="border-white/20 text-white flex-1"
            >
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-red-500/30 text-red-400 hover:bg-red-900/20 flex-1"
              onClick={() => onDelete(contact.id)}
            >
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

// Timeline Item Component
interface TimelineItemProps {
  contact: Contact;
}

const TimelineItem = ({ contact }: TimelineItemProps) => {
  return (
    <div className="flex items-start py-2 border-b border-white/10 last:border-0">
      <div className="w-8 h-8 rounded-full bg-[#F97316]/20 flex items-center justify-center mr-3 text-white text-sm">
        {contact.avatar}
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="font-medium text-white">{contact.name}</span>
          <span className="text-sm text-white/60">{contact.lastContacted}</span>
        </div>
        <p className="text-sm text-white/70">
          {contact.contactMethod.charAt(0).toUpperCase() + contact.contactMethod.slice(1)} contact ({contact.relationship})
        </p>
      </div>
    </div>
  );
};

export default PersonalizedContact;

