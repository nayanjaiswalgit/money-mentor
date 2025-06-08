import { FeatureFlag, UserRole } from '../types/auth';
import { authService } from './auth.service';

class FeatureService {
  private features: Map<string, FeatureFlag> = new Map();

  constructor() {
    // Initialize with default features
    this.initializeDefaultFeatures();
  }

  private initializeDefaultFeatures(): void {
    const defaultFeatures: FeatureFlag[] = [
      {
        id: 'export_pdf',
        name: 'Export to PDF',
        description: 'Allow users to export data to PDF',
        enabled: true,
        roles: ['premium', 'enterprise'],
      },
      {
        id: 'export_excel',
        name: 'Export to Excel',
        description: 'Allow users to export data to Excel',
        enabled: true,
        roles: ['basic', 'premium', 'enterprise'],
      },
      {
        id: 'advanced_analytics',
        name: 'Advanced Analytics',
        description: 'Access to advanced analytics features',
        enabled: true,
        roles: ['premium', 'enterprise'],
      },
      {
        id: 'team_collaboration',
        name: 'Team Collaboration',
        description: 'Access to team collaboration features',
        enabled: true,
        roles: ['enterprise'],
      },
    ];

    defaultFeatures.forEach(feature => {
      this.features.set(feature.id, feature);
    });
  }

  isFeatureEnabled(featureId: string): boolean {
    const feature = this.features.get(featureId);
    if (!feature) return false;

    const user = authService.getUser();
    if (!user) return false;

    return (
      feature.enabled &&
      (feature.roles.includes(user.role) || user.features.includes(featureId))
    );
  }

  getFeature(featureId: string): FeatureFlag | undefined {
    return this.features.get(featureId);
  }

  getAllFeatures(): FeatureFlag[] {
    return Array.from(this.features.values());
  }

  getEnabledFeatures(): FeatureFlag[] {
    return this.getAllFeatures().filter(feature => this.isFeatureEnabled(feature.id));
  }

  updateFeature(featureId: string, updates: Partial<FeatureFlag>): void {
    const feature = this.features.get(featureId);
    if (feature) {
      this.features.set(featureId, { ...feature, ...updates });
    }
  }

  addFeature(feature: FeatureFlag): void {
    this.features.set(feature.id, feature);
  }

  removeFeature(featureId: string): void {
    this.features.delete(featureId);
  }
}

export const featureService = new FeatureService(); 