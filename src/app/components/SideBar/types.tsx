export interface SidebarProps {
  onTableClick: () => void;
  onDashboardClick: () => void;
  selectedTable: string | null;
  activeItem: string | null;
  className?: string;
}
