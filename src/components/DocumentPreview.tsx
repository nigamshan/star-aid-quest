import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Download, Eye, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  title: string;
  type: string;
  size: string;
  modified: string;
  author: string;
  relevance: number;
  tags: string[];
}

const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Financial Aid Policy Manual 2024.pdf",
    type: "PDF",
    size: "2.3 MB",
    modified: "2024-01-15",
    author: "Sarah Johnson",
    relevance: 95,
    tags: ["Policy", "Guidelines", "2024"]
  },
  {
    id: "2",
    title: "Student Eligibility Guidelines.docx",
    type: "DOCX", 
    size: "856 KB",
    modified: "2024-01-10",
    author: "Mike Chen",
    relevance: 87,
    tags: ["Eligibility", "Students", "Requirements"]
  },
  {
    id: "3",
    title: "FAFSA Processing Procedures.xlsx",
    type: "XLSX",
    size: "1.2 MB", 
    modified: "2024-01-05",
    author: "Emily Rodriguez",
    relevance: 78,
    tags: ["FAFSA", "Processing", "Procedures"]
  },
  {
    id: "4",
    title: "Appeal Process Documentation.pptx",
    type: "PPTX",
    size: "3.1 MB",
    modified: "2023-12-20",
    author: "David Kim",
    relevance: 72,
    tags: ["Appeals", "Process", "Documentation"]
  },
  {
    id: "5", 
    title: "Scholarship Distribution Calendar.ics",
    type: "ICS",
    size: "45 KB",
    modified: "2023-12-15",
    author: "Lisa Zhang",
    relevance: 65,
    tags: ["Scholarships", "Calendar", "Distribution"]
  }
];

export const DocumentPreview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const filteredDocuments = mockDocuments.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 80) return "bg-confidence-high/10 text-confidence-high border-confidence-high/20";
    if (relevance >= 60) return "bg-confidence-medium/10 text-confidence-medium border-confidence-medium/20";
    return "bg-confidence-low/10 text-confidence-low border-confidence-low/20";
  };

  const getFileIcon = (type: string) => {
    return <FileText className="w-5 h-5 text-enterprise" />;
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold">Document Repository</h2>
          <Badge variant="outline">{filteredDocuments.length} documents</Badge>
        </div>
        
        {/* Search */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search documents by title or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Document List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid gap-3">
          {filteredDocuments.map((doc) => (
            <Card 
              key={doc.id}
              className={cn(
                "p-4 cursor-pointer transition-all hover:shadow-md",
                selectedDocument?.id === doc.id && "ring-2 ring-enterprise"
              )}
              onClick={() => setSelectedDocument(doc)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {getFileIcon(doc.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-sm truncate">{doc.title}</h3>
                    <Badge 
                      className={cn("text-xs", getRelevanceColor(doc.relevance))}
                    >
                      {doc.relevance}%
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{doc.type}</span>
                    <span>{doc.size}</span>
                    <span>Modified {doc.modified}</span>
                    <span>by {doc.author}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {doc.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Document Preview */}
      {selectedDocument && (
        <div className="border-t bg-card p-4">
          <div className="flex items-center gap-3 mb-3">
            {getFileIcon(selectedDocument.type)}
            <div>
              <h3 className="font-medium">{selectedDocument.title}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedDocument.type} • {selectedDocument.size} • Modified {selectedDocument.modified}
              </p>
            </div>
          </div>
          
          <div className="bg-muted rounded-md p-4 mb-3">
            <p className="text-sm text-muted-foreground">
              Document preview would display here. In the full implementation, this would show
              the actual document content with OCR-extracted text and highlighted sections
              relevant to search queries.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button className="bg-gradient-primary hover:opacity-90">
              <Eye className="w-4 h-4 mr-2" />
              Open Document
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};