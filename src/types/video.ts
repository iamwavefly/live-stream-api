export interface videoTypes {
  id?: string;
  stream_video_url: string;
  stream_video_id: number;
  stream_video_title: string;
  stream_audio_url: string;
  stream_video_size: number;
  stream_video_duration: number;
  created_by: any;
  required: true;
  created_at: Date | string;
}
