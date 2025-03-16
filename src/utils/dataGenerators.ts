
// Generate random disease trend data
export const generateDiseaseTrendData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return months.map(month => ({
    month,
    earlyBlight: Math.floor(Math.random() * 70) + 20, // Random between 20-90
    lateBlight: Math.floor(Math.random() * 60) + 15,  // Random between 15-75
    powderyMildew: Math.floor(Math.random() * 50) + 10 // Random between 10-60
  }));
};

// Generate random crop distribution data
export const generateCropDistributionData = () => {
  const crops = ['Tomato', 'Potato', 'Wheat', 'Rice', 'Others'];
  let total = 100;
  const result = [];
  
  for (let i = 0; i < crops.length - 1; i++) {
    const value = i === crops.length - 2 ? total : Math.floor(Math.random() * (total - 5));
    result.push({ name: crops[i], value });
    total -= value;
  }
  
  result.push({ name: crops[crops.length - 1], value: total });
  return result;
};

// Generate random treatment effectiveness data
export const generateTreatmentEffectivenessData = () => {
  const treatments = [
    'Organic Fungicide', 
    'Chemical Fungicide', 
    'Crop Rotation', 
    'Resistant Varieties', 
    'Proper Spacing', 
    'Water Management'
  ];
  
  return treatments.map(treatment => ({
    treatment,
    effectiveness: Math.floor(Math.random() * 40) + 50 // Random between 50-90
  }));
};

// Generate random weather impact data
export const generateWeatherImpactData = () => {
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];
  
  return weeks.map(date => ({
    date,
    humidity: Math.floor(Math.random() * 40) + 40, // Random between 40-80
    temperature: Math.floor(Math.random() * 15) + 20, // Random between 20-35
    diseaseIndex: Math.floor(Math.random() * 60) + 20 // Random between 20-80
  }));
};

// Export data to CSV format
export const exportToCSV = (data: any[], filename: string) => {
  if (!data || !data.length) {
    console.error('No data to export');
    return;
  }
  
  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content with headers
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => headers.map(header => {
      // Handle special characters and wrap with quotes if needed
      const cell = row[header]?.toString() || '';
      return cell.includes(',') ? `"${cell}"` : cell;
    }).join(','))
  ].join('\n');
  
  // Create a blob and download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
