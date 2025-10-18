import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Lock } from "lucide-react";

interface SecretWordInputProps {
  onSecretWordChange: (word: string) => void;
}

export const SecretWordInput = ({ onSecretWordChange }: SecretWordInputProps) => {
  const [secretWord, setSecretWord] = useState("");

  const handleChange = (value: string) => {
    setSecretWord(value);
    onSecretWordChange(value);
  };

  return (
    <Card className="p-6 glow-border">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          <Label htmlFor="secret-word" className="text-lg font-semibold">
            Secret Word
          </Label>
        </div>
        <Input
          id="secret-word"
          type="text"
          placeholder="Enter the secret word..."
          value={secretWord}
          onChange={(e) => handleChange(e.target.value)}
          className="text-lg border-primary/50 focus:border-primary bg-card/50"
        />
        <p className="text-sm text-muted-foreground">
          This word will be matched against YouTube comments (case-insensitive)
        </p>
      </div>
    </Card>
  );
};
