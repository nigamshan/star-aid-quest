import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, FileText, Bot, User, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  confidence?: number;
  sources?: Array<{
    title: string;
    type: string;
    relevance: number;
  }>;
}

const mockSources = [
  { title: "Financial Aid Policy Manual 2024.pdf", type: "PDF", relevance: 95 },
  { title: "Student Eligibility Guidelines.docx", type: "DOCX", relevance: 87 },
  { title: "FAFSA Processing Procedures.xlsx", type: "XLSX", relevance: 78 }
];

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hello! I'm your Financial Aid AI Assistant. I can help you find information from our SharePoint repository. Ask me about policies, procedures, student eligibility, or any other financial aid topics.",
      timestamp: new Date(),
      confidence: 100
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "confidence-high";
    if (confidence >= 60) return "confidence-medium";
    return "confidence-low";
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 80) return "High Confidence";
    if (confidence >= 60) return "Medium Confidence";
    return "Low Confidence";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "Based on the documents in our SharePoint repository, I found relevant information about your query. According to the Financial Aid Policy Manual 2024, students must maintain a minimum 2.0 GPA to remain eligible for federal aid programs. The FAFSA processing procedures indicate that applications are reviewed within 3-5 business days of submission.",
        timestamp: new Date(),
        confidence: 89,
        sources: mockSources
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-subtle">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.type === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.type === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className={cn(
              "max-w-[80%] space-y-2",
              message.type === "user" ? "items-end" : "items-start"
            )}>
              <Card className={cn(
                "p-4 shadow-card",
                message.type === "user" 
                  ? "bg-enterprise text-white ml-auto" 
                  : "bg-card"
              )}>
                <p className="text-sm leading-relaxed">{message.content}</p>
              </Card>
              
              {message.type === "assistant" && (
                <div className="flex flex-wrap gap-2 items-center">
                  {message.confidence && (
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs border-0",
                        `bg-${getConfidenceColor(message.confidence)}/10 text-${getConfidenceColor(message.confidence)}`
                      )}
                    >
                      {getConfidenceLabel(message.confidence)} ({message.confidence}%)
                    </Badge>
                  )}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              )}
              
              {message.sources && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Sources:</p>
                  <div className="grid gap-2">
                    {message.sources.map((source, idx) => (
                      <Card key={idx} className="p-3 hover:shadow-md transition-all cursor-pointer">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-enterprise" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{source.title}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {source.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {source.relevance}% relevance
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {message.type === "user" && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <Card className="p-4 bg-card shadow-card">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-card p-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about financial aid policies, procedures, or eligibility..."
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-primary hover:opacity-90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};