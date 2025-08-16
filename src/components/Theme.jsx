
import { useDarkMode } from "../Hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button"; 

export default function Theme() {
  const [isDark, toggleTheme] = useDarkMode();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-gray-900 dark:text-white">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
        ) : (
          <Moon className="w-4 h-4 text-gray-900 dark:text-gray-100" />
        )}
      </Button>
    </div>
  );
}
