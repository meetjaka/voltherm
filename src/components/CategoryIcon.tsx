import { 
  Bike,
  Truck,
  Plane,
  PlaneTakeoff,
  Satellite,
  Home,
  Building,
  Zap,
  Radio,
  Server,
  Signal,
  Package,
  type LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Bike,
  Truck,
  Plane,
  PlaneTakeoff,
  Satellite,
  Home,
  Building,
  Zap,
  Radio,
  Server,
  Signal,
  Package
};

interface CategoryIconProps {
  name: string;
  className?: string;
}

export function CategoryIcon({ name, className = 'w-5 h-5' }: CategoryIconProps) {
  const Icon = iconMap[name] || Package;
  return <Icon className={className} />;
}

export default CategoryIcon;
