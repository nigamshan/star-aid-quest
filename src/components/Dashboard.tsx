import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Users, 
  Database,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import financialAidOffice from "@/assets/financial-aid-office.jpg";

const statsData = [
  {
    title: "Documents Indexed",
    value: "2,847",
    change: "+12%",
    icon: FileText,
    trend: "up"
  },
  {
    title: "AI Queries Today",
    value: "156",
    change: "+24%", 
    icon: MessageSquare,
    trend: "up"
  },
  {
    title: "Avg Response Time",
    value: "1.2s",
    change: "-8%",
    icon: Clock,
    trend: "down"
  },
  {
    title: "Active Staff",
    value: "23",
    change: "+3",
    icon: Users,
    trend: "up"
  }
];

const recentActivity = [
  {
    id: "1",
    type: "query",
    user: "Sarah Johnson",
    content: "What are the GPA requirements for federal aid?",
    confidence: 94,
    timestamp: "2 minutes ago"
  },
  {
    id: "2", 
    type: "document",
    user: "System",
    content: "New document indexed: Scholarship Guidelines 2024.pdf",
    timestamp: "15 minutes ago"
  },
  {
    id: "3",
    type: "query", 
    user: "Mike Chen",
    content: "How do students appeal financial aid decisions?",
    confidence: 87,
    timestamp: "23 minutes ago"
  },
  {
    id: "4",
    type: "alert",
    user: "System",
    content: "SharePoint sync completed successfully",
    timestamp: "1 hour ago"
  }
];

export const Dashboard = () => {
  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Hero Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={financialAidOffice}
          alt="Financial Aid Office"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-enterprise/80 to-enterprise/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold mb-2">Financial Aid AI Assistant</h1>
            <p className="text-enterprise-light">
              Intelligent document search and query system powered by SharePoint integration
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, idx) => (
            <Card key={idx} className="p-4 shadow-card hover:shadow-enterprise transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className={`w-3 h-3 ${
                      stat.trend === 'up' ? 'text-confidence-high' : 'text-confidence-low'
                    }`} />
                    <span className={`text-xs ${
                      stat.trend === 'up' ? 'text-confidence-high' : 'text-confidence-low'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Status */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-enterprise" />
              <h2 className="text-lg font-semibold">System Status</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-confidence-high" />
                  <span className="text-sm">SharePoint Connection</span>
                </div>
                <Badge className="bg-confidence-high/10 text-confidence-high border-confidence-high/20">
                  Online
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-confidence-high" />
                  <span className="text-sm">Document Indexing</span>
                </div>
                <Badge className="bg-confidence-high/10 text-confidence-high border-confidence-high/20">
                  Active
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-confidence-high" />
                  <span className="text-sm">AI Model</span>
                </div>
                <Badge className="bg-confidence-high/10 text-confidence-high border-confidence-high/20">
                  Operational
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-confidence-medium" />
                  <span className="text-sm">OCR Processing</span>
                </div>
                <Badge className="bg-confidence-medium/10 text-confidence-medium border-confidence-medium/20">
                  Processing
                </Badge>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-enterprise" />
              <h2 className="text-lg font-semibold">Recent Activity</h2>
            </div>
            
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 rounded-full bg-enterprise mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{activity.user}</span>
                      {activity.confidence && (
                        <Badge variant="outline" className="text-xs">
                          {activity.confidence}% confidence
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 shadow-card">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button className="bg-gradient-primary hover:opacity-90 justify-start">
              <MessageSquare className="w-4 h-4 mr-2" />
              Start AI Chat
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Browse Documents
            </Button>
            <Button variant="outline" className="justify-start">
              <Database className="w-4 h-4 mr-2" />
              Sync SharePoint
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};