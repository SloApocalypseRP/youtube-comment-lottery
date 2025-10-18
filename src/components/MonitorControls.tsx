import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Square, Activity } from "lucide-react";

interface MonitorControlsProps {
  isMonitoring: boolean;
  onStart: () => void;
  onStop: () => void;
  disabled: boolean;
  status: string;
}

export const MonitorControls = ({
  isMonitoring,
  onStart,
  onStop,
  disabled,
  status,
}: MonitorControlsProps) => {
  return (
    <Card className="p-6 glow-border">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity
              className={`w-5 h-5 ${isMonitoring ? "text-primary animate-pulse-glow" : "text-muted-foreground"}`}
            />
            <span className="font-semibold">Monitor Status</span>
          </div>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              isMonitoring
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onStart}
            disabled={disabled || isMonitoring}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Monitoring
          </Button>
          <Button
            onClick={onStop}
            disabled={!isMonitoring}
            variant="destructive"
            size="lg"
            className="flex-1"
          >
            <Square className="w-4 h-4 mr-2" />
            Stop
          </Button>
        </div>
      </div>
    </Card>
  );
};
