
import React, { useState } from "react";
import { Video, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const GenerativeVideoCreator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Please enter a prompt",
        description: "Describe what you'd like to generate",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Replicate API key to generate videos",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    toast({
      title: "Starting video generation",
      description: "This may take a few minutes...",
    });

    try {
      const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          "Authorization": `Token ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version: "9c86f3989874b1b3d436ad251e5018526098a7826ed1d25c3e871262f57c4c8a",
          input: {
            prompt,
            num_frames: 14,
            fps: 7
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Video generation failed');
      }

      const prediction = await response.json();
      
      // Poll for completion
      const pollInterval = setInterval(async () => {
        const pollResponse = await fetch(
          `https://api.replicate.com/v1/predictions/${prediction.id}`,
          {
            headers: {
              "Authorization": `Token ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );
        
        const pollResult = await pollResponse.json();
        
        if (pollResult.status === "succeeded") {
          clearInterval(pollInterval);
          setGeneratedVideoUrl(pollResult.output);
          setIsGenerating(false);
          toast({
            title: "Video generated successfully",
            description: "Your video is ready to view",
          });
        } else if (pollResult.status === "failed") {
          clearInterval(pollInterval);
          setIsGenerating(false);
          toast({
            title: "Generation failed",
            description: pollResult.error || "An error occurred while generating the video",
            variant: "destructive",
          });
        }
      }, 1000);
    } catch (error) {
      setIsGenerating(false);
      toast({
        title: "Error",
        description: "Failed to generate video. Please check your API key and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Video className="h-5 w-5 text-indigo-400" />
          Generate AI Video
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">API Key</Label>
            <Input
              type="password"
              placeholder="Enter your Replicate API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-black/20 border-white/10 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Prompt</Label>
            <Input
              placeholder="Describe the video you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-black/20 border-white/10 text-white"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500"
          >
            {isGenerating ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Video className="mr-2 h-4 w-4" />
                Generate Video
              </>
            )}
          </Button>

          {generatedVideoUrl && (
            <div className="mt-4">
              <video
                src={generatedVideoUrl}
                controls
                className="w-full rounded-lg"
                autoPlay
                loop
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GenerativeVideoCreator;
