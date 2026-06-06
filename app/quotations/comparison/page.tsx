// app/quotations/comparison/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Compare as CompareIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Print as PrintIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Types
interface QuotationForComparison {
  id: string;
  vendorName: string;
  vendorId: string;
  date: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  deliveryTime: string;
  warranty: string;
  paymentTerms: string;
  score: number;
}

const QuotationsComparisonPage = () => {
  const [selectedQuotations, setSelectedQuotations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'amount' | 'score' | 'deliveryTime'>('amount');

  // Mock quotations data
  const quotations: QuotationForComparison[] = [
    {
      id: 'QTN001',
      vendorName: 'Tech Solutions Ltd',
      vendorId: 'VEN001',
      date: '2025-06-10',
      amount: 12500,
      status: 'pending',
      deliveryTime: '15 days',
      warranty: '24 months',
      paymentTerms: 'Net 30',
      score: 92
    },
    {
      id: 'QTN002',
      vendorName: 'Global Supplies Inc',
      vendorId: 'VEN002',
      date: '2025-06-11',
      amount: 11800,
      status: 'pending',
      deliveryTime: '10 days',
      warranty: '18 months',
      paymentTerms: 'Net 45',
      score: 88
    },
    {
      id: 'QTN003',
      vendorName: 'Quality Parts Co',
      vendorId: 'VEN003',
      date: '2025-06-09',
      amount: 13200,
      status: 'pending',
      deliveryTime: '20 days',
      warranty: '36 months',
      paymentTerms: 'Net 60',
      score: 95
    },
    {
      id: 'QTN004',
      vendorName: 'Prime Materials',
      vendorId: 'VEN004',
      date: '2025-06-12',
      amount: 10900,
      status: 'pending',
      deliveryTime: '12 days',
      warranty: '12 months',
      paymentTerms: 'Net 30',
      score: 85
    }
  ];

  // Chart data
  const chartData = quotations.map(q => ({
    name: q.vendorName.split(' ')[0],
    amount: q.amount,
    score: q.score
  }));

  const pieData = quotations.map(q => ({
    name: q.vendorName.split(' ')[0],
    value: q.amount
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'warning';
    }
  };

  const handleCompare = (id: string) => {
    if (selectedQuotations.includes(id)) {
      setSelectedQuotations(selectedQuotations.filter(q => q !== id));
    } else if (selectedQuotations.length < 3) {
      setSelectedQuotations([...selectedQuotations, id]);
    }
  };

  const getSortedQuotations = () => {
    return [...quotations].sort((a, b) => {
      if (sortBy === 'amount') return a.amount - b.amount;
      if (sortBy === 'score') return b.score - a.score;
      return a.deliveryTime.localeCompare(b.deliveryTime);
    });
  };

  const lowestPrice = Math.min(...quotations.map(q => q.amount));
  const highestScore = Math.max(...quotations.map(q => q.score));

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: '#fff' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            VendorsBridge
          </Typography>
          <Box>
            <Button startIcon={<PrintIcon />} sx={{ mr: 1 }}>
              Print
            </Button>
            <Button startIcon={<DownloadIcon />} variant="outlined">
              Export
            </Button>
          </Box>
        </Box>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
            {['Technical', 'Vendors', 'RQF', 'Quotations', 'Approvals', 'Purchase orders', 'Invoices', 'Reports', 'Activity'].map((item) => (
              <Button 
                key={item} 
                color="inherit" 
                sx={{ 
                  textTransform: 'none',
                  fontWeight: item === 'Quotations' ? 'bold' : 'normal',
                  borderBottom: item === 'Quotations' ? '2px solid #1976d2' : 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Box>
        
        <Typography variant="h5" gutterBottom>
          Quotation Comparison
        </Typography>
        <Typography variant="body2" color="text.secondary">
          RQF: after further procurement a2 - quotations received
        </Typography>
      </Paper>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Quotations
              </Typography>
              <Typography variant="h4">
                {quotations.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#e8f5e9' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Lowest Price
              </Typography>
              <Typography variant="h4" sx={{ color: '#2e7d32' }}>
                €{lowestPrice.toLocaleString()}
              </Typography>
              <TrendingDownIcon sx={{ color: '#2e7d32', fontSize: 20 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Highest Score
              </Typography>
              <Typography variant="h4" sx={{ color: '#1976d2' }}>
                {highestScore}/100
              </Typography>
              <TrendingUpIcon sx={{ color: '#1976d2', fontSize: 20 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Average Price
              </Typography>
              <Typography variant="h4">
                €{(quotations.reduce((sum, q) => sum + q.amount, 0) / quotations.length).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Price Comparison
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <RechartsTooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="amount" fill="#8884d8" name="Amount (€)" />
                <Bar yAxisId="right" dataKey="score" fill="#82ca9d" name="Score" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Price Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={entry => `${entry.name}: €${entry.value.toLocaleString()}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Quotations Table */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            Quotations Details
          </Typography>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Sort by</InputLabel>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} label="Sort by">
              <MenuItem value="amount">Amount (Low to High)</MenuItem>
              <MenuItem value="score">Score (High to Low)</MenuItem>
              <MenuItem value="deliveryTime">Delivery Time</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Amount (€)</strong></TableCell>
                <TableCell><strong>Delivery Time</strong></TableCell>
                <TableCell><strong>Warranty</strong></TableCell>
                <TableCell><strong>Payment Terms</strong></TableCell>
                <TableCell><strong>Score</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getSortedQuotations().map((quotation) => (
                <TableRow 
                  key={quotation.id}
                  sx={{ 
                    '&:hover': { bgcolor: '#fafafa' },
                    bgcolor: selectedQuotations.includes(quotation.id) ? '#e3f2fd' : 'inherit'
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {quotation.vendorName}
                    </Typography>
                  </TableCell>
                  <TableCell>{quotation.vendorId}</TableCell>
                  <TableCell>{quotation.date}</TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: quotation.amount === lowestPrice ? 'bold' : 'normal',
                        color: quotation.amount === lowestPrice ? '#2e7d32' : 'inherit'
                      }}
                    >
                      €{quotation.amount.toLocaleString()}
                      {quotation.amount === lowestPrice && ' 🏆'}
                    </Typography>
                  </TableCell>
                  <TableCell>{quotation.deliveryTime}</TableCell>
                  <TableCell>{quotation.warranty}</TableCell>
                  <TableCell>{quotation.paymentTerms}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={quotation.score} 
                        sx={{ width: 60, mr: 1, height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2">{quotation.score}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={quotation.status} 
                      color={getStatusColor(quotation.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Compare">
                      <IconButton 
                        size="small" 
                        onClick={() => handleCompare(quotation.id)}
                        color={selectedQuotations.includes(quotation.id) ? 'primary' : 'default'}
                      >
                        <CompareIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Details">
                      <IconButton size="small">
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {selectedQuotations.length > 0 && (
          <Box sx={{ mt: 3, p: 2, bgcolor: '#e3f2fd', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Compare Selected Quotations ({selectedQuotations.length} selected)
            </Typography>
            <Grid container spacing={2}>
              {quotations.filter(q => selectedQuotations.includes(q.id)).map(q => (
                <Grid item xs={12} md={4} key={q.id}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="body2" fontWeight="bold">{q.vendorName}</Typography>
                    <Typography variant="body2">Amount: €{q.amount.toLocaleString()}</Typography>
                    <Typography variant="body2">Score: {q.score}%</Typography>
                    <Typography variant="body2">Delivery: {q.deliveryTime}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" color="inherit">
            Reject All
          </Button>
          <Button variant="contained" color="success" startIcon={<CheckCircleIcon />}>
            Approve Selected
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default QuotationsComparisonPage;