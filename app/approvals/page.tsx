// app/approvals/page.tsx
'use client';

import React, { useState } from 'react';
import {
  CheckCircle,
  Circle,
  ChevronRight,
  FileText,
  Users,
  ShoppingCart,
  HelpCircle,
  CheckSquare,
  Package,
  Award,
  BarChart3,
  Clock,
  UserCheck,
  Calendar,
  Hash,
  AlertCircle,
} from 'lucide-react';

// Type definitions for the approval workflow data
interface WorkflowStep {
  id: string;
  title: string;
  fields: {
    id: string;
    label: string;
    value: string;
    icon?: React.ElementType;
  }[];
}

interface ApprovalData {
  requestId: string;
  requestDate: string;
  requestStatus: string;
  requestedBy: string[];
  reviewId: string;
  reviewDate: string;
  reviewStatus: string;
  reviewedBy: string[];
  approval1Id: string;
  approval1Date: string;
  approval1Status: string;
  approval1By: string[];
  approval2Id: string;
  approval2Date: string;
  approval2Status: string;
  approval2By: string[];
}

// Navigation items for the sidebar
const navItems = [
  { name: 'Background', icon: FileText, active: false },
  { name: 'Vendors', icon: Users, active: false },
  { name: "RFQ's", icon: ShoppingCart, active: false },
  { name: 'Questions', icon: HelpCircle, active: false },
  { name: 'Approvals', icon: CheckSquare, active: true },
  { name: 'Purchase orders', icon: Package, active: false },
  { name: 'Entrants', icon: Award, active: false },
  { name: 'Reports', icon: BarChart3, active: false },
  { name: 'Activity', icon: Clock, active: false },
];

// Mock data for the approval workflow
const mockApprovalData: ApprovalData = {
  requestId: '123456',
  requestDate: '2023-01-01',
  requestStatus: 'Approved',
  requestedBy: ['John Doe', 'Jane Doe'],
  reviewId: '987654',
  reviewDate: '2023-01-01',
  reviewStatus: 'Approved',
  reviewedBy: ['John Doe', 'Jane Doe'],
  approval1Id: '543210',
  approval1Date: '2023-01-01',
  approval1Status: 'Approved',
  approval1By: ['John Doe', 'Jane Doe'],
  approval2Id: '654321',
  approval2Date: '2023-01-01',
  approval2Status: 'Approved',
  approval2By: ['John Doe', 'Jane Doe'],
};

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'pending':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'rejected':
      return 'text-red-600 bg-red-50 border-red-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

// Helper function to get status icon
const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'pending':
      return <Clock className="w-5 h-5 text-yellow-500" />;
    case 'rejected':
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    default:
      return <Circle className="w-5 h-5 text-gray-400" />;
  }
};

// Individual workflow step component
const WorkflowStepCard = ({
  stepNumber,
  title,
  fields,
  isLast,
}: {
  stepNumber: number;
  title: string;
  fields: WorkflowStep['fields'];
  isLast: boolean;
}) => {
  return (
    <div className="relative">
      {/* Step container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Step header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold text-sm shadow-md">
            {stepNumber}
          </div>
          <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
        </div>

        {/* Step fields */}
        <div className="p-4 space-y-3">
          {fields.map((field) => (
            <div key={field.id} className="flex items-start gap-3 text-sm">
              {field.icon && (
                <field.icon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <span className="text-gray-500 font-medium">{field.label}:</span>{' '}
                {field.label.includes('Status') ? (
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm font-medium border ${getStatusColor(
                      field.value
                    )}`}
                  >
                    {getStatusIcon(field.value)}
                    {field.value}
                  </span>
                ) : field.label.includes('By') || field.label.includes('ed By') ? (
                  <div className="inline-flex flex-wrap gap-1">
                    {field.value.split(',').map((name, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs"
                      >
                        <UserCheck className="w-3 h-3" />
                        {name.trim()}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-800 font-medium">{field.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connector arrow */}
      {!isLast && (
        <div className="hidden md:flex absolute -right-6 top-1/2 transform -translate-y-1/2 z-10">
          <div className="bg-blue-100 rounded-full p-1 shadow-md">
            <ChevronRight className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      )}
    </div>
  );
};

// Main Approval Page Component
export default function ApprovalPage() {
  const [approvalData] = useState<ApprovalData>(mockApprovalData);

  // Prepare workflow steps data
  const workflowSteps: WorkflowStep[] = [
    {
      id: 'request',
      title: 'Request',
      fields: [
        {
          id: 'request-id',
          label: 'Request ID',
          value: approvalData.requestId,
          icon: Hash,
        },
        {
          id: 'request-date',
          label: 'Request Date',
          value: approvalData.requestDate,
          icon: Calendar,
        },
        {
          id: 'request-status',
          label: 'Request Status',
          value: approvalData.requestStatus,
          icon: AlertCircle,
        },
        {
          id: 'requested-by',
          label: 'Requested By',
          value: approvalData.requestedBy.join(', '),
          icon: Users,
        },
      ],
    },
    {
      id: 'review',
      title: 'Review',
      fields: [
        {
          id: 'review-id',
          label: 'Review ID',
          value: approvalData.reviewId,
          icon: Hash,
        },
        {
          id: 'review-date',
          label: 'Review Date',
          value: approvalData.reviewDate,
          icon: Calendar,
        },
        {
          id: 'review-status',
          label: 'Review Status',
          value: approvalData.reviewStatus,
          icon: AlertCircle,
        },
        {
          id: 'reviewed-by',
          label: 'Reviewed By',
          value: approvalData.reviewedBy.join(', '),
          icon: Users,
        },
      ],
    },
    {
      id: 'approval1',
      title: 'Approval',
      fields: [
        {
          id: 'approval1-id',
          label: 'Approval ID',
          value: approvalData.approval1Id,
          icon: Hash,
        },
        {
          id: 'approval1-date',
          label: 'Approval Date',
          value: approvalData.approval1Date,
          icon: Calendar,
        },
        {
          id: 'approval1-status',
          label: 'Approval Status',
          value: approvalData.approval1Status,
          icon: AlertCircle,
        },
        {
          id: 'approval1-by',
          label: 'Approved By',
          value: approvalData.approval1By.join(', '),
          icon: Users,
        },
      ],
    },
    {
      id: 'approval2',
      title: 'Approval',
      fields: [
        {
          id: 'approval2-id',
          label: 'Approval ID',
          value: approvalData.approval2Id,
          icon: Hash,
        },
        {
          id: 'approval2-date',
          label: 'Approval Date',
          value: approvalData.approval2Date,
          icon: Calendar,
        },
        {
          id: 'approval2-status',
          label: 'Approval Status',
          value: approvalData.approval2Status,
          icon: AlertCircle,
        },
        {
          id: 'approval2-by',
          label: 'Approved By',
          value: approvalData.approval2By.join(', '),
          icon: Users,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="font-semibold text-gray-800 text-lg">Vendor/Bridge</span>
            </div>
          </div>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  item.active
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Approval Workflow</h1>
                <p className="text-gray-500 mt-1 text-sm">
                  RFQ office functions Q2 - Vendor Info Supplies - 185400
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Active Workflow</span>
              </div>
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <WorkflowStepCard
                key={step.id}
                stepNumber={index + 1}
                title={step.title}
                fields={step.fields}
                isLast={index === workflowSteps.length - 1}
              />
            ))}
          </div>

          {/* Note Section */}
          <div className="mt-12 p-4 bg-blue-50/30 rounded-xl border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 text-sm">Note:</h4>
                <ul className="mt-1 text-gray-600 text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-blue-500" />
                    The approval workflow is not fully detailed in the image.
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-blue-500" />
                    The workflow is represented with numbered steps and arrows indicating the flow.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}