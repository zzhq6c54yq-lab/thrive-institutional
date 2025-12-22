
import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Users } from "lucide-react";

export interface Meeting {
  id: string;
  title: string;
  type: "class" | "aa" | "na";
  startTime: Date;
  duration: number;
  availableSpots: number;
  totalSpots: number;
  description: string;
}

interface ScheduleCardProps {
  meeting: Meeting;
  onJoin?: (meeting: Meeting) => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ meeting, onJoin }) => {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "class":
        return "Mental Health Class";
      case "aa":
        return "AA Meeting";
      case "na":
        return "NA Meeting";
      default:
        return "Meeting";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "class":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "aa":
        return "bg-green-100 text-green-800 border-green-300";
      case "na":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const handleJoin = () => {
    if (onJoin) {
      onJoin(meeting);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <div className="mb-2">
              <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getTypeColor(meeting.type)}`}>
                {getTypeLabel(meeting.type)}
              </span>
            </div>
            <h3 className="text-lg font-semibold">{meeting.title}</h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-gray-600 mb-4">{meeting.description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            {format(meeting.startTime, "PPP")}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            {format(meeting.startTime, "h:mm a")} ({meeting.duration} minutes)
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            {meeting.availableSpots} of {meeting.totalSpots} spots available
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="gold" 
          className="w-full"
          onClick={handleJoin}
        >
          Join Meeting
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScheduleCard;
