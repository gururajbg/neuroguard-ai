import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from "@/components/AppLayout";
import { mockHistory, riskColor } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { FilePlus2 } from "lucide-react";

const History = () => {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Patient History</h1>
            <p className="text-sm text-muted-foreground mt-1">Recent NeuroRisk assessments.</p>
          </div>
          <Button asChild>
            <Link to="/assessment"><FilePlus2 className="h-4 w-4 mr-2" /> New Assessment</Link>
          </Button>
        </div>

        <Card className="shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Mode Used</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Specialist Recommended</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHistory.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-mono">{row.id}</TableCell>
                  <TableCell className="font-mono text-sm">{row.date}</TableCell>
                  <TableCell>{row.mode}</TableCell>
                  <TableCell>
                    <span className={`font-semibold ${riskColor(row.risk)}`}>{row.risk}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{row.specialist}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AppLayout>
  );
};

export default History;
