import { S3StorageAdapter, S3ClientError } from '../s3-storage-adapter.service';

describe(S3StorageAdapter.name, function () {
  let adapter: S3StorageAdapter;

  beforeEach(async () => {
    adapter = new S3StorageAdapter({
      temporaryUploadsBucket: 'flounder-stg-tmp-uploads',
      mainApplicationStorageBucket: 'flounder-stg-mainstorage',
      region: 'eu-west-1',
    });
  });

  describe('getTempfileDestinationUrl', function () {
    it('fails with empty string', async () => {
      // Given
      const fn = () =>
        adapter.getTempfileDestinationUrl('', {
          originalFilename: 'abc123.png',
          mime: 'image/png',
        });

      // When & Then
      await expect(fn).rejects.toThrowError(S3ClientError);
    });

    it('successfully gets url in case everything is OK', async () => {
      // When
      const url = await adapter.getTempfileDestinationUrl('abc123.png', {
        originalFilename: 'abc123.png',
        mime: 'image/png',
      });

      // Then
      expect(url).toMatch(
        /^https:\/\/flounder-stg-tmp-uploads\.s3\.eu-west-1\.amazonaws\.com\/abc123\.png\?/,
      );
    });
  });
});
