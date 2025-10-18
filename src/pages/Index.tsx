import { useState, useEffect, useRef } from "react";
import { SecretWordInput } from "@/components/SecretWordInput";
import { YouTubeConfig } from "@/components/YouTubeConfig";
import { MonitorControls } from "@/components/MonitorControls";
import { WinnerDisplay } from "@/components/WinnerDisplay";
import { useToast } from "@/hooks/use-toast";
import { Youtube } from "lucide-react";

const Index = () => {
  const [secretWord, setSecretWord] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [videoId, setVideoId] = useState("");
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [winner, setWinner] = useState<{ username: string; word: string } | null>(null);
  const [status, setStatus] = useState("Idle");
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const checkedCommentsRef = useRef<Set<string>>(new Set());

  const checkComments = async () => {
    if (!apiKey || !videoId || !secretWord) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&maxResults=100&order=time`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();
      
      if (data.items) {
        for (const item of data.items) {
          const comment = item.snippet.topLevelComment.snippet;
          const commentId = item.id;
          const commentText = comment.textDisplay.toLowerCase().trim();
          const username = comment.authorDisplayName;

          // Skip if we've already checked this comment
          if (checkedCommentsRef.current.has(commentId)) continue;
          
          checkedCommentsRef.current.add(commentId);

          // Check for exact match (case-insensitive)
          if (commentText === secretWord.toLowerCase().trim()) {
            setWinner({ username, word: secretWord });
            setIsMonitoring(false);
            setStatus("Winner Found!");
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            toast({
              title: "🎉 Winner Found!",
              description: `${username} guessed the secret word!`,
            });
            return;
          }
        }
      }
    } catch (error) {
      console.error("Error checking comments:", error);
      toast({
        title: "Error",
        description: "Failed to check comments. Please verify your API key and video ID.",
        variant: "destructive",
      });
      handleStop();
    }
  };

  const handleStart = () => {
    if (!secretWord.trim()) {
      toast({
        title: "Missing Secret Word",
        description: "Please enter a secret word first.",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey.trim()) {
      toast({
        title: "Missing API Key",
        description: "Please enter your YouTube API key.",
        variant: "destructive",
      });
      return;
    }

    if (!videoId.trim()) {
      toast({
        title: "Missing Video ID",
        description: "Please enter a YouTube video ID.",
        variant: "destructive",
      });
      return;
    }

    setIsMonitoring(true);
    setStatus("Monitoring...");
    setWinner(null);
    checkedCommentsRef.current.clear();

    toast({
      title: "Monitoring Started",
      description: "Now checking for the secret word in comments...",
    });

    // Check immediately
    checkComments();

    // Then check every 10 seconds
    intervalRef.current = setInterval(checkComments, 10000);
  };

  const handleStop = () => {
    setIsMonitoring(false);
    setStatus("Stopped");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    toast({
      title: "Monitoring Stopped",
      description: "Comment monitoring has been stopped.",
    });
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const canStart = secretWord.trim() && apiKey.trim() && videoId.trim();

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Youtube className="w-16 h-16 text-primary glow-text" />
          </div>
          <h1 className="text-5xl font-bold glow-text">
            YouTube Comment Contest
          </h1>
          <p className="text-xl text-muted-foreground">
            Monitor YouTube comments and find the winner who guesses your secret word!
          </p>
        </div>

        {/* Winner Display */}
        {winner && <WinnerDisplay winner={winner} />}

        {/* Configuration Section */}
        {!winner && (
          <div className="space-y-6">
            <SecretWordInput onSecretWordChange={setSecretWord} />
            <YouTubeConfig
              onApiKeyChange={setApiKey}
              onVideoIdChange={setVideoId}
            />
            <MonitorControls
              isMonitoring={isMonitoring}
              onStart={handleStart}
              onStop={handleStop}
              disabled={!canStart}
              status={status}
            />
          </div>
        )}

        {/* Info Section */}
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>
            This app checks comments every 10 seconds for an exact match with your secret word.
          </p>
          <p>
            Make sure your YouTube API key has access to the YouTube Data API v3.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
