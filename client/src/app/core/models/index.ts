import { InjectionToken } from '@angular/core';

export interface Environment {
  production: boolean;
  baseUrl: string;
}

export const ENVIRONMENT = new InjectionToken<Environment>('Environment Settings');
