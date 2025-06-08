export interface FeatureConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  requiredSubscription?: string;
}

export const features: Record<string, FeatureConfig> = {
  export_pdf: {
    id: 'export_pdf',
    name: 'PDF Export',
    description: 'Export data to PDF format',
    enabled: true,
    requiredSubscription: 'premium',
  },
  advanced_analytics: {
    id: 'advanced_analytics',
    name: 'Advanced Analytics',
    description: 'Access to advanced analytics and reporting',
    enabled: true,
    requiredSubscription: 'premium',
  },
  team_collaboration: {
    id: 'team_collaboration',
    name: 'Team Collaboration',
    description: 'Collaborate with team members',
    enabled: true,
    requiredSubscription: 'enterprise',
  },
}; 