import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import AppLayout from "@/components/AppLayout";

const Settings = () => {
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
