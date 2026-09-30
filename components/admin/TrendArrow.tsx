import { ArrowUp, ArrowDown } from "lucide-react"
import type { Trend } from "@/lib/admin/actions/metrics"

const TrendArrow = ({ trend }: { trend: Trend }) => {
  if (trend.direction === "flat") {
    return <span className="text-xs font-medium text-gray-400">No change</span>
  }

  const isUp = trend.direction === "up"

  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
        isUp ? "text-green-600" : "text-red-500"
      }`}
    >
      {isUp ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
      {trend.percent === null ? trend.diff : `${Math.abs(trend.percent)}%`}
    </span>
  )
}

export default TrendArrow