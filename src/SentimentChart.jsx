import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const SentimentChart = ({ data, type }) => {
  // Ensure data has the percentages
  const { positivePercentage, negativePercentage, neutralPercentage } = data;

  if (typeof positivePercentage === 'undefined' || typeof negativePercentage === 'undefined' || typeof neutralPercentage === 'undefined') {
    return <p className="text-center text-muted">Chart data is not available.</p>;
  }

  const chartData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        data: [positivePercentage, negativePercentage, neutralPercentage],
        backgroundColor: [
          'rgba(40, 167, 69, 0.8)', // Bootstrap success green
          'rgba(220, 53, 69, 0.8)',  // Bootstrap danger red
          'rgba(108, 117, 125, 0.8)' // Bootstrap secondary gray
        ],
        borderColor: [
          'rgba(40, 167, 69, 1)',
          'rgba(220, 53, 69, 1)',
          'rgba(108, 117, 125, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to fill its container
    plugins: {
      legend: {
        position: 'top',
        labels: {
            font: {
                size: 14 // Adjust font size for legend
            }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed + '%';
            }
            return label;
          }
        }
      }
    },
    animation: {
        duration: 1000, // Animation duration in milliseconds
        easing: 'easeOutQuart' // Easing function
    },
    // For bar charts, you might want specific scales:
    scales: type === 'bar' ? {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            beginAtZero: true,
            max: 100,
            ticks: {
                callback: function(value) {
                    return value + '%';
                }
            }
        }
    } : {}
  };

  return (
    <div style={{ height: '300px' }}> {/* Set a fixed height for the chart container */}
      {type === 'pie' ? (
        <Pie data={chartData} options={options} />
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default SentimentChart;