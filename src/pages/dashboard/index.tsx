import { Card } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Console Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to your Sentyfi console</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Analytics</h3>
            <p className="text-gray-600">View your application analytics and insights</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Settings</h3>
            <p className="text-gray-600">Manage your account and application settings</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Users</h3>
            <p className="text-gray-600">Manage user accounts and permissions</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
