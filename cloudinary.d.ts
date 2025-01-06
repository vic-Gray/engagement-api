declare module 'cloudinary' {
    import { Readable } from 'stream';
  
    export interface UploadApiResponse {
      public_id: string;
      version: number;
      signature: string;
      width: number;
      height: number;
      format: string;
      resource_type: string;
      created_at: string;
      tags: string[];
      bytes: number;
      type: string;
      etag: string;
      placeholder: boolean;
      url: string;
      secure_url: string;
      access_mode: string;
      original_filename: string;
    }
  
    export interface UploadApiOptions {
      folder?: string;
      public_id?: string;
      overwrite?: boolean;
      invalidate?: boolean;
      resource_type?: string;
      type?: string;
      access_mode?: string;
    }
  
    export const v2: {
      uploader: {
        upload(
          file: string | Buffer | Readable,
          options?: UploadApiOptions,
          callback?: (error: any, result: UploadApiResponse) => void
        ): Promise<UploadApiResponse>;
      };
      config(config: {
        cloud_name: string;
        api_key: string;
        api_secret: string;
      }): void;
    };
  }
  