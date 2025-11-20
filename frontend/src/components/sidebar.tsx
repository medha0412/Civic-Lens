"use client"
import { Filter } from "lucide-react"

interface SidebarProps {
  categories: string[]
  statuses: string[]
  dateRanges: string[]
  selectedCategory: string
  selectedStatus: string
  selectedDateRange: string
  onCategoryChange: (category: string) => void
  onStatusChange: (status: string) => void
  onDateRangeChange: (dateRange: string) => void
}

export default function Sidebar({
  categories,
  statuses,
  dateRanges,
  selectedCategory,
  selectedStatus,
  selectedDateRange,
  onCategoryChange,
  onStatusChange,
  onDateRangeChange,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-card border-r border-border overflow-y-auto mt-16">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-accent p-2 rounded-lg">
            <Filter className="w-5 h-5 text-accent-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Filters</h3>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 block">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground border border-border hover:border-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent font-medium"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="mb-8">
          <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 block">
            Status
          </label>
          <div className="space-y-2">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => onStatusChange(status)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors font-medium ${
                  selectedStatus === status
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary hover:bg-secondary/80 text-foreground"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 block">
            Date Range
          </label>
          <div className="space-y-2">
            {dateRanges.map((dateRange) => (
              <button
                key={dateRange}
                onClick={() => onDateRangeChange(dateRange)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors font-medium ${
                  selectedDateRange === dateRange
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary hover:bg-secondary/80 text-foreground"
                }`}
              >
                {dateRange}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
