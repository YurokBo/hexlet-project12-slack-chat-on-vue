import axios, { AxiosInstance } from 'axios';
import { RequestPerformer } from './request-performer';

export class ApiRequestFactory {
  private readonly _instance: AxiosInstance;

  constructor() {
    this._instance = axios.create();
  }

  get baseUrl(): string {
    return this._instance.defaults.baseURL || '';
  }

  getInstance(): AxiosInstance {
    return this._instance;
  }

  getRequestPerformer(): RequestPerformer {
    return new RequestPerformer(
      this.getInstance(),
    );
  }

  setBaseURL(url: string): void {
    this._instance.defaults.baseURL = url;
  }
}
