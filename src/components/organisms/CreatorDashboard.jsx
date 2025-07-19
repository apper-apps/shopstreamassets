import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { getCreatorMetrics, getCreatorEarnings } from "@/services/api/creatorService";

const CreatorDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeframe, setTimeframe] = useState("30d");

  useEffect(() => {
    loadDashboardData();
  }, [timeframe]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [metricsData, earningsData] = await Promise.all([
        getCreatorMetrics(),
        getCreatorEarnings(timeframe)
      ]);
      
      setMetrics(metricsData);
      setEarnings(earningsData);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadDashboardData} type="general" />;
  if (!metrics) return <Empty type="creator" onAction={loadDashboardData} />;

  const statCards = [
    {
      title: "Total Earnings",
      value: `$${metrics.totalEarnings.toLocaleString()}`,
      change: "+12.5%",
      icon: "DollarSign",
      color: "green"
    },
    {
      title: "Products Tagged",
      value: metrics.productsTagged.toLocaleString(),
      change: "+8.2%",
      icon: "Package",
      color: "blue"
    },
    {
      title: "Conversion Rate",
      value: `${(metrics.conversionRate * 100).toFixed(1)}%`,
      change: "+2.1%",
      icon: "TrendingUp",
      color: "purple"
    },
    {
      title: "Videos Analyzed",
      value: "127",
      change: "+15.3%",
      icon: "Video",
      color: "amber"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display mb-2">
            Creator Dashboard
          </h1>
          <p className="text-gray-600 font-body">
            Track your performance and earnings from ShopStream
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg font-body focus:ring-2 focus:ring-purple-primary focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <Button variant="primary">
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Tag Products
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 rounded-xl flex items-center justify-center`}>
                <ApperIcon name={stat.icon} size={24} className={`text-${stat.color}-600`} />
              </div>
              <Badge variant="success" size="sm">{stat.change}</Badge>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 font-display mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-600 font-body text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Earnings Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-display">
            Earnings Overview
          </h2>
          <div className="flex items-center space-x-2">
            <ApperIcon name="TrendingUp" size={20} className="text-green-500" />
            <span className="text-green-600 font-semibold font-body">+18.2% vs last month</span>
          </div>
        </div>
        
        {/* Simplified chart representation */}
        <div className="h-64 bg-gradient-to-t from-purple-50 to-transparent rounded-lg flex items-end justify-between p-4">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className="bg-gradient-to-t from-purple-primary to-purple-secondary rounded-t-lg"
              style={{
                height: `${Math.random() * 80 + 20}%`,
                width: "12%"
              }}
            />
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-display">
            Top Performing Products
          </h2>
          <Button variant="outline" size="sm">
            View All
            <ApperIcon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
        
        <div className="space-y-4">
          {metrics.topProducts.map((product, index) => (
            <motion.div
              key={product.Id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 font-display truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 font-body">{product.retailer}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-lg font-bold text-purple-primary font-display">
                    ${product.price}
                  </span>
                  <Badge variant="success" size="sm">
                    ${(product.price * 0.1).toFixed(2)} commission
                  </Badge>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-500 font-body">Clicks</p>
                <p className="text-xl font-bold text-gray-900 font-display">
                  {Math.floor(Math.random() * 500) + 100}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 font-display mb-6">
          Recent Activity
        </h2>
        
        <div className="space-y-4">
          {[
            {
              action: "Product tagged in video",
              video: "Latest Fashion Haul",
              product: "Designer Handbag",
              earnings: "+$12.50",
              time: "2 hours ago"
            },
            {
              action: "Commission earned",
              video: "Tech Review",
              product: "Wireless Headphones",
              earnings: "+$8.75",
              time: "4 hours ago"
            },
            {
              action: "Product tagged in video",
              video: "Home Decor Tips",
              product: "Ceramic Vase",
              earnings: "+$5.25",
              time: "6 hours ago"
            }
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                  <ApperIcon name="Package" size={16} className="text-purple-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 font-display">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 font-body">
                    {activity.video} • {activity.product}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-green-600 font-display">
                  {activity.earnings}
                </p>
                <p className="text-sm text-gray-500 font-body">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;