const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/ai-tools/crm/for-real-estate-agents",
        destination: "/ai-tools/crm-for-real-estate-agents"
      }
    ];
  }
};

export default nextConfig;
