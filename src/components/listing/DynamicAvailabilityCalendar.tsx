import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  Calendar,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  Lightbulb,
  Check,
  X,
  Clock,
  Users
} from "lucide-react";
import { motion } from "framer-motion";

interface DynamicAvailabilityCalendarProps {
  onSave?: (data: any) => void;
}

const DynamicAvailabilityCalendar: React.FC<DynamicAvailabilityCalendarProps> = ({ onSave = () => {} }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [blockHolidays, setBlockHolidays] = useState(true);
  const [blockWeekends, setBlockWeekends] = useState(false);
  const [viewMode, setViewMode] = useState<"ethiopian" | "gregorian">("ethiopian");
  const [showExportOptions, setShowExportOptions] = useState(false);

  // Ethiopian holidays for the current year
  const ethiopianHolidays = [
    { name: "Enkutatash (Ethiopian New Year)", date: new Date(2023, 8, 11) },
    { name: "Meskel", date: new Date(2023, 8, 27) },
    { name: "Timket", date: new Date(2024, 0, 19) },
    { name: "Ethiopian Christmas (Genna)", date: new Date(2024, 0, 7) },
    { name: "Ethiopian Epiphany", date: new Date(2024, 0, 19) },
    { name: "Victory of Adwa", date: new Date(2024, 2, 2) },
    { name: "Ethiopian Good Friday", date: new Date(2024, 4, 3) },
    { name: "Ethiopian Easter", date: new Date(2024, 4, 5) },
    { name: "International Labor Day", date: new Date(2024, 4, 1) },
    { name: "Patriots' Victory Day", date: new Date(2024, 4, 5) },
    { name: "Downfall of the Derg", date: new Date(2024, 4, 28) },
    { name: "Eid al-Fitr", date: new Date(2024, 3, 10) },
    { name: "Eid al-Adha", date: new Date(2024, 5, 17) }
  ];

  // Generate days for the current month
  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i));
    }
    
    return days;
  };

  const days = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  // Convert Gregorian date to Ethiopian date (simplified for demo)
  const toEthiopianDate = (date: Date) => {
    // This is a simplified conversion - in a real app you'd use a proper library
    // Ethiopian calendar is roughly 7-8 years behind Gregorian
    const ethiopianYear = date.getFullYear() - 7;
    
    // Month names in Amharic
    const ethiopianMonths = [
      "Meskerem", "Tikimt", "Hidar", "Tahsas", "Tir", "Yekatit",
      "Megabit", "Miyazya", "Ginbot", "Sene", "Hamle", "Nehase", "Pagume"
    ];
    
    // Simplified conversion - not accurate but good enough for demo
    let ethiopianMonth = (date.getMonth() + 1) % 13;
    let ethiopianDay = date.getDate();
    
    return {
      year: ethiopianYear,
      month: ethiopianMonths[ethiopianMonth],
      day: ethiopianDay
    };
  };

  // Format date based on selected view mode
  const formatDate = (date: Date) => {
    if (viewMode === "ethiopian") {
      const ethiopianDate = toEthiopianDate(date);
      return `${ethiopianDate.day} ${ethiopianDate.month}, ${ethiopianDate.year}`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Check if a date is a holiday
  const isHoliday = (date: Date) => {
    return ethiopianHolidays.some(holiday => 
      holiday.date.getDate() === date.getDate() && 
      holiday.date.getMonth() === date.getMonth()
    );
  };

  // Get holiday name if applicable
  const getHolidayName = (date: Date) => {
    const holiday = ethiopianHolidays.find(h => 
      h.date.getDate() === date.getDate() && 
      h.date.getMonth() === date.getMonth()
    );
    return holiday ? holiday.name : null;
  };

  // Check if a date is a weekend
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  };

  // Check if a date is blocked
  const isBlocked = (date: Date) => {
    if (blockHolidays && isHoliday(date)) return true;
    if (blockWeekends && isWeekend(date)) return true;
    return selectedDates.some(selectedDate => 
      selectedDate.getDate() === date.getDate() && 
      selectedDate.getMonth() === date.getMonth() && 
      selectedDate.getFullYear() === date.getFullYear()
    );
  };

  // Toggle date selection
  const toggleDate = (date: Date) => {
    if (!date) return;
    
    const isSelected = selectedDates.some(selectedDate => 
      selectedDate.getDate() === date.getDate() && 
      selectedDate.getMonth() === date.getMonth() && 
      selectedDate.getFullYear() === date.getFullYear()
    );
    
    if (isSelected) {
      setSelectedDates(selectedDates.filter(selectedDate => 
        !(selectedDate.getDate() === date.getDate() && 
          selectedDate.getMonth() === date.getMonth() && 
          selectedDate.getFullYear() === date.getFullYear())
      ));
    } else {
      setSelectedDates([...selectedDates, new Date(date)]);
    }
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Export calendar to iCal format
  const exportToIcal = () => {
    // In a real app, this would generate an .ics file
    console.log("Exporting calendar to iCal format");
    setShowExportOptions(false);
  };

  // Export calendar to Google Calendar
  const exportToGoogle = () => {
    // In a real app, this would integrate with Google Calendar API
    console.log("Exporting calendar to Google Calendar");
    setShowExportOptions(false);
  };

  // Save calendar settings
  const saveCalendar = () => {
    onSave({
      blockedDates: selectedDates,
      blockHolidays,
      blockWeekends,
      viewMode
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white dark:bg-black/40 shadow-lg dark:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-emerald-600" />
            Dynamic Availability Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Calendar Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={prevMonth}
                  className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-lg font-medium text-emerald-900 dark:text-emerald-50 min-w-[180px] text-center">
                  {viewMode === "ethiopian" 
                    ? toEthiopianDate(currentMonth).month + ", " + toEthiopianDate(currentMonth).year
                    : currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })
                  }
                </h3>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={nextMonth}
                  className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Select value={viewMode} onValueChange={(value: "ethiopian" | "gregorian") => setViewMode(value)}>
                  <SelectTrigger className="w-[180px] border-emerald-200 dark:border-emerald-800">
                    <SelectValue placeholder="Calendar Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethiopian">Ethiopian Calendar</SelectItem>
                    <SelectItem value="gregorian">Gregorian Calendar</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="relative">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowExportOptions(!showExportOptions)}
                    className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  
                  {showExportOptions && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black/90 rounded-md shadow-lg z-10 border border-emerald-100 dark:border-emerald-800/50">
                      <div className="py-1">
                        <button 
                          onClick={exportToIcal} 
                          className="block w-full text-left px-4 py-2 text-sm text-emerald-800 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                        >
                          Export as iCal (.ics)
                        </button>
                        <button 
                          onClick={exportToGoogle} 
                          className="block w-full text-left px-4 py-2 text-sm text-emerald-800 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                        >
                          Add to Google Calendar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Calendar Grid */}
            <div className="border border-emerald-100 dark:border-emerald-800/50 rounded-lg overflow-hidden">
              {/* Day headers */}
              <div className="grid grid-cols-7 bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-100 dark:border-emerald-800/50">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <div 
                    key={day} 
                    className={`py-2 text-center text-sm font-medium ${index === 0 || index === 6 ? 'text-emerald-600 dark:text-emerald-400' : 'text-emerald-800 dark:text-emerald-200'}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar days */}
              <div className="grid grid-cols-7 bg-white dark:bg-black/40">
                {days.map((day, index) => (
                  <div 
                    key={index} 
                    className={`min-h-[80px] p-1 border-b border-r border-emerald-100 dark:border-emerald-800/50 ${!day ? 'bg-gray-50 dark:bg-gray-900/20' : ''}`}
                  >
                    {day && (
                      <div 
                        className={`h-full rounded-md p-1 transition-colors ${isBlocked(day) ? 'bg-red-50 dark:bg-red-900/10' : 'hover:bg-emerald-50 dark:hover:bg-emerald-900/10'} cursor-pointer`}
                        onClick={() => toggleDate(day)}
                      >
                        <div className="flex justify-between items-start">
                          <span 
                            className={`inline-block w-6 h-6 rounded-full text-center text-sm leading-6 ${isWeekend(day) ? 'text-emerald-600 dark:text-emerald-400' : 'text-emerald-800 dark:text-emerald-200'}`}
                          >
                            {day.getDate()}
                          </span>
                          
                          {isBlocked(day) && (
                            <span className="text-red-500 dark:text-red-400">
                              <X className="h-4 w-4" />
                            </span>
                          )}
                        </div>
                        
                        {isHoliday(day) && (
                          <Badge className="mt-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 text-xs">
                            {getHolidayName(day)?.split(' ')[0]}
                          </Badge>
                        )}
                        
                        {/* Example booking indicators */}
                        {day.getDate() % 5 === 0 && (
                          <div className="mt-1 flex items-center text-xs text-emerald-600 dark:text-emerald-400">
                            <Users className="h-3 w-3 mr-1" />
                            <span>Viewing</span>
                          </div>
                        )}
                        
                        {day.getDate() % 7 === 0 && (
                          <div className="mt-1 flex items-center text-xs text-blue-600 dark:text-blue-400">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Maintenance</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Calendar Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-emerald-800 dark:text-emerald-200">
                  Blocking Options
                </h3>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="block-holidays" 
                      checked={blockHolidays}
                      onCheckedChange={(checked) => setBlockHolidays(checked === true)}
                      className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                    <Label 
                      htmlFor="block-holidays" 
                      className="text-emerald-800 dark:text-emerald-200 cursor-pointer"
                    >
                      Block Ethiopian holidays automatically
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="block-weekends" 
                      checked={blockWeekends}
                      onCheckedChange={(checked) => setBlockWeekends(checked === true)}
                      className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                    <Label 
                      htmlFor="block-weekends" 
                      className="text-emerald-800 dark:text-emerald-200 cursor-pointer"
                    >
                      Block weekends (Saturday & Sunday)
                    </Label>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-2">
                    Click on dates to block or unblock them manually
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-red-50 dark:bg-red-900/10 rounded"></div>
                      <span className="text-xs text-emerald-700 dark:text-emerald-300">Blocked</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-white dark:bg-black/40 rounded"></div>
                      <span className="text-xs text-emerald-700 dark:text-emerald-300">Available</span>
                    </div>
