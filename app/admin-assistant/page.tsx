"use client";

import { useState } from "react";
import { 
  Bell, 
  Search, 
  Users, 
  FileText, 
  CheckCircle,
  Clock,
  MessageSquare,
  Filter,
  Download,
  ChevronRight,
  Eye,
  Edit,
  UserCheck,
  AlertCircle,
  HelpCircle,
  BarChart,
  Menu,
  X,
  Home,
  Settings,
  Shield,
  UserPlus,
  Mail,
  Calendar,
  ChevronDown,
  LogOut,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

// Helper function to get initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function AssistantAdminDashboard() {
  const [activeTab, setActiveTab] = useState("tasks");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Mock assistant data
  const assistant = {
    name: "Sarah Miller",
    email: "sarah.m@company.com",
    role: "Admin Assistant",
    avatarUrl: "",
    supervisor: "Alex Johnson",
    joinedDate: "March 2024"
  };

  const stats = [
    { label: "Assigned Tasks", value: "26", change: "+3", icon: FileText, color: "from-[#8B1E3F] to-[#A8324A]" },
    { label: "Completed", value: "18", change: "+5", icon: CheckCircle, color: "from-[#2c7a5a] to-[#3c9a6a]" },
    { label: "Pending", value: "8", icon: Clock, color: "from-[#8B1E3F] to-[#C44569]" },
    { label: "Tickets", value: "5", icon: MessageSquare, color: "from-[#5A1323] to-[#7A1C2F]" },
  ];

  const assignedTasks = [
    { id: 1, title: "Verify new user accounts", count: 12, priority: "high", status: "pending", due: "Today" },
    { id: 2, title: "Respond to support tickets", count: 8, priority: "medium", status: "in-progress", due: "Today" },
    { id: 3, title: "Update user profiles", count: 5, priority: "low", status: "completed", due: "Tomorrow" },
    { id: 4, title: "Generate daily report", count: 1, priority: "medium", status: "pending", due: "Today" },
  ];

  const userVerifications = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", status: "pending", submitted: "10 min ago" },
    { id: 2, name: "Maria Garcia", email: "maria@example.com", status: "pending", submitted: "25 min ago" },
    { id: 3, name: "Tom Wilson", email: "tom@example.com", status: "approved", submitted: "2 hours ago" },
  ];

  const supportTickets = [
    { id: 1, user: "John Doe", issue: "Password reset", priority: "high", status: "open", time: "10 min ago" },
    { id: 2, user: "Sarah Smith", issue: "Feature question", priority: "medium", status: "open", time: "25 min ago" },
    { id: 3, user: "Mike Johnson", issue: "Billing inquiry", priority: "low", status: "resolved", time: "2 hours ago" },
  ];

  const quickActions = [
    { title: "Verify Users", description: "Review new registrations", icon: UserCheck, color: "from-[#8B1E3F] to-[#A8324A]" },
    { title: "Support Tickets", description: "Respond to user queries", icon: MessageSquare, color: "from-[#5A1323] to-[#7A1C2F]" },
    { title: "Generate Report", description: "Create daily summary", icon: BarChart, color: "from-[#8B1E3F] to-[#C44569]" },
    { title: "Profile Updates", description: "Edit user information", icon: Edit, color: "from-[#7A1C2F] to-[#9D2C42]" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fefafa] to-[#f8f2f4]">
      
      {/* Top Navigation - Mobile First */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#f0e1e5]">
        <div className="px-3 py-3">
          <div className="flex items-center justify-between">
            
            {/* Left: Menu and Title */}
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] p-0">
                  <div className="h-full flex flex-col">
                    <div className="p-4 border-b bg-gradient-to-r from-[#5A1323] to-[#8B1E3F]">
                      <SheetTitle className="flex items-center gap-2 text-white">
                        <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white font-bold">A</span>
                        </div>
                        <span>Assistant Panel</span>
                      </SheetTitle>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                      <MobileSidebarContent assistant={assistant} />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-[#5A1323]">Assistant</h1>
                <p className="text-xs text-gray-500">Limited access panel</p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1">
              
              {/* Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                className="h-10 w-10"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-gradient-to-r from-[#C44569] to-[#8B1E3F] text-[10px] text-white flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[300px]">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[280px] overflow-y-auto">
                    <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        <p className="font-medium text-sm">New user verification</p>
                      </div>
                      <p className="text-xs text-gray-500">Alex Johnson needs approval</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        <p className="font-medium text-sm">New support ticket</p>
                      </div>
                      <p className="text-xs text-gray-500">John Doe needs assistance</p>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 gap-1.5 px-2">
                    <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                      <AvatarImage src={assistant.avatarUrl} alt={assistant.name} />
                      <AvatarFallback className="bg-gradient-to-br from-[#8B1E3F] to-[#C44569] text-white">
                        {getInitials(assistant.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[260px]">
                  <DropdownMenuLabel className="flex flex-col gap-1 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={assistant.avatarUrl} alt={assistant.name} />
                        <AvatarFallback className="bg-gradient-to-br from-[#8B1E3F] to-[#C44569] text-white">
                          {getInitials(assistant.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{assistant.name}</p>
                        <Badge className="mt-1 bg-gradient-to-r from-[#8B1E3F] to-[#C44569] text-white border-none text-xs">
                          {assistant.role}
                        </Badge>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserCheck className="mr-2 h-4 w-4" />
                    <span>My Tasks</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchVisible && (
            <div className="mt-3 px-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search tasks, users, or tickets..."
                  className="pl-10 pr-4 h-11 text-sm bg-gray-50 border-gray-200"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchVisible(false)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Welcome Section */}
      <div className="px-3 py-4">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#5A1323]">
                Welcome back, {assistant.name.split(' ')[0]}
              </h2>
              <p className="text-gray-600 text-sm">
                Here are your assigned tasks for today
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Supervisor</p>
              <p className="text-sm font-medium text-[#5A1323]">{assistant.supervisor}</p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {stats.map((stat, index) => (
              <Card key={index} className="border-[#f0e1e5] shadow-sm">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                      <stat.icon className="h-4 w-4 text-white" />
                    </div>
                    {stat.change && (
                      <Badge className={`text-[10px] h-5 px-1.5 ${
                        stat.label === "Pending" ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
                      }`}>
                        {stat.change}
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg font-bold text-[#5A1323] mb-0.5">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("tasks")}
              className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "tasks"
                  ? "border-[#8B1E3F] text-[#8B1E3F]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              My Tasks
            </button>
            <button
              onClick={() => setActiveTab("verifications")}
              className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "verifications"
                  ? "border-[#8B1E3F] text-[#8B1E3F]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Verifications
            </button>
            <button
              onClick={() => setActiveTab("tickets")}
              className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "tickets"
                  ? "border-[#8B1E3F] text-[#8B1E3F]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Support Tickets
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "tasks" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#5A1323]">Assigned Tasks</h3>
              <Button variant="ghost" size="sm" className="text-xs text-[#8B1E3F]">
                <Filter className="h-3 w-3 mr-1" />
                Filter
              </Button>
            </div>

            <div className="space-y-3">
              {assignedTasks.map((task) => (
                <Card key={task.id} className="border-[#f0e1e5] shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          task.priority === 'high' ? 'bg-red-100 text-red-600' :
                          task.priority === 'medium' ? 'bg-amber-100 text-amber-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{task.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-600">{task.count} items</span>
                            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded">
                              Due: {task.due}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`${
                        task.status === 'completed' ? 'bg-green-100 text-green-700' :
                        task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      } text-xs`}>
                        {task.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className={`text-xs ${
                          task.priority === 'high' ? 'text-red-600' :
                          task.priority === 'medium' ? 'text-amber-600' :
                          'text-blue-600'
                        }`}>
                          {task.priority} priority
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "verifications" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#5A1323]">User Verifications</h3>
              <Badge className="bg-gradient-to-r from-[#8B1E3F] to-[#C44569] text-white text-xs">
                2 Pending
              </Badge>
            </div>

            <div className="space-y-3">
              {userVerifications.map((user) => (
                <Card key={user.id} className="border-[#f0e1e5] shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-br from-[#8B1E3F] to-[#C44569] text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-gray-800">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <Badge className={`${
                        user.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                      } text-xs`}>
                        {user.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Submitted: {user.submitted}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" className="h-8 text-xs bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 text-xs border-red-200 text-red-600 hover:bg-red-50">
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "tickets" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#5A1323]">Support Tickets</h3>
              <Button variant="ghost" size="sm" className="text-xs text-[#8B1E3F]">
                <MessageSquare className="h-3 w-3 mr-1" />
                New Ticket
              </Button>
            </div>

            <div className="space-y-3">
              {supportTickets.map((ticket) => (
                <Card key={ticket.id} className="border-[#f0e1e5] shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${
                          ticket.priority === 'high' ? 'bg-red-500' :
                          ticket.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                        }`} />
                        <div>
                          <h4 className="font-medium text-gray-800">{ticket.user}</h4>
                          <p className="text-sm text-gray-600">{ticket.issue}</p>
                        </div>
                      </div>
                      <Badge className={`${
                        ticket.status === 'open' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      } text-xs`}>
                        {ticket.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {ticket.time}
                      </span>
                      <Button size="sm" variant="outline" className="h-8 text-xs">
                        Respond
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions - Mobile Optimized */}
        <div className="mt-8">
          <h3 className="font-semibold text-[#5A1323] mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Card 
                key={index}
                className="group relative overflow-hidden border-0 shadow-sm transition-all duration-300 hover:shadow-lg cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} transition-all duration-300 group-hover:brightness-90`} />
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
                
                <CardContent className="relative z-10 h-full min-h-[90px] p-3 flex flex-col items-center justify-center gap-2">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30">
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-white text-sm">{action.title}</p>
                    <p className="text-white/80 text-[10px] hidden sm:block">
                      {action.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6 border-[#f0e1e5] shadow-sm">
          <CardHeader className="px-4 py-3">
            <CardTitle className="text-[#5A1323] text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="px-4 py-2">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">Processed 8 user verifications</p>
                  <p className="text-xs text-gray-500">10 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">Responded to 5 support tickets</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-amber-500 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">2 pending tasks remaining</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Navigation for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
          <div className="flex items-center justify-around px-2 py-2">
            <button className="flex flex-col items-center gap-1 px-2">
              <Home className="h-5 w-5 text-[#8B1E3F]" />
              <span className="text-[10px] text-[#8B1E3F] font-medium">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 px-2">
              <FileText className="h-5 w-5 text-gray-400" />
              <span className="text-[10px] text-gray-500">Tasks</span>
            </button>
            <button className="flex flex-col items-center gap-1 px-2">
              <UserCheck className="h-5 w-5 text-gray-400" />
              <span className="text-[10px] text-gray-500">Verify</span>
            </button>
            <button className="flex flex-col items-center gap-1 px-2">
              <MessageSquare className="h-5 w-5 text-gray-400" />
              <span className="text-[10px] text-gray-500">Tickets</span>
            </button>
            <button className="flex flex-col items-center gap-1 px-2">
              <MoreVertical className="h-5 w-5 text-gray-400" />
              <span className="text-[10px] text-gray-500">More</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile Sidebar Content
function MobileSidebarContent({ assistant }: { assistant: any }) {
  return (
    <>
      {/* Assistant Info */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={assistant.avatarUrl} alt={assistant.name} />
            <AvatarFallback className="bg-gradient-to-br from-[#8B1E3F] to-[#C44569] text-white text-lg">
              {getInitials(assistant.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-[#5A1323]">{assistant.name}</p>
            <Badge className="mt-1 bg-gradient-to-r from-[#8B1E3F] to-[#C44569] text-white border-none">
              {assistant.role}
            </Badge>
            <p className="text-sm text-gray-500 mt-1">{assistant.email}</p>
          </div>
        </div>
        <Separator />
      </div>

      {/* Navigation */}
      <nav className="space-y-1 mb-6">
        <Button variant="ghost" className="w-full justify-start">
          <Home className="mr-3 h-4 w-4" />
          Dashboard
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <FileText className="mr-3 h-4 w-4" />
          My Tasks
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <UserCheck className="mr-3 h-4 w-4" />
          User Verifications
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <MessageSquare className="mr-3 h-4 w-4" />
          Support Tickets
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <BarChart className="mr-3 h-4 w-4" />
          Reports
        </Button>
      </nav>

      {/* Quick Stats */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3 text-[#5A1323]">Overview</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-[#8B1E3F] to-[#C44569] rounded-lg p-3 text-white">
            <p className="text-xs opacity-90">Tasks Today</p>
            <p className="font-bold text-lg">26</p>
          </div>
          <div className="bg-gradient-to-br from-[#5A1323] to-[#7A1C2F] rounded-lg p-3 text-white">
            <p className="text-xs opacity-90">Completion</p>
            <p className="font-bold text-lg">98%</p>
          </div>
        </div>
      </div>

      {/* Supervisor Info */}
      <Card className="border-[#f0e1e5]">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[#8B1E3F] to-[#C44569] rounded-lg">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Supervisor</p>
              <p className="font-medium text-[#5A1323]">Alex Johnson</p>
              <p className="text-xs text-gray-500">Senior Admin</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}