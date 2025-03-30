# Domain Connection Guide for LeadCloser.co

This guide provides detailed instructions for connecting your GoDaddy domain (leadcloser.co) to your Vercel deployment of the LeadCloser application.

## Prerequisites

Before you begin, ensure you have:

1. Access to your GoDaddy account where leadcloser.co is registered
2. Access to your Vercel account where the LeadCloser application is deployed
3. Successfully deployed the LeadCloser application to Vercel

## Step 1: Deploy Your Application to Vercel

If you haven't already deployed your application to Vercel, follow these steps:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to your [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project" and import your Git repository
4. Configure the project settings and environment variables as detailed in the DEPLOYMENT.md file
5. Click "Deploy"

Once deployed, Vercel will provide you with a default domain (e.g., `leadcloser.vercel.app`).

## Step 2: Add Your Custom Domain in Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your LeadCloser project
3. Navigate to the "Settings" tab
4. Click on "Domains" in the left sidebar
5. Enter your domain `leadcloser.co` in the input field
6. Click "Add"

Vercel will now provide you with the necessary DNS configuration details. You'll need these for the next step.

## Step 3: Configure DNS Settings in GoDaddy

1. Log in to your [GoDaddy account](https://www.godaddy.com/)
2. Navigate to "My Products" > "Domains" and select `leadcloser.co`
3. Click on "DNS" or "Manage DNS"
4. You'll need to add the following DNS records based on Vercel's recommendations:

### Option A: Using A Records (Recommended)

Add these A records to point your domain to Vercel's servers:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 600 seconds |

### Option B: Using CNAME Records

If you prefer to use CNAME records (note: this won't work for the root domain without GoDaddy's domain forwarding):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | cname.vercel-dns.com. | 600 seconds |

### For www Subdomain

To ensure both `leadcloser.co` and `www.leadcloser.co` work:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | cname.vercel-dns.com. | 600 seconds |

5. Save your changes

## Step 4: Verify Domain Configuration in Vercel

1. Return to your Vercel project's "Domains" settings
2. Wait for the domain verification to complete
   - This may take up to 48 hours, but typically completes within a few minutes to a few hours
   - Vercel will show a green checkmark next to your domain when it's successfully verified

## Step 5: Configure SSL Certificate

Vercel automatically provisions SSL certificates for your custom domains. Once your domain is verified:

1. Vercel will issue an SSL certificate for your domain
2. This process is automatic and requires no action from you
3. You'll see a "Valid Configuration" status with a green checkmark when complete

## Step 6: Test Your Domain

1. Open a web browser and navigate to `https://leadcloser.co`
2. Verify that your LeadCloser application loads correctly
3. Test key functionality to ensure everything works as expected

## Troubleshooting

### DNS Propagation Delays

DNS changes can take time to propagate globally (up to 48 hours). If your domain isn't working immediately:

1. Wait a few hours and try again
2. Use a tool like [whatsmydns.net](https://www.whatsmydns.net/) to check DNS propagation status

### Domain Verification Issues

If Vercel cannot verify your domain:

1. Double-check your DNS records against Vercel's recommendations
2. Ensure you've added all required records
3. Check for typos in the record values
4. Verify that you've set the correct TTL values

### HTTPS/SSL Issues

If you see SSL warnings:

1. Wait a few hours as SSL certificate provisioning can take time
2. Ensure you're accessing the site with `https://` not `http://`
3. Clear your browser cache or try in an incognito/private window

### GoDaddy-Specific Settings

GoDaddy sometimes has specific requirements:

1. Ensure "Domain Forwarding" is turned OFF for the root domain
2. If using CNAME for the root domain, you may need to use GoDaddy's "Domain Forwarding with Masking" feature

## Updating Application Configuration

After connecting your domain, update your application configuration:

1. In your Vercel project settings, update the `NEXTAUTH_URL` environment variable to `https://leadcloser.co`
2. Update any hardcoded URLs in your application to use the new domain
3. Redeploy your application if necessary

## Maintaining Your Domain

1. Ensure your GoDaddy domain registration remains active
2. Renew your domain before expiration to avoid service interruption
3. Vercel will automatically renew SSL certificates as needed

## Additional Resources

- [Vercel Custom Domain Documentation](https://vercel.com/docs/concepts/projects/domains)
- [GoDaddy DNS Management Help](https://www.godaddy.com/help/manage-dns-records-680)
- [Let's Encrypt SSL Information](https://letsencrypt.org/docs/) (Vercel uses Let's Encrypt for SSL certificates)

For any additional assistance, contact Vercel support or GoDaddy support depending on where you're experiencing issues.
