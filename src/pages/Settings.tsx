import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useTheme } from "@/components/ThemeProvider";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { theme, setTheme } = useTheme();
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure model preferences and clinical defaults.</p>
        </div>

        <Card className="p-6 shadow-card space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Appearance</Label>
              <p className="text-xs text-muted-foreground">Choose your preferred theme.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
                className="gap-2"
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
                className="gap-2"
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("system")}
                className="gap-2"
              >
                <Monitor className="h-4 w-4" />
                Auto
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Appearance</Label>
              <p className="text-xs text-muted-foreground">Choose your preferred theme.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
                className="gap-2"
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
                className="gap-2"
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("system")}
                className="gap-2"
              >
                <Monitor className="h-4 w-4" />
                Auto
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Default to Multimodal</Label>
              <p className="text-xs text-muted-foreground">Use both text and CT when available.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Show Confidence Bars</Label>
              <p className="text-xs text-muted-foreground">Display model confidence on findings.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Critical Alerts</Label>
              <p className="text-xs text-muted-foreground">Audible alert on CRITICAL risk results.</p>
            </div>
            <Switch />
          </div>
        </Card>

        <Card className="p-6 shadow-card space-y-4">
          <div>
            <Label className="font-semibold">Clinician Name</Label>
            <Input defaultValue="Dr. A. Kumar" className="mt-2" />
          </div>
          <div>
            <Label className="font-semibold">Department</Label>
            <Input defaultValue="Neurology · RVCE Hospital" className="mt-2" />
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;
