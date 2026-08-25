import React from 'react';
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowUpRight, 
  Package, 
  ChevronRight, 
  Activity,
  Layers,
  ArrowRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { DispatchRecord, DashboardSummary, NavigationTab } from '../types';
import { currentUser } from '../data/mockData';

interface DashboardViewProps {
  summary: DashboardSummary;
  recentDispatches: DispatchRecord[];
  onSelectDispatch: (dispatch: DispatchRecord) => void;
  onNavigate: (tab: NavigationTab) => void;
  onSelectClientFromDashboard: (clientName: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  summary,
  recentDispatches,
  onSelectDispatch,
  onNavigate,
  onSelectClientFromDashboard,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Delivered</span>;
      case 'In Transit':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">In Transit</span>;
      case 'Departed':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200">Departed</span>;
      case 'In Loading':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">In Loading</span>;
      case 'Delayed':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">Delayed</span>;
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">{status}</span>;
    }
  };

  const getDeliveryTypeBadge = (type: string) => {
    switch (type) {
      case 'GADC':
        return <span className="px-1.5 py-0.5 text-[11px] font-mono font-medium rounded bg-indigo-50 text-indigo-700 border border-indigo-200">GADC</span>;
      case 'ISCI':
        return <span className="px-1.5 py-0.5 text-[11px] font-mono font-medium rounded bg-purple-50 text-purple-700 border border-purple-200">ISCI</span>;
      case 'XSEED':
        return <span className="px-1.5 py-0.5 text-[11px] font-mono font-medium rounded bg-amber-50 text-amber-700 border border-amber-200">XSEED</span>;
      default:
        return <span className="px-1.5 py-0.5 text-[11px] font-mono font-medium rounded bg-slate-100 text-slate-700 border border-slate-200">{type}</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Greeting */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Good morning, {currentUser.name}!</span>
            <span role="img" aria-label="wave">👋</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Here&apos;s your dispatch and shipment overview for today.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('dispatch')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded shadow-xs transition-colors cursor-pointer"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Open Daily Dispatching</span>
          </button>

          <button
            onClick={() => onNavigate('clients')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded transition-colors cursor-pointer"
          >
            <span>Monitor by Client</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Shipments */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Shipments
            </span>
            <div className="p-2 rounded bg-slate-100 text-slate-700">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 font-mono">
              {summary.totalShipments}
            </span>
            <span className="text-xs text-slate-500">Active cycle</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <span className="text-emerald-700 font-medium">34 Trucks</span> active in network
          </div>
        </div>

        {/* In Transit */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              In Transit
            </span>
            <div className="p-2 rounded bg-blue-50 text-blue-700">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-blue-700 font-mono">
              {summary.inTransit}
            </span>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              {Math.round((summary.inTransit / summary.totalShipments) * 100)}% of total
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Road freight & Inter-island roll-on/roll-off
          </div>
        </div>

        {/* Delivered */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Delivered
            </span>
            <div className="p-2 rounded bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-emerald-700 font-mono">
              {summary.delivered}
            </span>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              POD Verified
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Completed with signed delivery receipts
          </div>
        </div>

        {/* Delayed */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Delayed
            </span>
            <div className="p-2 rounded bg-rose-50 text-rose-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-rose-700 font-mono">
              {summary.delayed}
            </span>
            <span className="text-xs font-medium text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
              Requires Action
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Monitored for weather & port dwell time
          </div>
        </div>
      </div>

      {/* 3. Operational Overview & Performance Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Delivery Overview Visual Breakdown */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Delivery Overview</h2>
              <p className="text-xs text-slate-500">Real-time status distribution</p>
            </div>
            <Activity className="w-4 h-4 text-slate-400" />
          </div>

          <div className="mt-4 space-y-3">
            {/* Visual stacked distribution bar */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
              <div style={{ width: '53%' }} className="bg-emerald-500" title="Delivered: 53%" />
              <div style={{ width: '42%' }} className="bg-blue-600" title="In Transit: 42%" />
              <div style={{ width: '5%' }} className="bg-rose-500" title="Delayed: 5%" />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
              <div className="p-2 rounded bg-emerald-50/70 border border-emerald-100">
                <div className="font-bold text-emerald-800 font-mono">79</div>
                <div className="text-[11px] text-emerald-700">Delivered</div>
              </div>
              <div className="p-2 rounded bg-blue-50/70 border border-blue-100">
                <div className="font-bold text-blue-800 font-mono">62</div>
                <div className="text-[11px] text-blue-700">In Transit</div>
              </div>
              <div className="p-2 rounded bg-rose-50/70 border border-rose-100">
                <div className="font-bold text-rose-800 font-mono">7</div>
                <div className="text-[11px] text-rose-700">Delayed</div>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-600 space-y-1.5 border-t border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Luzon Shipments:</span>
                <span className="font-medium text-slate-800">84 shipments (57%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Visayas Shipments:</span>
                <span className="font-medium text-slate-800">38 shipments (26%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mindanao Shipments:</span>
                <span className="font-medium text-slate-800">26 shipments (17%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Performance Chart Placeholder */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Delivery Performance & SLA Adherence</h2>
                <p className="text-xs text-slate-500">Turnaround time compliance for active accounts</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>95.3% On-Time</span>
              </div>
            </div>

            {/* Performance Bars Placeholder */}
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">VAmsler Pharma Logistics</span>
                  <span className="font-bold text-slate-900 font-mono">98.2% On-Time</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '98.2%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Zuellig Pharma Corp. (Cold Chain)</span>
                  <span className="font-bold text-slate-900 font-mono">99.1% On-Time</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '99.1%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Unilever Philippines FMCG</span>
                  <span className="font-bold text-slate-900 font-mono">96.5% On-Time</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '96.5%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Monde Nissin & URC Foods</span>
                  <span className="font-bold text-slate-900 font-mono">94.9% On-Time</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '94.9%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Average Dispatch Turnaround Time: <strong>2.4 hrs</strong></span>
            <button 
              onClick={() => onNavigate('reports')}
              className="text-blue-700 hover:text-blue-900 font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View full SLA report</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Recent Dispatches Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/50">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Recent Dispatches</h2>
            <p className="text-xs text-slate-500">Latest active truck departures and terminal transfers</p>
          </div>
          <button
            onClick={() => onNavigate('dispatch')}
            className="text-xs text-blue-700 hover:text-blue-900 font-semibold inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All Daily Dispatches ({recentDispatches.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100/80 text-slate-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">POD Number</th>
                <th className="py-2.5 px-4">Client</th>
                <th className="py-2.5 px-4">Destination</th>
                <th className="py-2.5 px-4">Delivery Type</th>
                <th className="py-2.5 px-4">Truck / Plate</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recentDispatches.slice(0, 5).map((dispatch) => (
                <tr 
                  key={dispatch.id} 
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  onClick={() => onSelectDispatch(dispatch)}
                >
                  <td className="py-3 px-4 font-mono font-bold text-blue-700">
                    {dispatch.podNumber}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectClientFromDashboard(dispatch.clientName);
                      }}
                      className="hover:underline text-left text-slate-900 hover:text-blue-700 font-semibold"
                    >
                      {dispatch.clientName}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-[220px] truncate" title={dispatch.destination}>
                    {dispatch.destination}
                  </td>
                  <td className="py-3 px-4">
                    {getDeliveryTypeBadge(dispatch.deliveryType)}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">
                    {dispatch.plateNumber}
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(dispatch.status)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDispatch(dispatch);
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded border border-slate-300 transition-colors inline-flex items-center gap-1"
                    >
                      <span>View</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
