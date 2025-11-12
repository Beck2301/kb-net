# Guía de Configuración SEO y Métricas para Kbinet

## ✅ Lo que ya está implementado

- ✅ Meta tags básicos (title, description, keywords)
- ✅ Open Graph tags para redes sociales
- ✅ Twitter Cards
- ✅ Structured Data (JSON-LD) para SEO
- ✅ Sitemap.xml
- ✅ Robots.txt mejorado
- ✅ Canonical URL
- ✅ Google Analytics 4 (preparado, necesita tu ID)

## 🔧 Lo que necesitas hacer

### 1. Google Analytics 4 (GA4)

**Pasos:**
1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una cuenta nueva o usa una existente
3. Crea una propiedad nueva (tipo: Web)
4. Obtén tu **Measurement ID** (formato: `G-XXXXXXXXXX`)
5. Reemplaza `G-XXXXXXXXXX` en `public/index.html` línea 16 y 22 con tu ID real

**Ubicación del código:**
```html
<!-- En public/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX'); // ← Reemplaza aquí también
</script>
```

### 2. Google Search Console

**Pasos:**
1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Agrega tu propiedad (URL: `https://kbinet.com` o tu dominio de Vercel)
3. Verifica la propiedad usando uno de estos métodos:
   - **Método recomendado:** Agrega una meta tag en `public/index.html`
   - O sube un archivo HTML de verificación
4. Una vez verificado, envía tu sitemap: `https://kbinet.com/sitemap.xml`

**Para agregar la meta tag de verificación:**
- Google te dará un código como: `<meta name="google-site-verification" content="CODIGO_AQUI" />`
- Agrégalo en el `<head>` de `public/index.html`

### 3. Actualizar URLs en archivos

**Cuando tengas tu dominio final, actualiza:**

1. **`public/sitemap.xml`**: Reemplaza `https://kbinet.com` con tu dominio real
2. **`public/robots.txt`**: Reemplaza `https://kbinet.com` con tu dominio real
3. **`public/index.html`**: 
   - Línea 10: `<link rel="canonical" href="https://TU-DOMINIO.com/" />`
   - Línea 28: `og:url` con tu dominio
   - Structured Data: todas las URLs con tu dominio

### 4. Imagen Open Graph

**Recomendación:**
- Crea una imagen específica para compartir en redes sociales (1200x630px)
- Reemplaza `logo192.png` en los meta tags `og:image` y `twitter:image`
- La imagen debe representar tu marca/servicio

### 5. Verificar que las imágenes tengan alt text

Ya están implementados en los componentes, pero verifica:
- Hero image: tiene `alt="Ilustración"`
- Email illustration: se carga como background, está bien

## 📊 Métricas y Tracking

### Eventos personalizados (opcional)

Puedes agregar tracking de eventos en el formulario de contacto:

```javascript
// Ejemplo en SimpleContactUs.js después de enviar el formulario
gtag('event', 'form_submit', {
  'event_category': 'Contact',
  'event_label': 'Contact Form'
});
```

### Conversiones

En Google Analytics 4, puedes configurar:
- Envío de formulario como conversión
- Clics en botones CTA
- Tiempo en página
- Scroll depth

## 🚀 Después del despliegue

1. **Espera 24-48 horas** para que Google indexe tu sitio
2. **Verifica en Google Search Console** que el sitemap se haya procesado
3. **Revisa Google Analytics** para confirmar que está recibiendo datos
4. **Prueba la búsqueda**: `site:tu-dominio.com` en Google

## 📝 Checklist final

- [ ] Google Analytics 4 configurado con tu ID
- [ ] Google Search Console verificado
- [ ] Sitemap actualizado con tu dominio real
- [ ] Robots.txt actualizado con tu dominio real
- [ ] Canonical URL actualizada
- [ ] Structured Data con URLs correctas
- [ ] Imagen Open Graph personalizada (opcional pero recomendado)
- [ ] Sitemap enviado a Google Search Console

## 🔗 Recursos útiles

- [Google Analytics 4](https://analytics.google.com/)
- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema.org](https://schema.org/) - Para structured data

---

**Nota:** Recuerda hacer commit y push de los cambios después de actualizar los IDs y URLs.

