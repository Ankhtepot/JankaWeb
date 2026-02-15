import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

export interface SeoData {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  robots?: string;
  type?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly baseUrl = environment.seo.baseUrl.replace(/\/$/, '');
  private readonly siteName = environment.seo.siteName;
  private readonly defaultTitle = environment.seo.defaultTitle;
  private readonly defaultDescription = environment.seo.defaultDescription;
  private readonly defaultImage = environment.seo.ogImage;

  constructor(private title: Title, private meta: Meta) {}

  update(data: SeoData): void {
    const title = data.title || this.defaultTitle;
    const description = data.description || this.defaultDescription;
    const canonicalUrl = this.buildUrl(data.path);
    const imageUrl = this.buildUrl(data.image || this.defaultImage);
    const robots = data.robots || 'index,follow';
    const type = data.type || 'website';

    this.title.setTitle(title);
    this.setMeta('name', 'description', description);
    this.setMeta('name', 'robots', robots);

    this.setMeta('property', 'og:site_name', this.siteName);
    this.setMeta('property', 'og:title', title);
    this.setMeta('property', 'og:description', description);
    this.setMeta('property', 'og:type', type);
    this.setMeta('property', 'og:url', canonicalUrl);
    this.setMeta('property', 'og:image', imageUrl);

    this.setMeta('name', 'twitter:card', 'summary_large_image');
    this.setMeta('name', 'twitter:title', title);
    this.setMeta('name', 'twitter:description', description);
    this.setMeta('name', 'twitter:image', imageUrl);

    this.setLinkTag('canonical', canonicalUrl);
    this.setStructuredData();
  }

  private buildUrl(path?: string): string {
    if (!path) {
      return this.baseUrl;
    }
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl}${normalized}`;
  }

  private setMeta(attr: 'name' | 'property', key: string, content: string): void {
    this.meta.updateTag({ [attr]: key, content });
  }

  private setLinkTag(rel: string, href: string): void {
    let link = document.querySelector(`link[rel='${rel}']`) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', rel);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  setStructuredData(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: this.siteName,
      url: this.baseUrl,
      image: this.buildUrl(this.defaultImage),
      jobTitle: 'Artist'
    };

    const json = JSON.stringify(data);
    let script = document.querySelector("script[data-seo='structured-data']") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'structured-data');
      document.head.appendChild(script);
    }
    script.text = json;
  }
}
