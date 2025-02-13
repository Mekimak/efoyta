import React from "react";
import { Card, CardContent } from "../ui/card";
import { Building2, Heart, Eye, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  change,
  positive = true,
}: StatCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            {label}
          </p>
          <h3 className="text-2xl font-semibold mt-2 text-emerald-900 dark:text-emerald-50">
            {value}
          </h3>
          {change && (
            <p
              className={`text-sm mt-2 ${positive ? "text-green-600" : "text-red-600"}`}
            >
              {positive ? "↑" : "↓"} {change} from last month
            </p>
          )}
        </div>
        <div className="p-3 bg-emerald-100 dark:bg-emerald-800 rounded-full">
          <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const OverviewStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <StatCard
          icon={Building2}
          label="Listed Properties"
          value="12"
          change="2"
          positive={true}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <StatCard
          icon={Heart}
          label="Saved Properties"
          value="24"
          change="5"
          positive={true}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <StatCard
          icon={Eye}
          label="Property Views"
          value="2.4K"
          change="12%"
          positive={true}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <StatCard
          icon={DollarSign}
          label="Total Value"
          value="$8.2M"
          change="3%"
          positive={true}
        />
      </motion.div>
    </div>
  );
};

export default OverviewStats;
