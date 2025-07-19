import creatorMetricsData from "@/services/mockData/creatorMetrics.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getCreatorMetrics = async () => {
  await delay(300);
  return { ...creatorMetricsData };
};

export const getCreatorEarnings = async (timeframe = "30d") => {
  await delay(400);
  
  // Generate mock earnings data based on timeframe
  const generateEarnings = (days) => {
    const earnings = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      earnings.push({
        date: date.toISOString().split("T")[0],
        amount: Math.random() * 100 + 20,
        clicks: Math.floor(Math.random() * 50) + 10,
        conversions: Math.floor(Math.random() * 5) + 1
      });
    }
    return earnings;
  };
  
  const timeframeDays = {
    "7d": 7,
    "30d": 30,
    "90d": 90,
    "1y": 365
  };
  
  return generateEarnings(timeframeDays[timeframe] || 30);
};

export const getCreatorVideos = async () => {
  await delay(300);
  // Return mock creator video data
  return [
    {
      Id: 1,
      title: "Fashion Haul 2024: Trending Styles You Need",
      views: "2.1M",
      earnings: 245.50,
      productsTagged: 8,
      conversionRate: 6.8
    },
    {
      Id: 2,
      title: "Latest Tech Review: Must-Have Gadgets",
      views: "1.8M",
      earnings: 189.25,
      productsTagged: 6,
      conversionRate: 5.4
    },
    {
      Id: 4,
      title: "Beauty Routine: Glowing Skin Secrets",
      views: "3.2M",
      earnings: 312.75,
      productsTagged: 12,
      conversionRate: 7.2
    }
  ];
};

export const updateCreatorProfile = async (profileData) => {
  await delay(500);
  // Simulate profile update
  return {
    success: true,
    message: "Profile updated successfully"
  };
};

export const getPayoutHistory = async () => {
  await delay(300);
  // Return mock payout history
  return [
    {
      Id: 1,
      date: "2024-01-15",
      amount: 1250.00,
      status: "completed",
      method: "bank_transfer"
    },
    {
      Id: 2,
      date: "2024-01-01",
      amount: 890.50,
      status: "completed",
      method: "paypal"
    },
    {
      Id: 3,
      date: "2023-12-15",
      amount: 1150.25,
      status: "completed",
      method: "bank_transfer"
    }
  ];
};