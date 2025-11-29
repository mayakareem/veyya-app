// This layout removes the SiteHeader for provider pages
// ProviderHeader is added directly in each provider page component instead
export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
