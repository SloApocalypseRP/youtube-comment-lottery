import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Key, Video } from "lucide-react";

interface YouTubeConfigProps {
  onApiKeyChange: (key: string) => void;
  onVideoIdChange: (id: string) => void;
}

export const YouTubeConfig = ({ onApiKeyChange, onVideoIdChange }: YouTubeConfigProps) => {
  const [apiKey, setApiKey] = useState("");
  const [videoId, setVideoId] = useState("");

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    onApiKeyChange(value);
  };

  const handleVideoIdChange = (value: string) => {
    setVideoId(value);
    onVideoIdChange(value);
  };

  return (
    <Card className="p-6 glow-border">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-secondary" />
            <Label htmlFor="api-key" className="text-lg font-semibold">
              YouTube API Key
            </Label>
          </div>
          <Input
            id="api-key"
            type="password"
            placeholder="Enter your YouTube Data API key..."
            value={apiKey}
            onChange={(e) => handleApiKeyChange(e.target.value)}
            className="border-secondary/50 focus:border-secondary bg-card/50"
          />
          <p className="text-xs text-muted-foreground">
            Get your API key from{" "}
            <a
              href="https://console.cloud.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Cloud Console
            </a>
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-accent" />
            <Label htmlFor="video-id" className="text-lg font-semibold">
              Video ID
            </Label>
          </div>
          <Input
            id="video-id"
            type="text"
            placeholder="Enter YouTube video ID..."
            value={videoId}
            onChange={(e) => handleVideoIdChange(e.target.value)}
            className="border-accent/50 focus:border-accent bg-card/50"
          />
          <p className="text-xs text-muted-foreground">
            Example: dQw4w9WgXcQ (from youtube.com/watch?v=dQw4w9WgXcQ)
          </p>
        </div>
      </div>
    </Card>
  );
};
