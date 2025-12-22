
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Share2, Download, Book, Check, Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

interface BookConverterProps {
  entries: {[key: string]: string[]};
  userName: string;
  allowSharing?: boolean;
}

const BookConverter: React.FC<BookConverterProps> = ({ 
  entries, 
  userName, 
  allowSharing = true 
}) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<'memoir' | 'journal' | 'legacy'>('memoir');
  const [bookTitle, setBookTitle] = useState(`${userName}'s Legacy Journal`);
  const [emailInput, setEmailInput] = useState('');
  const [isSharingEmail, setIsSharingEmail] = useState(false);

  const hasEntries = Object.values(entries).some(categoryEntries => categoryEntries.length > 0);

  const generatePDF = () => {
    setIsGenerating(true);
    
    // Short timeout to allow the loading state to show
    setTimeout(() => {
      try {
        const doc = new jsPDF();
        let yPosition = 20;
        
        // Add title page
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text(bookTitle, 105, 40, { align: 'center' });
        
        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        doc.text(`Created by ${userName}`, 105, 60, { align: 'center' });
        
        doc.setFontSize(12);
        doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 70, { align: 'center' });
        
        // Add decorative element
        doc.setDrawColor(212, 175, 55);
        doc.setLineWidth(1);
        doc.line(50, 80, 160, 80);
        
        // Add template-specific text
        doc.setFontSize(14);
        doc.setFont('helvetica', 'italic');
        
        let templateText = '';
        if (selectedTemplate === 'memoir') {
          templateText = 'A collection of life memories, wisdom, and personal reflections';
        } else if (selectedTemplate === 'journal') {
          templateText = 'Personal thoughts and reflections from the journey of life';
        } else {
          templateText = 'A legacy of wisdom to pass down to future generations';
        }
        
        doc.text(templateText, 105, 100, { align: 'center' });
        
        // Add new page for content
        doc.addPage();
        yPosition = 20;
        
        // Process each category of entries
        Object.entries(entries).forEach(([category, categoryEntries]) => {
          if (categoryEntries.length === 0) return;
          
          // Add category heading
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(16);
          
          // Check if we need a new page
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.text(category.charAt(0).toUpperCase() + category.slice(1), 20, yPosition);
          yPosition += 10;
          
          // Add entries
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(12);
          
          categoryEntries.forEach((entry) => {
            // Extract date from entry 
            const dateMatch = entry.match(/## (.*)/);
            const date = dateMatch ? dateMatch[1] : '';
            
            // Extract content (everything after the date)
            let content = entry.replace(/## .*\n\n/, '');
            
            // Add date as heading
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            
            // Check if we need a new page
            if (yPosition > 250) {
              doc.addPage();
              yPosition = 20;
            }
            
            doc.text(date, 20, yPosition);
            yPosition += 8;
            
            // Add content with word wrap
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            
            const contentLines = doc.splitTextToSize(content, 170);
            
            contentLines.forEach((line: string) => {
              // Check if we need a new page
              if (yPosition > 270) {
                doc.addPage();
                yPosition = 20;
              }
              
              doc.text(line, 20, yPosition);
              yPosition += 7;
            });
            
            // Add spacing between entries
            yPosition += 10;
          });
          
          // Add spacing between categories
          yPosition += 10;
        });

        // Save the PDF
        doc.save(`${bookTitle.replace(/\s+/g, '_')}.pdf`);
        
        toast({
          title: "PDF Generated Successfully",
          description: "Your journal has been converted to a book format",
        });
        
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Error generating PDF:", error);
        toast({
          title: "Error Generating PDF",
          description: "There was an issue converting your journal to PDF",
          variant: "destructive"
        });
      } finally {
        setIsGenerating(false);
      }
    }, 1000);
  };

  const shareByEmail = () => {
    if (!emailInput || !emailInput.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsSharingEmail(true);
    
    // Simulate sharing process
    setTimeout(() => {
      toast({
        title: "Journal Shared Successfully",
        description: `Your journal has been shared with ${emailInput}`,
      });
      setIsSharingEmail(false);
      setEmailInput('');
    }, 1500);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsDialogOpen(true)}
          disabled={!hasEntries}
          className="bg-blue-600/20 hover:bg-blue-600/30 border-blue-600/50 text-blue-200"
          title={hasEntries ? "Convert journal to book" : "Add entries first"}
        >
          <Book className="mr-1 h-4 w-4" /> 
          Convert to Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Convert Your Journal to a Book</DialogTitle>
          <DialogDescription>
            Transform your journal entries into a beautifully formatted book that you can download as a PDF or share with loved ones.
          </DialogDescription>
        </DialogHeader>
        
        {!hasEntries ? (
          <div className="p-6 text-center">
            <Book className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-gray-500">
              You need to add some journal entries first before creating a book.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Book Title
                </label>
                <Input
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  className="w-full"
                  placeholder="Enter a title for your book"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Book Template
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'memoir', label: 'Memoir' },
                    { id: 'journal', label: 'Journal' },
                    { id: 'legacy', label: 'Legacy' }
                  ].map((template) => (
                    <Button
                      key={template.id}
                      type="button"
                      variant="outline"
                      className={`justify-center text-center ${
                        selectedTemplate === template.id ? 
                        'border-blue-500 bg-blue-500/20 text-blue-200' : 
                        ''
                      }`}
                      onClick={() => setSelectedTemplate(template.id as 'memoir' | 'journal' | 'legacy')}
                    >
                      {selectedTemplate === template.id && <Check className="mr-1 h-4 w-4" />}
                      {template.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-3 pt-2">
                <Button
                  onClick={generatePDF}
                  disabled={isGenerating}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </>
                  )}
                </Button>
                
                {allowSharing && (
                  <div className="space-y-2 border-t pt-3">
                    <label className="block text-sm font-medium">
                      Share via Email
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="flex-1"
                        placeholder="recipient@example.com"
                      />
                      <Button
                        onClick={shareByEmail}
                        disabled={isSharingEmail}
                        variant="outline"
                      >
                        {isSharingEmail ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            variant="outline"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>
          
          {hasEntries && (
            <Button
              onClick={() => {
                toast({
                  title: "Book Settings Saved",
                  description: "Your book settings have been saved",
                });
                setIsDialogOpen(false);
              }}
              variant="ghost"
            >
              Save Settings
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookConverter;
