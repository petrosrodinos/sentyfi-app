import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BenefitsCard() {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-800">Telegram Benefits</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Free messaging and notifications</li>
          <li>• Interactive bot commands</li>
          <li>• Rich media support (charts, images)</li>
          <li>• Cross-platform availability</li>
          <li>• End-to-end encryption</li>
        </ul>
      </CardContent>
    </Card>
  );
}
