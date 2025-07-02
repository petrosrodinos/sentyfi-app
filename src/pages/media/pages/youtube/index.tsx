import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function Youtube() {
  return (
    <div className="max-w-2xl mx-auto">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Feature Coming Soon</AlertTitle>
        <AlertDescription>The news feature is currently under development. We're working hard to bring you real-time news analysis and insights for your financial tracking. Stay tuned for updates!</AlertDescription>
      </Alert>
    </div>
  );
}
