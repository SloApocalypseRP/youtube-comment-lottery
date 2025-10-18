import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface WinnerDisplayProps {
  winner: {
    username: string;
    word: string;
  } | null;
}

export const WinnerDisplay = ({ winner }: WinnerDisplayProps) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; color: string }>>([]);

  useEffect(() => {
    if (winner) {
      const colors = ["hsl(190, 100%, 50%)", "hsl(280, 80%, 60%)", "hsl(320, 100%, 60%)", "hsl(60, 100%, 50%)"];
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setConfetti(pieces);
    }
  }, [winner]);

  if (!winner) return null;

  return (
    <>
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${piece.left}%`,
              backgroundColor: piece.color,
              animation: `confetti-fall ${3 + Math.random() * 2}s linear ${piece.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Winner Card */}
      <Card className="p-8 glow-border animate-slide-up bg-card/95 backdrop-blur-sm">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Trophy className="w-24 h-24 text-primary animate-pulse-glow" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-5xl font-bold glow-text winner-glow">
              🎉 WINNER! 🎉
            </h2>
            <p className="text-2xl text-foreground/90">
              Congratulations to
            </p>
            <p className="text-4xl font-bold text-primary glow-text">
              {winner.username}
            </p>
            <p className="text-xl text-muted-foreground">
              They guessed the word{" "}
              <span className="text-secondary font-semibold">"{winner.word}"</span>{" "}
              correctly!
            </p>
          </div>

          <div className="pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Monitoring has been stopped automatically
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};
