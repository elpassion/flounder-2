import { z } from 'nestjs-zod/z';

export const fileMetadataSchema = z.object({
  fileName: z.string(),
  fileSize: z
    .number()
    .min(1)
    .max(5 * 1024 * 1024)
    .describe('Size of file that we want to prepare upload for'),
  fileType: z.string(),
});

export const fileDestinationSchema = z.object({
  key: z
    .string()
    .describe(
      'Key that should be sent back (this will allow us to identify where the file has been put)'
    ),
  url: z.string().describe('Signed URL with a destination to PUT file to'),
});

export type TFileMetadata = z.infer<typeof fileMetadataSchema>;
export type TFileDestination = z.infer<typeof fileDestinationSchema>;
