import axios from 'axios';
import {
  UAEValidationRequest,
  UAEValidationResponse,
  UAEPurposeCodeListResponse,
  UAEPurposeCode,
  UAEPurposeCodeCategory,
  IBANValidationResponse,
  HealthResponse,
  CodeFilterParams,
} from '../types';

const UAE_API_URL = process.env.REACT_APP_UAE_API_URL || 'http://localhost:8000/api/v1/uae';

const apiClient = axios.create({
  baseURL: UAE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Validation API
export const validationApi = {
  validateTransaction: async (data: UAEValidationRequest): Promise<UAEValidationResponse> => {
    const response = await apiClient.post<UAEValidationResponse>('/validation/validate', data);
    return response.data;
  },

  validateIBAN: async (iban: string): Promise<IBANValidationResponse> => {
    const response = await apiClient.post<IBANValidationResponse>('/validation/validate-iban', { iban });
    return response.data;
  },

  getSession: async (sessionUuid: string): Promise<UAEValidationResponse> => {
    const response = await apiClient.get<UAEValidationResponse>(`/validation/session/${sessionUuid}`);
    return response.data;
  },
};

// Codes API
export const codesApi = {
  getCodes: async (params?: CodeFilterParams): Promise<UAEPurposeCodeListResponse> => {
    const response = await apiClient.get<UAEPurposeCodeListResponse>('/codes/', { params });
    return response.data;
  },

  getCode: async (code: string): Promise<UAEPurposeCode> => {
    const response = await apiClient.get<UAEPurposeCode>(`/codes/${code}`);
    return response.data;
  },

  getCategories: async (): Promise<UAEPurposeCodeCategory[]> => {
    const response = await apiClient.get<UAEPurposeCodeCategory[]>('/codes/categories');
    return response.data;
  },

  getStaticCodes: async (): Promise<{
    total_codes: number;
    total_categories: number;
    categories: UAEPurposeCodeCategory[];
    codes_by_category: Record<string, UAEPurposeCode[]>;
  }> => {
    const response = await apiClient.get('/codes/static');
    return response.data;
  },
};

// Health API
export const healthApi = {
  getHealth: async (): Promise<HealthResponse> => {
    const response = await apiClient.get<HealthResponse>('/health/');
    return response.data;
  },
};

export { apiClient };
