
import React, { useState, useRef, useEffect } from "react";
import { Camera, Video, Mic, MicOff, X, Save, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface VideoRecorderProps {
  onSave: (videoBlob: Blob, title: string) => void;
  onCancel: () => void;
}

const VideoRecorder: React.FC<VideoRecorderProps> = ({ onSave, onCancel }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPreparing, setIsPreparing] = useState(true);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [title, setTitle] = useState("New Video Entry");
  const [countdown, setCountdown] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  
  const { toast } = useToast();

  useEffect(() => {
    startCamera();
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isRecording) {
      startRecording();
    }
  }, [countdown, isRecording]);

  const startCamera = async () => {
    try {
      const constraints = {
        audio: true,
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      streamRef.current = stream;
      setIsPreparing(false);
      
      toast({
        title: "Camera Ready",
        description: "You can start recording your video diary entry",
      });
    } catch (err) {
      console.error("Error accessing media devices:", err);
      toast({
        variant: "destructive",
        title: "Camera Access Error",
        description: "Unable to access your camera. Please check permissions."
      });
    }
  };

  const prepareRecording = () => {
    setIsRecording(true);
    setCountdown(3); // 3 second countdown
  };

  const startRecording = () => {
    if (!streamRef.current) return;
    
    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(streamRef.current);
    
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const videoURL = URL.createObjectURL(blob);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.src = videoURL;
        videoRef.current.controls = true;
      }
      setHasRecorded(true);
    };
    
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    
    toast({
      title: "Recording Started",
      description: "You are now recording your video diary entry"
    });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleMute = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const handleSave = () => {
    const blob = new Blob(chunksRef.current, { type: "video/webm" });
    onSave(blob, title);
  };

  const resetRecording = async () => {
    setHasRecorded(false);
    setIsRecording(false);
    
    // Stop any existing stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    // Restart camera
    await startCamera();
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center">
          <Video className="h-5 w-5 mr-2 text-indigo-400" />
          <h2 className="text-lg font-medium text-white">Record Video Diary</h2>
        </div>
        <button
          onClick={onCancel}
          className="rounded-full p-2 hover:bg-gray-800 transition-colors"
        >
          <X className="h-5 w-5 text-gray-400" />
        </button>
      </div>
      
      <div className="relative">
        <video 
          ref={videoRef} 
          autoPlay 
          muted={isMuted} 
          playsInline
          className="w-full aspect-video bg-black"
        />
        
        {isPreparing && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-center">
              <Camera className="h-10 w-10 mb-4 text-indigo-400 mx-auto animate-pulse" />
              <p className="text-white">Setting up camera...</p>
            </div>
          </div>
        )}
        
        {countdown > 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-6xl font-bold text-white animate-pulse">{countdown}</span>
          </div>
        )}
        
        <div className="absolute bottom-4 right-4 flex space-x-2">
          {!hasRecorded && !isRecording && (
            <button
              onClick={toggleMute}
              className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-full"
            >
              {isMuted ? (
                <MicOff className="h-5 w-5 text-red-400" />
              ) : (
                <Mic className="h-5 w-5 text-white" />
              )}
            </button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <Label htmlFor="video-title" className="text-white mb-1 block">
            Video Title
          </Label>
          <Input
            id="video-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your video"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        
        <Separator className="my-4 bg-gray-800" />
        
        <div className="flex justify-end space-x-4">
          {!hasRecorded && !isRecording && (
            <Button
              onClick={prepareRecording}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Video className="h-4 w-4 mr-2" />
              Start Recording
            </Button>
          )}
          
          {isRecording && (
            <Button 
              onClick={stopRecording}
              variant="destructive"
            >
              Stop Recording
            </Button>
          )}
          
          {hasRecorded && (
            <>
              <Button 
                variant="outline" 
                onClick={resetRecording}
                className="border-gray-700 text-gray-300"
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                Re-record
              </Button>
              
              <Button 
                onClick={handleSave}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Entry
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoRecorder;
