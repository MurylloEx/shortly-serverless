import { StackContext, StaticSite, use } from 'sst/constructs';
import { ApiStack } from './api.stack';

export function SiteStack({ stack }: StackContext) {
  const { ApiShortly } = use(ApiStack);

  const SiteShortly = new StaticSite(stack, 'ShortlySite', {
    path: 'packages/web',
    buildCommand: 'npm run build',
    buildOutput: 'dist',
    customDomain: {
      domainName: 'shortly.com.br',
      domainAlias: 'www.shortly.com.br',
    },
    environment: {
      VITE_APP_API_URL: ApiShortly.customDomainUrl!,
    },
  });

  if (!SiteShortly.cdk) {
    return { SiteShortly };
  }

  const SiteBucket = SiteShortly.cdk.bucket;
  const SiteCloudFront = SiteShortly.cdk.distribution;

  stack.addOutputs({
    SiteBucketName: SiteBucket.bucketName,
    SiteBucketArn: SiteBucket.bucketArn,
    SiteBucketWebsiteUrl: SiteBucket.bucketWebsiteUrl,
    SiteBucketWebsiteDomainName: SiteBucket.bucketWebsiteDomainName,
    SiteBucketRegionalDomainName: SiteBucket.bucketRegionalDomainName,
    SiteCloudfrontDomainName: SiteCloudFront.distributionDomainName,
    SiteCloudfrontDistributionId: SiteCloudFront.distributionId,
    SiteStackName: stack.stackName,
  });
  
  return { SiteShortly };
}
