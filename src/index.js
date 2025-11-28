export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // Remove trailing slash for matching (except root)
    if (pathname !== '/' && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }

    // Map clean URLs to actual file paths
    const urlMap = {
      '/': '/public/pages/index.html',
      '/about': '/public/pages/about.html',
      '/services': '/public/pages/services.html',
      '/contact': '/public/pages/contact.html',
      '/portfolio': '/public/pages/portfolio.html',
      '/pricing': '/public/pages/pricing.html',
      '/testimonials': '/public/pages/testimonials.html',
      '/case-studies/aromcraft': '/public/Case-Studies/AromaCraft.html',
      '/case-studies/dancevibe': '/public/Case-Studies/DanceVibe.html',
      '/case-studies/fitzone': '/public/Case-Studies/FitZone.html',
      '/case-studies/glowskin': '/public/Case-Studies/GlowSkin.html',
      '/case-studies/pawhaven': '/public/Case-Studies/PawHaven.html',
      '/case-studies/sharmas': '/public/Case-Studies/Sharmas.html',
      '/portfolio-pages/analytics': '/public/Portfolio-Pages/Analytics.html',
      '/portfolio-pages/connecthub': '/public/Portfolio-Pages/ConnectHub.html',
      '/portfolio-pages/fitpro': '/public/Portfolio-Pages/FitPro.html',
      '/portfolio-pages/inventory': '/public/Portfolio-Pages/inventory-system/Inventory.html',
      '/portfolio-pages/shopup': '/public/Portfolio-Pages/ShopUp.html',
      '/portfolio-pages/techvision': '/public/Portfolio-Pages/TechVision/TechVision.html',
    };

    const filePath = urlMap[pathname];

    if (filePath) {
      try {
        // Fetch from Pages
        const response = await fetch(new URL(filePath, request.url).toString());
        
        if (!response.ok) {
          return new Response('Not found', { status: 404 });
        }

        // If it's HTML, inject <base> tag
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('text/html')) {
          const text = await response.text();
          const modified = text.replace(
            /<head[^>]*>/i,
            `$&\n    <base href="/">`
          );
          return new Response(modified, {
            status: 200,
            headers: { 'content-type': 'text/html; charset=utf-8' },
          });
        }

        return response;
      } catch (e) {
        console.error('Error:', e);
        return new Response('Error processing request', { status: 500 });
      }
    }

    // For unmapped routes, return 404
    return new Response('
