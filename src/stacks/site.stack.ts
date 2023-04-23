import { StackContext, StaticSite, use } from 'sst/constructs';
import { ApiStack } from './api.stack';

export function SiteStack({ stack }: StackContext) {
  const { ApiShortly } = use(ApiStack);

  const domains: Record<string, string> = {
    production: 'shortly.com.br',
    develop: 'dev.shortly.com.br'
  };

  const stageDomain = `${stack.stage}.shortly.com.br`;
  const domainName = domains[stack.stage] ?? stageDomain;

  const SiteShortly = new StaticSite(stack, 'ShortlySite', {
    path: 'packages/web',
    buildCommand: 'npm run build',
    buildOutput: 'dist',
    customDomain: domainName,
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
    SiteShortlyUrl: SiteShortly.customDomainUrl,
    SiteCloudfrontDistributionId: SiteCloudFront.distributionId,
    SiteCloudfrontDomainName: SiteCloudFront.distributionDomainName,
    SiteBucketName: SiteBucket.bucketName,
    SiteBucketArn: SiteBucket.bucketArn,
    SiteBucketWebsiteUrl: SiteBucket.bucketWebsiteUrl,
    SiteBucketWebsiteDomainName: SiteBucket.bucketWebsiteDomainName,
    SiteBucketRegionalDomainName: SiteBucket.bucketRegionalDomainName,
    SiteStackName: stack.stackName,
  });
  
  return { SiteShortly };
}
