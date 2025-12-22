import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Download, Copy, Check, ImageIcon } from "lucide-react";

const OGImageGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateOGImage = async () => {
    setIsGenerating(true);
    setGeneratedImage(null);
    setPublicUrl(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-og-image');

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedImage(data.base64Preview);
      setPublicUrl(data.imageUrl);

      toast({
        title: "OG Image Generated!",
        description: "Your social preview image has been created and uploaded.",
      });

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate OG image",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyUrl = async () => {
    if (publicUrl) {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      toast({
        title: "URL Copied",
        description: "The image URL has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'thrivemt-og-image.png';
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">OG Image Generator</h1>
          <p className="text-white/60">Generate custom social preview images for ThriveMT</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Generate Social Preview</CardTitle>
            <CardDescription>
              Creates a professional 1200x630 OG image with ThriveMT branding, 
              "Institutional Mental Health Infrastructure" headline, and 3-layer visual.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              onClick={generateOGImage} 
              disabled={isGenerating}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Image...
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-5 w-5" />
                  Generate OG Image
                </>
              )}
            </Button>

            {generatedImage && (
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden border border-border">
                  <img 
                    src={generatedImage} 
                    alt="Generated OG Image" 
                    className="w-full h-auto"
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={downloadImage}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button 
                    onClick={copyUrl}
                    variant="outline"
                    className="flex-1"
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy URL
                      </>
                    )}
                  </Button>
                </div>

                {publicUrl && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Public URL:</p>
                    <code className="text-xs text-foreground break-all">{publicUrl}</code>
                  </div>
                )}

                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-sm text-foreground font-medium mb-2">Update index.html:</p>
                  <code className="text-xs text-muted-foreground break-all">
                    {`<meta property="og:image" content="${publicUrl || '[URL will appear here]'}" />`}
                  </code>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Image Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Size:</strong> 1200 × 630 pixels (standard OG dimensions)</li>
              <li>• <strong>Background:</strong> Deep black with bronze radial gradient</li>
              <li>• <strong>Logo:</strong> ThriveMT with bronze "MT" accent</li>
              <li>• <strong>Headline:</strong> "Institutional Mental Health Infrastructure"</li>
              <li>• <strong>3-Layer Visual:</strong> AI → Coaching → Therapy connected nodes</li>
              <li>• <strong>Tagline:</strong> "Scalable. Compliant. Measurable."</li>
              <li>• <strong>Trust Badge:</strong> HIPAA compliant indicator</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OGImageGenerator;
