
import React from "react";
import { Heart, MessageCircle, Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface FamilyVideoFeedProps {
  onWatchVideo: (videoId: string) => void;
}

const FamilyVideoFeed: React.FC<FamilyVideoFeedProps> = ({ onWatchVideo }) => {
  const familyVideos = [
    {
      id: "f1",
      userName: "Mom",
      userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80",
      title: "Birthday Wishes",
      date: "Yesterday",
      duration: "1:45",
      likes: 3,
      comments: 1,
      thumbnail: "https://images.unsplash.com/photo-1581579438747-104c53633e4d?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4"
    },
    {
      id: "f2",
      userName: "James (Friend)",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
      title: "Recovery Milestone",
      date: "2 days ago",
      duration: "3:20",
      likes: 5,
      comments: 2,
      thumbnail: "https://images.unsplash.com/photo-1473168854732-61df5330eef2?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-man-working-out-at-home-4013-large.mp4"
    },
    {
      id: "f3",
      userName: "Support Group",
      userAvatar: "",
      title: "Group Message",
      date: "3 days ago",
      duration: "4:15",
      likes: 8,
      comments: 4,
      thumbnail: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-partying-happily-4640-large.mp4"
    },
    {
      id: "f4",
      userName: "Therapist",
      userAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80",
      title: "Session Thoughts",
      date: "Last week",
      duration: "5:30",
      likes: 1,
      comments: 1,
      thumbnail: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-small-plant-seedling-17076-large.mp4"
    }
  ];

  return (
    <div>
      <div className="bg-[#2a2a3c]/50 backdrop-blur-sm rounded-xl p-5 mb-8">
        <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
          <Heart className="h-5 w-5 mr-2 text-pink-400" />
          Videos from Your Support Network
        </h3>
        <p className="text-gray-300 text-sm">
          View video messages sent to you by family members, friends, and your support network. 
          These videos are private and can only be viewed by you.
        </p>
      </div>
      
      <div className="space-y-6">
        {familyVideos.map((video) => (
          <div 
            key={video.id} 
            className="bg-[#2a2a3c]/70 rounded-xl overflow-hidden shadow-lg"
          >
            <div className="p-4 flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={video.userAvatar} alt={video.userName} />
                <AvatarFallback className="bg-indigo-700">
                  {video.userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium text-white">{video.userName}</h4>
                <div className="text-xs text-gray-400 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {video.date}
                </div>
              </div>
            </div>
            
            <div 
              className="cursor-pointer relative"
              onClick={() => onWatchVideo(video.id)}
            >
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-4">
                  <h3 className="text-white font-medium">{video.title}</h3>
                  <div className="text-xs text-gray-300 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {video.duration}
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            
            <div className="p-3 border-t border-gray-800 flex justify-between">
              <div className="flex space-x-4">
                <button className="text-pink-400 hover:text-pink-300 transition-colors flex items-center text-sm">
                  <Heart className="h-4 w-4 mr-1" />
                  {video.likes}
                </button>
                <button className="text-blue-400 hover:text-blue-300 transition-colors flex items-center text-sm">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {video.comments}
                </button>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/20"
                onClick={() => onWatchVideo(video.id)}
              >
                Watch
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyVideoFeed;
