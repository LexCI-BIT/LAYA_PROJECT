import React from 'react';

// Common SVG Wrapper for consistency
const IconWrapper = ({ children, size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide-icon ${className}`}
  >
    {children}
  </svg>
);

export const WardrobeIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M7 21V3h10v18" />
    <path d="M3 21h18" />
    <path d="M7 8h10" />
    <path d="M10 12h4" />
  </IconWrapper>
);

export const KitchenIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M6 13.8V4c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v9.8" />
    <path d="M18 17v2c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-2" />
    <path d="M4 17h16" />
    <circle cx="9" cy="19" r="1" />
    <circle cx="15" cy="19" r="1" />
  </IconWrapper>
);

export const TVUnitIcon = (props) => (
  <IconWrapper {...props}>
    <rect width="20" height="15" x="2" y="3" rx="2" />
    <path d="M7 21h10" />
    <path d="M12 18v3" />
  </IconWrapper>
);

export const PartitionIcon = (props) => (
  <IconWrapper {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 12h18" />
    <path d="M12 3v18" />
  </IconWrapper>
);

export const StorageIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </IconWrapper>
);

export const ConsultationIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </IconWrapper>
);

export const DesignIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.1 7.1" />
    <path d="m11 11 3 3" />
  </IconWrapper>
);

export const MaterialIcon = (props) => (
  <IconWrapper {...props}>
    <path d="m12 12 8.5-8.5" />
    <path d="M12 12v9" />
    <path d="M12 12H3" />
    <path d="M12 21l8.5-8.5" />
    <path d="M15.5 15.5l5.5 3" />
    <path d="M3 12l8.5 8.5" />
    <path d="m12 12 8.5 8.5" />
    <path d="m8.5 15.5-5.5 3" />
  </IconWrapper>
);

export const ExecutionIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" />
  </IconWrapper>
);

export const DeliveryIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </IconWrapper>
);

export const CustomIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </IconWrapper>
);

export const RenovationIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </IconWrapper>
);

export const LeafIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M11 20A7 7 0 0 1 4 13C4 5 20 3 20 3c0 0-2 16-10 16" />
    <path d="M8 16c2-2 5-5 9-8" />
  </IconWrapper>
);

export const GridIcon = (props) => (
  <IconWrapper {...props}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </IconWrapper>
);

export const ShieldCheckIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
    <path d="m9 12 2 2 4-4" />
  </IconWrapper>
);

export const BoxIcon = (props) => (
  <IconWrapper {...props}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 8 9 5 9-5" />
    <path d="M12 13v9" />
    <path d="m3 8v10l9 4 9-4V8" />
  </IconWrapper>
);

export const BuildingIcon = (props) => (
  <IconWrapper {...props}>
    <rect x="4" y="2" width="16" height="20" rx="1" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h1M15 6h1M8 10h1M15 10h1M8 14h1M15 14h1" />
  </IconWrapper>
);

export const HouseIcon = (props) => (
  <IconWrapper {...props}>
    <path d="m3 10 9-7 9 7" />
    <path d="M5 9v12h14V9" />
    <path d="M9 21v-7h6v7" />
  </IconWrapper>
);

export const StoreIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M3 10h18" />
    <path d="m5 10 1-7h12l1 7" />
    <path d="M5 10v11h14V10" />
    <path d="M9 21v-7h6v7" />
  </IconWrapper>
);

export const UsersIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="10" cy="7" r="4" />
    <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </IconWrapper>
);

export const LayoutGridIcon = (props) => (
  <IconWrapper {...props}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </IconWrapper>
);

export const IconRenderer = ({ iconName, size = 32 }) => {
  const name = iconName?.toLowerCase();
  const IconComponent = {
    wardrobe: WardrobeIcon,
    kitchen: KitchenIcon,
    'tv-unit': TVUnitIcon,
    living: TVUnitIcon,
    partition: PartitionIcon,
    storage: StorageIcon,
    custom: CustomIcon,
    renovation: RenovationIcon,
    consultation: ConsultationIcon,
    design: DesignIcon,
    material: MaterialIcon,
    execution: ExecutionIcon,
    delivery: DeliveryIcon,
    exterior: PartitionIcon,
    star: CustomIcon,
    leaf: LeafIcon,
    grid: GridIcon,
    'shield-check': ShieldCheckIcon,
    box: BoxIcon,
    building: BuildingIcon,
    house: HouseIcon,
    store: StoreIcon,
    users: UsersIcon,
    'layout-grid': LayoutGridIcon,
  }[name];

  return IconComponent ? <IconComponent size={size} /> : null;
};
