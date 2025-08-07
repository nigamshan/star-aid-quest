import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, FileText, BarChart3, Settings, Menu } from "lucide-react";
import { Dashboard } from "@/components/Dashboard";
import { ChatInterface } from "@/components/ChatInterface";
import { DocumentPreview } from "@/components/DocumentPreview";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "chat", label: "AI Assistant", icon: MessageSquare },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar */}
      <div className={cn(
        "bg-card border-r transition-all duration-300 flex flex-col",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-4 h-4" />
            </Button>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-sm">Financial Aid AI</h1>
                <p className="text-xs text-muted-foreground">SharePoint Assistant</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  !sidebarOpen && "justify-center",
                  activeTab === item.id && "bg-gradient-primary text-white"
                )}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="w-4 h-4" />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </Button>
            ))}
          </div>
        </nav>

        {/* Status */}
        {sidebarOpen && (
          <div className="p-4 border-t">
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-confidence-high rounded-full" />
                <span className="text-xs text-muted-foreground">System Online</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                SharePoint connected
              </p>
            </Card>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsContent value="dashboard" className="h-full m-0">
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="chat" className="h-full m-0">
            <ChatInterface />
          </TabsContent>
          
          <TabsContent value="documents" className="h-full m-0">
            <DocumentPreview />
          </TabsContent>
          
          <TabsContent value="settings" className="h-full m-0">
            <div className="h-full flex items-center justify-center bg-background">
              <Card className="p-8 text-center">
                <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Settings</h2>
                <p className="text-muted-foreground">
                  Configuration panel for SharePoint integration, AI models, and system preferences.
                </p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
