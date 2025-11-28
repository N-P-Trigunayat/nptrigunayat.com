<<<<<<< HEAD
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
      // Fetch the actual file
      const fileRequest = new Request(new URL(filePath, request.url).toString(), request);
      let response = await env.ASSETS.fetch(fileRequest);

      // If it's HTML, inject <base> tag
      if (response.status === 200 && response.headers.get('content-type')?.includes('text/html')) {
        try {
          const text = await response.text();
          const modified = text.replace(
            /<head[^>]*>/i,
            `$&\n    <base href="/">`
          );
          response = new Response(modified, response);
          response.headers.set('content-type', 'text/html; charset=utf-8');
        } catch (e) {
          console.error('Error processing HTML:', e);
        }
      }

      return response;
    }

    // For non-mapped routes (static files, images, etc.), serve as-is
    return env.ASSETS.fetch(request);
  },
};
=======
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
      // Fetch the actual file
      const fileRequest = new Request(new URL(filePath, request.url).toString(), request);
      let response = await env.ASSETS.fetch(fileRequest);

      // If it's HTML, inject <base> tag
      if (response.status === 200 && response.headers.get('content-type')?.includes('text/html')) {
        try {
          const text = await response.text();
          const modified = text.replace(
            /<head[^>]*>/i,
            `$&\n    <base href="/">`
          );
          response = new Response(modified, response);
          response.headers.set('content-type', 'text/html; charset=utf-8');
        } catch (e) {
          console.error('Error processing HTML:', e);
        }
      }

      return response;
    }

    // For non-mapped routes (static files, images, etc.), serve as-is
    return env.ASSETS.fetch(request);
  },
};
>>>>>>> 41fe2cd (Add .gitignore and remove node_modules)
