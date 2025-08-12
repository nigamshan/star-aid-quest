import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Brain, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  Zap,
  Eye,
  Search,
  Database,
  MessageSquare,
  Bot,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessingTask {
  id: string;
  type: "document" | "analysis" | "insight" | "validation";
  title: string;
  status: "processing" | "completed" | "pending";
  progress: number;
  duration: number;
  result?: string;
}

interface LiveInsight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  impact: "high" | "medium" | "low";
  timestamp: Date;
}

interface ChatQuery {
  id: string;
  query: string;
  response: string;
  processingTime: number;
  confidence: number;
  sources: string[];
  timestamp: Date;
  status: "processing" | "completed";
}

export const AutonomousProcessor = () => {
  const [tasks, setTasks] = useState<ProcessingTask[]>([
    {
      id: "1",
      type: "document",
      title: "Processing FAFSA Guidelines 2024.pdf",
      status: "processing",
      progress: 67,
      duration: 45
    },
    {
      id: "2", 
      type: "analysis",
      title: "Analyzing student eligibility patterns",
      status: "processing",
      progress: 89,
      duration: 23
    },
    {
      id: "3",
      type: "insight",
      title: "Generated policy compliance report",
      status: "completed",
      progress: 100,
      duration: 0,
      result: "Found 3 policy updates affecting 247 students"
    }
  ]);

  const [insights, setInsights] = useState<LiveInsight[]>([
    {
      id: "1",
      title: "High Priority Alert",
      description: "15 students require immediate verification for aid disbursement",
      confidence: 94,
      impact: "high",
      timestamp: new Date()
    },
    {
      id: "2", 
      title: "Policy Optimization",
      description: "New streamlined process could reduce application time by 40%",
      confidence: 87,
      impact: "medium",
      timestamp: new Date()
    }
  ]);

  const [metrics, setMetrics] = useState({
    documentsProcessed: 247,
    insightsGenerated: 23,
    automationRate: 92,
    accuracyScore: 98.7
  });

  const [chatQueries, setChatQueries] = useState<ChatQuery[]>([
    {
      id: "1",
      query: "What are the GPA requirements for federal aid eligibility?",
      response: "Students must maintain a minimum cumulative GPA of 2.0 for federal aid eligibility. SAP (Satisfactory Academic Progress) requires completion of at least 67% of attempted credit hours.",
      processingTime: 1.2,
      confidence: 96,
      sources: ["Financial Aid Policy Manual 2024.pdf", "SAP Guidelines.docx"],
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      status: "completed"
    },
    {
      id: "2", 
      query: "How long does FAFSA processing typically take?",
      response: "FAFSA applications are processed within 3-5 business days of submission. Complete applications with all required documentation are prioritized in our processing queue.",
      processingTime: 0.8,
      confidence: 94,
      sources: ["FAFSA Processing Procedures.xlsx", "Timeline Guidelines.pdf"],
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: "completed"
    },
    {
      id: "3",
      query: "What documents are required for verification?",
      response: "",
      processingTime: 0,
      confidence: 0,
      sources: [],
      timestamp: new Date(),
      status: "processing"
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prev => prev.map(task => {
        if (task.status === "processing") {
          const newProgress = Math.min(task.progress + Math.random() * 5, 100);
          const newDuration = Math.max(task.duration - 1, 0);
          
          return {
            ...task,
            progress: newProgress,
            duration: newDuration,
            status: newProgress >= 100 ? "completed" : "processing",
            result: newProgress >= 100 ? "Analysis completed successfully" : undefined
          };
        }
        return task;
      }));

      // Update chat queries
      setChatQueries(prev => prev.map(query => {
        if (query.status === "processing") {
          // Simulate processing completion
          return {
            ...query,
            response: "Required documents include: Tax transcripts, W-2 forms, bank statements, and verification worksheets. All documents must be submitted within 30 days of request.",
            processingTime: Math.random() * 2 + 0.5,
            confidence: Math.floor(Math.random() * 10 + 90),
            sources: ["Verification Requirements.pdf", "Document Checklist.docx"],
            status: "completed"
          };
        }
        return query;
      }));

      // Add new chat queries occasionally
      if (Math.random() > 0.92) {
        const sampleQueries = [
          "What is the maximum Pell Grant amount for this year?",
          "How do I appeal a financial aid decision?", 
          "What happens if I drop below full-time status?",
          "Can I get aid for summer courses?",
          "What are the requirements for work-study eligibility?"
        ];
        
        const newQuery: ChatQuery = {
          id: Date.now().toString(),
          query: sampleQueries[Math.floor(Math.random() * sampleQueries.length)],
          response: "",
          processingTime: 0,
          confidence: 0,
          sources: [],
          timestamp: new Date(),
          status: "processing"
        };
        
        setChatQueries(prev => [newQuery, ...prev.slice(0, 4)]);
      }

      // Occasionally add new insights
      if (Math.random() > 0.95) {
        const newInsight: LiveInsight = {
          id: Date.now().toString(),
          title: "Automated Discovery",
          description: "Identified potential process improvement in document workflow",
          confidence: Math.floor(Math.random() * 20 + 80),
          impact: Math.random() > 0.5 ? "medium" : "low",
          timestamp: new Date()
        };
        
        setInsights(prev => [newInsight, ...prev.slice(0, 4)]);
      }

      // Update metrics
      setMetrics(prev => ({
        documentsProcessed: prev.documentsProcessed + Math.floor(Math.random() * 3),
        insightsGenerated: prev.insightsGenerated + Math.floor(Math.random() * 2),
        automationRate: Math.min(prev.automationRate + Math.random() * 0.5, 100),
        accuracyScore: 98.7 + Math.random() * 0.6
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getTaskIcon = (type: ProcessingTask["type"]) => {
    switch (type) {
      case "document": return FileText;
      case "analysis": return Brain;
      case "insight": return Eye;
      case "validation": return CheckCircle;
      default: return Database;
    }
  };

  const getImpactColor = (impact: LiveInsight["impact"]) => {
    switch (impact) {
      case "high": return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium": return "bg-warning/10 text-warning border-warning/20";
      case "low": return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="h-full bg-gradient-subtle p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Autonomous Processing Engine
          </h1>
          <p className="text-muted-foreground">
            Real-time document analysis and intelligent insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-confidence-high rounded-full animate-pulse" />
          <span className="text-sm text-confidence-high font-medium">Live Processing</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 hover:shadow-card transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Documents</p>
              <p className="text-xl font-bold">{metrics.documentsProcessed.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-card transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-enterprise flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Insights</p>
              <p className="text-xl font-bold">{metrics.insightsGenerated}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-card transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Automation</p>
              <p className="text-xl font-bold">{metrics.automationRate.toFixed(1)}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-card transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-confidence-high flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="text-xl font-bold">{metrics.accuracyScore.toFixed(1)}%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Processing Tasks */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-enterprise" />
            <h2 className="text-lg font-semibold">Live Processing Queue</h2>
          </div>
          <div className="space-y-4">
            {tasks.map((task) => {
              const TaskIcon = getTaskIcon(task.type);
              return (
                <div key={task.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      task.status === "completed" 
                        ? "bg-confidence-high text-white" 
                        : "bg-gradient-primary text-white"
                    )}>
                      {task.status === "completed" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <TaskIcon className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{task.title}</p>
                      {task.status === "processing" && (
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {task.duration}s remaining
                          </span>
                        </div>
                      )}
                      {task.result && (
                        <p className="text-xs text-confidence-high mt-1">{task.result}</p>
                      )}
                    </div>
                    <Badge 
                      variant={task.status === "completed" ? "default" : "secondary"}
                      className={cn(
                        "text-xs",
                        task.status === "completed" && "bg-confidence-high text-white"
                      )}
                    >
                      {task.status}
                    </Badge>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Live Insights */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-enterprise" />
            <h2 className="text-lg font-semibold">Autonomous Insights</h2>
          </div>
          <div className="space-y-4">
            {insights.map((insight) => (
              <div 
                key={insight.id} 
                className={cn(
                  "border rounded-lg p-4 space-y-2 animate-fade-in",
                  getImpactColor(insight.impact)
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm">{insight.title}</h3>
                      {insight.impact === "high" && (
                        <AlertCircle className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                    <p className="text-xs mt-1 opacity-90">{insight.description}</p>
                  </div>
                  <Badge variant="outline" className="text-xs border-0 bg-background/50">
                    {insight.confidence}% confidence
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs opacity-70">
                  <span>{insight.timestamp.toLocaleTimeString()}</span>
                  <Badge 
                    variant="secondary" 
                    className={cn("text-xs", {
                      "bg-destructive/20 text-destructive": insight.impact === "high",
                      "bg-warning/20 text-warning": insight.impact === "medium",
                      "bg-muted/20 text-muted-foreground": insight.impact === "low"
                    })}
                  >
                    {insight.impact} impact
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Real-time Status */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-enterprise" />
          <h2 className="text-lg font-semibold">System Status</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">SharePoint Sync</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-confidence-high rounded-full animate-pulse" />
                <span className="text-xs text-confidence-high">Active</span>
              </div>
            </div>
            <Progress value={98} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">AI Processing</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-confidence-high rounded-full animate-pulse" />
                <span className="text-xs text-confidence-high">Optimal</span>
              </div>
            </div>
            <Progress value={94} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Data Pipeline</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-confidence-high rounded-full animate-pulse" />
                <span className="text-xs text-confidence-high">Running</span>
              </div>
            </div>
            <Progress value={100} className="h-2" />
          </div>
        </div>
        </Card>

        {/* Live Chat Stream */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-enterprise" />
            <h2 className="text-lg font-semibold">Live Query Stream</h2>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {chatQueries.map((query) => (
              <div key={query.id} className="space-y-3 animate-fade-in">
                {/* User Query */}
                <div className="flex gap-3 justify-end">
                  <div className="max-w-[80%]">
                    <Card className="p-3 bg-enterprise text-white">
                      <p className="text-sm">{query.query}</p>
                    </Card>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="max-w-[80%] space-y-2">
                    {query.status === "processing" ? (
                      <Card className="p-3 bg-card">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </Card>
                    ) : (
                      <>
                        <Card className="p-3 bg-card">
                          <p className="text-sm">{query.response}</p>
                        </Card>
                        <div className="flex flex-wrap gap-2 items-center">
                          <Badge variant="outline" className="text-xs bg-confidence-high/10 text-confidence-high border-0">
                            {query.confidence}% confidence
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {query.processingTime.toFixed(1)}s
                          </div>
                        </div>
                        {query.sources.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-muted-foreground">Sources:</p>
                            <div className="grid gap-1">
                              {query.sources.map((source, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs">
                                  <FileText className="w-3 h-3 text-enterprise" />
                                  <span className="text-muted-foreground">{source}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
    </div>
  );
};