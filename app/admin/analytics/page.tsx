"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Eye, Users, MousePointer, Clock, Activity } from "lucide-react"
import { useInvoiceStore, useVisitorStore } from "@/lib/store"

// Mock analytics data
const realtimeData = {
  activeUsers: 47,
  pageViews: 1234,
  bounceRate: 32.5,
  avgSessionDuration: "3:45",
  topPages: [
    { page: "/", views: 456, title: "หน้าแรก" },
    { page: "/products", views: 234, title: "สินค้า" },
    { page: "/products/lb-series", views: 189, title: "LB Series" },
  { page: "/order", views: 156, title: "ขอใบเสนอราคา" },
    { page: "/products/t-series", views: 98, title: "T Series" },
  ],
}

const trafficData = [
  { date: "01/01", users: 1200, sessions: 1450, pageviews: 3200, bounceRate: 35.2 },
  { date: "02/01", users: 1350, sessions: 1620, pageviews: 3600, bounceRate: 33.8 },
  { date: "03/01", users: 1180, sessions: 1380, pageviews: 2950, bounceRate: 38.1 },
  { date: "04/01", users: 1420, sessions: 1680, pageviews: 3800, bounceRate: 31.5 },
  { date: "05/01", users: 1580, sessions: 1890, pageviews: 4200, bounceRate: 29.3 },
  { date: "06/01", users: 1650, sessions: 1950, pageviews: 4350, bounceRate: 28.7 },
  { date: "07/01", users: 1720, sessions: 2100, pageviews: 4600, bounceRate: 27.2 },
]

const deviceData = [
  { name: "Desktop", value: 45.2, color: "#3B82F6" },
  { name: "Mobile", value: 38.7, color: "#10B981" },
  { name: "Tablet", value: 16.1, color: "#F59E0B" },
]

const sourceData = [
  { source: "Organic Search", users: 2340, percentage: 42.3 },
  { source: "Direct", users: 1890, percentage: 34.1 },
  { source: "Social Media", users: 680, percentage: 12.3 },
  { source: "Referral", users: 420, percentage: 7.6 },
  { source: "Email", users: 205, percentage: 3.7 },
]

const heatmapData = [
  { element: "Hero CTA Button", clicks: 1250, percentage: 23.4 },
  { element: "Product Cards", clicks: 980, percentage: 18.3 },
  { element: "Navigation Menu", clicks: 750, percentage: 14.0 },
  { element: "Footer Links", clicks: 420, percentage: 7.8 },
  { element: "Contact Button", clicks: 380, percentage: 7.1 },
]

const conversionFunnelData = [
  { step: "หน้าแรก", users: 5000, percentage: 100 },
  { step: "ดูสินค้า", users: 3500, percentage: 70 },
  { step: "ดูรายละเอียด", users: 2100, percentage: 42 },
  { step: "กรอกฟอร์ม", users: 850, percentage: 17 },
  { step: "ส่งคำขอ", users: 425, percentage: 8.5 },
]

const performanceData = [
  { metric: "Page Load Time", value: "2.3s", status: "good", benchmark: "< 3s" },
  { metric: "First Contentful Paint", value: "1.2s", status: "good", benchmark: "< 1.8s" },
  { metric: "Largest Contentful Paint", value: "2.8s", status: "good", benchmark: "< 2.5s" },
  { metric: "Cumulative Layout Shift", value: "0.05", status: "good", benchmark: "< 0.1" },
  { metric: "Time to Interactive", value: "3.1s", status: "needs-improvement", benchmark: "< 3.8s" },
]

export default function AdvancedAnalyticsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")
  const [isRealtime, setIsRealtime] = useState(true)
  const { invoices } = useInvoiceStore()
  const totalSales = invoices.reduce((s, i) => s + i.amount, 0)
  const { visitors, addVisitor, removeVisitor } = useVisitorStore()
  const [events, setEvents] = useState<any[]>([])
  const pageViews = events.filter((e) => e.event === "pageview").length

  // Simulate real-time updates
  useEffect(() => {
    if (isRealtime) {
      const interval = setInterval(() => {
        // Update real-time data here
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isRealtime])

  // Fetch event log
  useEffect(() => {
    fetch("/api/analytics/log")
      .then((res) => res.json())
      .then(setEvents)
      .catch(() => {})
  }, [])

  // Mock realtime visitors
  useEffect(() => {
    const pages = ["/", "/products", "/order"]
    const interval = setInterval(() => {
      const id = Date.now().toString()
      addVisitor({ id, page: pages[Math.floor(Math.random() * pages.length)], enteredAt: new Date().toISOString() })
      setTimeout(() => removeVisitor(id), 10000)
    }, 3000)
    return () => clearInterval(interval)
  }, [addVisitor, removeVisitor])

  const getPerformanceStatus = (status: string) => {
    switch (status) {
      case "good":
        return <Badge className="bg-green-100 text-green-800">ดี</Badge>
      case "needs-improvement":
        return <Badge className="bg-yellow-100 text-yellow-800">ต้องปรับปรุง</Badge>
      case "poor":
        return <Badge className="bg-red-100 text-red-800">แย่</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-600 mt-2">วิเคราะห์พฤติกรรมผู้ใช้และประสิทธิภาพเว็บไซต์ขั้นสูง</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">วันนี้</SelectItem>
              <SelectItem value="7d">7 วันที่แล้ว</SelectItem>
              <SelectItem value="30d">30 วันที่แล้ว</SelectItem>
              <SelectItem value="90d">90 วันที่แล้ว</SelectItem>
            </SelectContent>
          </Select>
          <Button variant={isRealtime ? "default" : "outline"} onClick={() => setIsRealtime(!isRealtime)}>
            <Activity className="w-4 h-4 mr-2" />
            Real-time
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>ยอดวิวทั้งหมด</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{pageViews.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ผู้ชมขณะนี้</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{visitors.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ยอดขาย (mock)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">฿{totalSales.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">ผู้ใช้ออนไลน์</p>
                <p className="text-2xl font-bold text-gray-900">{realtimeData.activeUsers}</p>
                {isRealtime && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mt-1"></div>}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Page Views วันนี้</p>
                <p className="text-2xl font-bold text-gray-900">{realtimeData.pageViews.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <MousePointer className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
                <p className="text-2xl font-bold text-gray-900">{realtimeData.bounceRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">เวลาเฉลี่ย/Session</p>
                <p className="text-2xl font-bold text-gray-900">{realtimeData.avgSessionDuration}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traffic" className="space-y-6">
        <TabsList>
          <TabsTrigger value="traffic">Traffic Analysis</TabsTrigger>
          <TabsTrigger value="heatmap">Heat Maps</TabsTrigger>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="log">Event Log</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>ภาพรวมการเข้าชมเว็บไซต์</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    users: {
                      label: "Users",
                      color: "hsl(var(--chart-1))",
                    },
                    sessions: {
                      label: "Sessions",
                      color: "hsl(var(--chart-2))",
                    },
                    pageviews: {
                      label: "Page Views",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="pageviews"
                        stackId="1"
                        stroke="var(--color-pageviews)"
                        fill="var(--color-pageviews)"
                        fillOpacity={0.6}
                        name="Page Views"
                      />
                      <Area
                        type="monotone"
                        dataKey="sessions"
                        stackId="1"
                        stroke="var(--color-sessions)"
                        fill="var(--color-sessions)"
                        fillOpacity={0.6}
                        name="Sessions"
                      />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stackId="1"
                        stroke="var(--color-users)"
                        fill="var(--color-users)"
                        fillOpacity={0.6}
                        name="Users"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>การเข้าชมแยกตามอุปกรณ์</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    desktop: {
                      label: "Desktop",
                      color: "#3B82F6",
                    },
                    mobile: {
                      label: "Mobile",
                      color: "#10B981",
                    },
                    tablet: {
                      label: "Tablet",
                      color: "#F59E0B",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="mt-4 space-y-2">
                  {deviceData.map((device, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }}></div>
                        <span className="text-sm">{device.name}</span>
                      </div>
                      <span className="font-medium">{device.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>แหล่งที่มาของผู้เข้าชม</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>แหล่งที่มา</TableHead>
                      <TableHead>ผู้ใช้</TableHead>
                      <TableHead>เปอร์เซ็นต์</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sourceData.map((source, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{source.source}</TableCell>
                        <TableCell>{source.users.toLocaleString()}</TableCell>
                        <TableCell>{source.percentage}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>หน้าที่ได้รับความนิยมมากที่สุด</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {realtimeData.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{page.title}</p>
                        <p className="text-xs text-gray-500">{page.page}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">{page.views}</p>
                        <p className="text-xs text-gray-500">views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Click Heat Map</CardTitle>
                <CardDescription>พื้นที่ที่ผู้ใช้คลิกมากที่สุด</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {heatmapData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.element}</span>
                        <span className="text-sm text-gray-600">{item.clicks} clicks</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">{item.percentage}% of total clicks</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Session Recording</CardTitle>
                <CardDescription>บันทึกการใช้งานของผู้ใช้</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Session #12345</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Duration: 5:23</p>
                      <p>Pages: 7</p>
                      <p>Device: Desktop</p>
                      <p>Location: Bangkok, Thailand</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      <Eye className="w-4 h-4 mr-2" />
                      ดูการบันทึก
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Session #12344</span>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Duration: 3:45</p>
                      <p>Pages: 4</p>
                      <p>Device: Mobile</p>
                      <p>Location: Chiang Mai, Thailand</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      <Eye className="w-4 h-4 mr-2" />
                      ดูการบันทึก
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Session #12343</span>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Duration: 8:12</p>
                      <p>Pages: 12</p>
                      <p>Device: Desktop</p>
                      <p>Location: Phuket, Thailand</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      <Eye className="w-4 h-4 mr-2" />
                      ดูการบันทึก
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel Analysis</CardTitle>
              <CardDescription>วิเคราะห์การแปลงของผู้ใช้ในแต่ละขั้นตอน</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {conversionFunnelData.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium">{step.step}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{step.users.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{step.percentage}%</p>
                      </div>
                    </div>
                    <div className="ml-11">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${step.percentage}%` }}
                        ></div>
                      </div>
                      {index < conversionFunnelData.length - 1 && (
                        <div className="mt-2 text-sm text-red-600">
                          Drop-off:{" "}
                          {(
                            ((conversionFunnelData[index].users - conversionFunnelData[index + 1].users) /
                              conversionFunnelData[index].users) *
                            100
                          ).toFixed(1)}
                          %
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Performance Metrics</CardTitle>
              <CardDescription>ประสิทธิภาพและความเร็วของเว็บไซต์</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>ค่าปัจจุบัน</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead>เกณฑ์มาตรฐาน</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceData.map((metric, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{metric.metric}</TableCell>
                      <TableCell>{metric.value}</TableCell>
                      <TableCell>{getPerformanceStatus(metric.status)}</TableCell>
                      <TableCell className="text-gray-600">{metric.benchmark}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Core Web Vitals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Largest Contentful Paint</p>
                      <p className="text-sm text-gray-600">2.8s</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">ดี</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">First Input Delay</p>
                      <p className="text-sm text-gray-600">45ms</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">ดี</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Cumulative Layout Shift</p>
                      <p className="text-sm text-gray-600">0.05</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">ดี</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-green-500"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="85, 100"
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-green-600">85</span>
                    </div>
                  </div>
                  <p className="text-lg font-medium">Performance Score</p>
                  <p className="text-sm text-gray-600">ดีมาก - เว็บไซต์โหลดเร็ว</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="log" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Log</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>เวลา</TableHead>
                    <TableHead>อีเวนต์</TableHead>
                    <TableHead>รายละเอียด</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((ev, i) => (
                    <TableRow key={i}>
                      <TableCell>{new Date(ev.timestamp).toLocaleString('th-TH')}</TableCell>
                      <TableCell>{ev.event}</TableCell>
                      <TableCell>{ev.path || ev.emailId || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
