# Vayavana Travels

A static travel website showcasing destinations and travel packages.

## Deployment to GitHub Pages

This site is configured for deployment on GitHub Pages.

### To deploy:

1. Ensure you have the `gh-pages` package installed globally:
   ```
   npm install -g gh-pages
   ```

2. Run the deploy script:
   ```
   npm run deploy
   ```

3. This will build and deploy the site to the `gh-pages` branch.

4. In your GitHub repository settings, ensure GitHub Pages is set to deploy from the `gh-pages` branch.

The site will be available at: https://Vayavana.github.io/travel-site

## Local Development

Since this is a static site, you can open `index.html` directly in your browser for local development.

## Note

Email functionality has been removed as GitHub Pages does not support server-side code. For contact forms, consider using services like Formspree or Netlify Forms.