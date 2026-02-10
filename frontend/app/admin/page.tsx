"use client";

import { useState } from "react";
import { 
  Bell, 
  Search, 
  Settings, 
  Users, 
  Shield, 
  BarChart3, 
  FileText, 
  Download,
  Activity,
  User,
  Mail,
  Calendar,
  CreditCard,
  ChevronDown,
  LogOut,
  HelpCircle,
  Moon,
  Sun,
  Menu,
  X,
  Home,
  Database,
  AlertCircle
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

export default function ModernAdminDashboard() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [notifications] = useState(3);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.j@company.com",
    role: "Admin",
    avatarUrl: "",
    lastLogin: "Today, 09:42 AM"
  };

  const stats = [
    { label: "Total Users", value: "2,847", change: "+12.5%", icon: Users },
    { label: "Active Now", value: "124", change: "+8", icon: Activity },
    { label: "Revenue", value: "$45.3K", change: "+18.2%", icon: CreditCard },
    { label: "Storage", value: "78%", change: "-2.1%", icon: Database },
  ];

  const quickActions = [
    { title: "Users", description: "Manage users", icon: Users, color: "from-[#8B1E3F] to-[#A8324A]" },
    { title: "Security", description: "Configure security", icon: Shield, color: "from-[#5A1323] to-[#7A1C2F]" },
    { title: "Analytics", description: "View reports", icon: BarChart3, color: "from-[#8B1E3F] to-[#C44569]" },
    { title: "Export", description: "Download data", icon: Download, color: "from-[#7A1C2F] to-[#9D2C42]" },
  ];

  const recentActivity = [
    { user: "Sarah Chen", action: "Updated permissions", time: "10 min", status: "success" },
    { user: "System", action: "Daily backup", time: "2 hrs", status: "info" },
    { user: "Mike Wilson", action: "New admin account", time: "4 hrs", status: "warning" },
    { user: "Alex", action: "Security update", time: "Yesterday", status: "success" },
  ];

  return (
    <div className={`min-h-screen transition-colors ${theme === "light" ? "bg-gray-50" : "bg-gray-900"}`}>
      
      {/* Top Navigation Bar - Mobile Optimized */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="px-3 py-2.5">
          <div className="flex items-center justify-between">
            
            {/* Left: Menu and Logo */}
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] p-0">
                  <div className="h-full flex flex-col">
                    <div className="p-4 border-b">
                      <SheetTitle className="flex items-center gap-2 text-lg">
                        <div className="h-8 w-8 bg-gradient-to-br from-[#8B1E3F] to-[#C44569] rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">A</span>
                        </div>
                        <span>Admin Panel</span>
                      </SheetTitle>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                      <MobileSidebarContent user={user} />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Logo - Always Visible */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gradient-to-br from-[#8B1E3F] to-[#C44569] rounded-lg md:hidden flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AP</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <div className="h-8 w-8 bg-gradient-to-br from-[#8B1E3F] to-[#C44569] rounded-lg" />
                  <span className="text-lg font-bold bg-gradient-to-r from-[#5A1323] to-[#8B1E3F] bg-clip-text text-transparent">
                    AdminPanel
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions - Mobile Optimized */}
            <div className="flex items-center gap-1">
              
              {/* Search Toggle Button for Mobile */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                className="h-10 w-10 md:hidden"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="h-10 w-10 hidden sm:inline-flex"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 relative">
                    <Bell className="h-5 w-5" />
                    {notifications > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-gradient-to-r from-[#C44569] to-[#8B1E3F] text-[10px] text-white flex items-center justify-center border border-white">
                        {notifications}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[300px] sm:w-[320px]">
                  <DropdownMenuLabel className="text-sm">Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[280px] overflow-y-auto">
                    <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                      <p className="font-medium text-sm">New user registered</p>
                      <p className="text-xs text-gray-500">Sarah Chen joined 10 minutes ago</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                      <p className="font-medium text-sm">System backup completed</p>
                      <p className="text-xs text-gray-500">Daily backup finished successfully</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                      <p className="font-medium text-sm">Security alert</p>
                      <p className="text-xs text-gray-500">Unusual login attempt detected</p>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Profile - Mobile Simplified */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 gap-1.5 px-2">
                    <Avatar className="h-7 w-7 border border-white shadow">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-[#8B1E3F] to-[#C44569] text-white text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-3.5 w-3.5 hidden sm:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[280px]">
                  <DropdownMenuLabel className="flex flex-col gap-1 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-[#8B1E3F] to-[#C44569] text-white">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-base">{user.name}</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        <Badge className="mt-1 bg-gradient-to-r from-[#8B1E3F] to-[#C44569] text-white border-none text-xs">
                          {user.role}
                        </Badge>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="py-3">
                    <User className="mr-3 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-3">
                    <Settings className="mr-3 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-3">
                    <Calendar className="mr-3 h-4 w-4" />
                    <span>Activity Log</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="py-3 text-red-600">
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Search Bar - Toggleable */}
          {isSearchVisible && (
            <div className="mt-3 px-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search users, actions, or settings..."
                  className="pl-10 pr-4 h-11 text-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
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

          {/* Desktop Search Bar */}
          <div className="hidden md:block mt-3">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search users, actions, or settings..."
                className="pl-10 pr-4 h-11 text-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-3 py-4 sm:px-4 sm:py-6 max-w-7xl mx-auto">
        
        {/* Welcome Header - Mobile Optimized */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1.5">
            Welcome back, <span className="bg-gradient-to-r from-[#8B1E3F] to-[#C44569] bg-clip-text text-transparent">{user.name.split(' ')[0]}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
            <span className="text-gray-600 dark:text-gray-400">
              Here's what's happening today.
            </span>
            <Badge className="text-xs bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              Last login: {user.lastLogin}
            </Badge>
          </div>
        </div>

        {/* Stats Grid - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-gray-200 dark:border-gray-800 shadow-sm">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className={`p-2 sm:p-2.5 rounded-lg ${stat.icon === Users ? 'bg-[#8B1E3F]/10' : 
                                  stat.icon === Activity ? 'bg-[#5A1323]/10' :
                                  stat.icon === CreditCard ? 'bg-[#8B1E3F]/10' :
                                  'bg-[#7A1C2F]/10'}`}>
                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#8B1E3F] dark:text-[#C44569]" />
                  </div>
                  <Badge className={`text-[10px] sm:text-xs h-5 px-1.5 sm:px-2 border ${
                    stat.change?.startsWith('+') ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-800/50' :
                    'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/50'
                  }`}>
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-1">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              Quick Actions
            </h2>
            <Button variant="ghost" size="sm" className="text-xs sm:text-sm text-[#8B1E3F]">
              View all
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className={`h-auto min-h-[100px] sm:min-h-[120px] p-3 sm:p-4 flex flex-col items-center justify-center gap-2 sm:gap-3 bg-gradient-to-br ${action.color} border-0 shadow-sm`}
              >
                <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                  <action.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-white text-sm sm:text-base">{action.title}</p>
                  <p className="text-white/80 text-[10px] sm:text-xs hidden sm:block">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Recent Activity Card - Mobile Optimized */}
            <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
              <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl">
                    Recent Activity
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm text-[#8B1E3F]">
                    View all
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-4 py-2 sm:px-6 sm:py-4">
                <div className="space-y-3 sm:space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.status === 'success' ? 'bg-green-100 dark:bg-green-900/20' :
                        activity.status === 'warning' ? 'bg-amber-100 dark:bg-amber-900/20' :
                        'bg-blue-100 dark:bg-blue-900/20'
                      }`}>
                        <span className={`text-xs sm:text-sm font-medium ${
                          activity.status === 'success' ? 'text-green-600 dark:text-green-400' :
                          activity.status === 'warning' ? 'text-amber-600 dark:text-amber-400' :
                          'text-blue-600 dark:text-blue-400'
                        }`}>
                          {activity.status === 'success' ? '✓' : activity.status === 'warning' ? '!' : 'i'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                          <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">
                            {activity.user}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm truncate">
                            {activity.action}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Status Card - Mobile Optimized */}
            <Card className="border-gray-200 dark:border-gray-800 shadow-sm lg:hidden">
              <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
                <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl">
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 py-2 sm:px-6 sm:py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">CPU Usage</span>
                      <span className="text-sm font-bold text-[#8B1E3F]">42%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#8B1E3F] to-[#C44569] rounded-full"
                        style={{ width: '42%' }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Memory</span>
                      <span className="text-sm font-bold text-[#8B1E3F]">78%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#8B1E3F] to-[#C44569] rounded-full"
                        style={{ width: '78%' }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Storage</span>
                      <span className="text-sm font-bold text-[#8B1E3F]">65%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#8B1E3F] to-[#C44569] rounded-full"
                        style={{ width: '65%' }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Sidebar Column - Hidden on Mobile, Shows User Profile */}
          <div className="hidden lg:block space-y-6">
            
            {/* User Profile Card */}
            <Card className="border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-[#5A1323] via-[#8B1E3F] to-[#C44569]" />
              <CardContent className="relative pt-12">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                  <Avatar className="h-20 w-20 border-4 border-white dark:border-gray-800 shadow-lg">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback className="text-xl bg-gradient-to-br from-[#8B1E3F] to-[#C44569] text-white">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="text-center mt-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {user.name}
                  </h3>
                  <Badge className="bg-gradient-to-r from-[#8B1E3F] to-[#C44569] text-white border-none text-xs">
                    {user.role}
                  </Badge>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 flex items-center justify-center gap-2 text-sm">
                    <Mail className="h-3.5 w-3.5" />
                    {user.email}
                  </p>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">24</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Tasks Today</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">98%</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Completion Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
              <CardHeader className="px-4 py-3">
                <CardTitle className="text-gray-900 dark:text-white text-lg">
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Settings className="mr-2 h-4 w-4" />
                  System Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Users className="mr-2 h-4 w-4" />
                  User Management
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Shield className="mr-2 h-4 w-4" />
                  Security Center
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Documentation
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Bottom Navigation for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 lg:hidden z-40">
          <div className="flex items-center justify-around px-2 py-2">
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 px-2">
              <Home className="h-5 w-5" />
              <span className="text-[10px]">Home</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 px-2">
              <Users className="h-5 w-5" />
              <span className="text-[10px]">Users</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 px-2">
              <BarChart3 className="h-5 w-5" />
              <span className="text-[10px]">Analytics</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 px-2">
              <Settings className="h-5 w-5" />
              <span className="text-[10px]">Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile Sidebar Content
function MobileSidebarContent({ user }: { user: any }) {
  return (
    <>
      {/* User Info in Sidebar */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-[#8B1E3F] to-[#C44569] text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>
        <Separator />
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1">
        <Button variant="ghost" className="w-full justify-start">
          <Home className="mr-3 h-4 w-4" />
          Dashboard
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Users className="mr-3 h-4 w-4" />
          User Management
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Shield className="mr-3 h-4 w-4" />
          Security
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <BarChart3 className="mr-3 h-4 w-4" />
          Analytics
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-3 h-4 w-4" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <FileText className="mr-3 h-4 w-4" />
          Documentation
        </Button>
      </nav>

      <Separator className="my-6" />

      {/* Quick Stats */}
      <div>
        <h3 className="text-sm font-medium mb-3">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
            <p className="text-xs text-gray-500">Online Users</p>
            <p className="font-bold text-lg">124</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
            <p className="text-xs text-gray-500">Tasks</p>
            <p className="font-bold text-lg">24</p>
          </div>
        </div>
      </div>
    </>
  );
}