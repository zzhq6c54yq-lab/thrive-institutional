
import React, { useState } from "react";
import { Share2, X, Check, Copy, Mail, Users } from "lucide-react";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface FamilyShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId: string;
  videoTitle: string;
  videoUrl: string;
  thumbnailUrl: string;
}

const FamilyShareDialog: React.FC<FamilyShareDialogProps> = ({
  open,
  onOpenChange,
  videoId,
  videoTitle,
  videoUrl,
  thumbnailUrl
}) => {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [message, setMessage] = useState(`I wanted to share this video diary entry "${videoTitle}" with you.`);
  const [shareLink, setShareLink] = useState(`https://thrivemt.app/shared-video/${videoId}`);
  const { toast } = useToast();

  const familyContacts = [
    { id: "1", name: "Sarah (Sister)", email: "sarah@example.com" },
    { id: "2", name: "Mom", email: "mom@example.com" },
    { id: "3", name: "James (Friend)", email: "james@example.com" },
    { id: "4", name: "Therapist", email: "therapist@example.com" },
    { id: "5", name: "Support Group", email: "support@example.com" }
  ];

  const toggleContact = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Link Copied",
      description: "Share link has been copied to clipboard"
    });
  };

  const handleShare = () => {
    toast({
      title: "Video Shared",
      description: `Your video has been shared with ${selectedContacts.length} contacts`
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#2a2a3c] text-white border-gray-800 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <Share2 className="h-5 w-5 mr-2 text-indigo-400" />
            Share Video with Loved Ones
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Share your video diary entry with family members and your support network
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="col-span-1">
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={thumbnailUrl} 
                alt={videoTitle} 
                className="w-full aspect-video object-cover"
              />
            </div>
            <h3 className="mt-2 font-medium">{videoTitle}</h3>
          </div>
          
          <div className="col-span-1 flex flex-col justify-center">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="rounded-full bg-green-500/10 p-1 mr-2">
                  <Check className="h-4 w-4 text-green-500" />
                </span>
                <span className="text-gray-300 text-sm">Secure sharing</span>
              </div>
              
              <div className="flex items-center">
                <span className="rounded-full bg-green-500/10 p-1 mr-2">
                  <Check className="h-4 w-4 text-green-500" />
                </span>
                <span className="text-gray-300 text-sm">Password-protected</span>
              </div>
              
              <div className="flex items-center">
                <span className="rounded-full bg-green-500/10 p-1 mr-2">
                  <Check className="h-4 w-4 text-green-500" />
                </span>
                <span className="text-gray-300 text-sm">Expires after 30 days</span>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="contacts">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="contacts" className="data-[state=active]:bg-indigo-600">
              <Users className="h-4 w-4 mr-2" />
              Select Contacts
            </TabsTrigger>
            <TabsTrigger value="link" className="data-[state=active]:bg-indigo-600">
              <Copy className="h-4 w-4 mr-2" />
              Share Link
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="contacts" className="mt-4">
            <div className="space-y-4">
              <div className="max-h-60 overflow-y-auto space-y-2">
                {familyContacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50"
                  >
                    <Checkbox 
                      id={`contact-${contact.id}`}
                      checked={selectedContacts.includes(contact.id)}
                      onCheckedChange={() => toggleContact(contact.id)}
                    />
                    <Label 
                      htmlFor={`contact-${contact.id}`}
                      className="flex-1 cursor-pointer"
                    >
                      <div>{contact.name}</div>
                      <div className="text-gray-400 text-xs">{contact.email}</div>
                    </Label>
                  </div>
                ))}
              </div>
              
              <div>
                <Label htmlFor="message" className="text-sm text-gray-300">
                  Personal Message
                </Label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full mt-1 p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 resize-none"
                  rows={3}
                />
              </div>
              
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={selectedContacts.length === 0}
                onClick={handleShare}
              >
                <Mail className="h-4 w-4 mr-2" />
                Share with {selectedContacts.length} {selectedContacts.length === 1 ? 'Contact' : 'Contacts'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="link" className="mt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="share-link" className="text-sm text-gray-300">
                  Share Link
                </Label>
                <div className="flex mt-1">
                  <Input
                    id="share-link"
                    value={shareLink}
                    readOnly
                    className="flex-1 bg-gray-800 border-gray-700 text-gray-200"
                  />
                  <Button 
                    onClick={handleCopyLink}
                    className="ml-2 bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  This link is valid for 30 days and can be viewed by anyone with the link
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default FamilyShareDialog;
